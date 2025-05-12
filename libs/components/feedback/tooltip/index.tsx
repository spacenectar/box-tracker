import React, { useEffect, useRef, useState } from 'react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  Side,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole
} from '@floating-ui/react';

/* Import Stylesheet */
import styles from './styles.module.scss';

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

  const [isOpen, setIsOpen] = useState(isVisible ?? false);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const {
    refs,
    floatingStyles,
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    placement: finalPlacement
  } = useFloating<HTMLElement>({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip(),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  });

  const hover = useHover(context, {
    enabled: isVisible === undefined,
    move: false
  });
  const focus = useFocus(context, {
    enabled: isVisible === undefined
  });
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    role
  ]);

  useEffect(() => {
    if (isVisible === undefined) return;

    setIsOpen(isVisible);
  }, [isVisible]);

  const staticSideMap: Record<string, Side> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  };
  const staticSide = staticSideMap[finalPlacement.split('-')[0]];

  const arrowClassNames = [
    styles['arrow'],
    styles[finalPlacement.split('-')[0]]
  ].filter(Boolean).join(' ');

  const childrenElement = React.isValidElement(children) ? children : null;

  const childrenProps = getReferenceProps({
    ref: refs.setReference,
    ...(childrenElement && typeof childrenElement.props === 'object'
      ? childrenElement.props
      : {})
  });

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement(children, childrenProps)}
      <FloatingPortal>
        {isOpen && (
          <div
            data-testid="tooltip"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={[styles['tooltip'], className || '']
              .filter(Boolean)
              .join(' ')}
            {...props}
          >
            {content}
            <div
              ref={arrowRef}
              className={arrowClassNames}
              style={{
                position: 'absolute',
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
                ...(staticSide && { [staticSide]: '-4px' })
              }}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default Tooltip;
