import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';

/* Import Stylesheet */
import styles from './styles.module.scss';

function setRef<T>(
  ref:
    | React.MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  value: T | null
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

function useForkRef<Instance>(
  ...refs: Array<React.Ref<Instance> | undefined>
): React.RefCallback<Instance> | null {
  /**
   * This will create a new function if the refs passed to this hook change and are all defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
  }, refs);
}

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * The placement of the tooltip relative to the trigger
   * @default 'below'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Is the tooltip visible.
   * If undefined, the tooltip will be visible on hover/focus
   * If true/false, the tooltip will be visible/hidden regardless of hover/focus
   * @default undefined
   */
  isVisible?: boolean;
  /**
   * The content of the tooltip
   */
  content?: React.ReactNode | string;
}

/**
 * The 'Tooltip' component is used to display a small piece of information when the user hovers over or focuses on an element.
 */
export const Tooltip: React.FC<Props> = ({
  className,
  children,
  placement = 'bottom',
  isVisible,
  content,
  ...props
}: Props) => {
  if (React.Children.count(children) !== 1) {
    throw new Error('Tooltip: Must have exactly one child');
  }

  const [showTooltip, setShowTooltip] = useState(isVisible ?? false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const {
    styles: popperStyles,
    attributes,
    state
  } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ],
    placement
  });

  useEffect(() => {
    if (isVisible === undefined) return;

    setShowTooltip(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (!referenceElement || isVisible !== undefined) return;

    const showFn = () => {
      setShowTooltip(true);
    };

    const hideFn = () => {
      setShowTooltip(false);
    };

    referenceElement.addEventListener('mouseenter', showFn);
    referenceElement.addEventListener('mouseleave', hideFn);
    referenceElement.addEventListener('focus', showFn);
    referenceElement.addEventListener('blur', hideFn);
    referenceElement.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        hideFn();
      }
    });

    return () => {
      referenceElement.removeEventListener('mouseenter', showFn);
      referenceElement.removeEventListener('mouseleave', hideFn);
      referenceElement.removeEventListener('focus', showFn);
      referenceElement.removeEventListener('blur', hideFn);
    };
  }, [referenceElement, isVisible]);

  let arrowClassNames = [
    styles['arrow'],
    state !== null ? styles[placement] : ''
  ].filter(Boolean).join(' ');

  const childrenProps = {
    // @ts-ignore - any is required to allow for ref forwarding on an unknown element
    ref: useForkRef(children?.ref, setReferenceElement)
  };

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement(children, childrenProps)}
      {ReactDOM.createPortal(
        showTooltip && (
          <div
            data-testid="tooltip"
            ref={setPopperElement}
            style={popperStyles.popper}
            {...attributes.popper}
            className={[styles['tooltip'], className || ''].filter(Boolean).join(' ')}
            role="tooltip"
            {...props}
          >
            {content}
            <div
              ref={setArrowElement}
              style={popperStyles.arrow}
              className={arrowClassNames}
            />
          </div>
        ),
        document.body
      )}
    </>
  );
};

export default Tooltip;
