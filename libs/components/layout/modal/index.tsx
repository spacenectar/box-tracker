import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '../../data-input/button';

/* Import Stylesheet */
import styles from './styles.module.scss';



export interface Props extends React.ComponentProps<'section'> {
  /**
   * Is the modal open?
   * @default false
   */
  isOpen?: boolean;
  /**
   * Is the modal an alert?
   * @default false
   */
  isAlert?: boolean;
  /**
   * The onDismiss function to call when the modal is closed
   */
  onDismiss?: () => void;
  /**
   * Modal name for accessibility
   */
  modalName: string;
  /**
   * The optional size of the modal.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * The optional element to return focus to.
   */
  returnFocusElementRef?: React.MutableRefObject<HTMLElement | null>;
}

const focusableElements =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The 'Modal' component displays content over the top of the app and blocks other actions.
 */
const Modal: React.FC<Props> = ({
  isOpen,
  isAlert = false,
  onDismiss,
  className,
  modalName,
  size = 'md',
  returnFocusElementRef,
  children
}: Props) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLElement>();
  const lastFocusableElementRef = useRef<HTMLElement>();
  const [lastFocusedElementBeforeModal, setLastFocusedElementBeforeModal] =
    useState<HTMLElement | null>(null);

  const trapFocus = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      const focusableElementsInModal =
        modalRef.current?.querySelectorAll(focusableElements);
      if (focusableElementsInModal) {
        const firstFocusableElement =
          focusableElementsInModal[0] as HTMLElement;
        const lastFocusableElement = focusableElementsInModal[
          focusableElementsInModal.length - 1
        ] as HTMLElement;
        firstFocusableElementRef.current = firstFocusableElement as HTMLElement;
        lastFocusableElementRef.current = lastFocusableElement as HTMLElement;
        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      onDismissHandler();
    }
    trapFocus(event);
  };

  const onDismissHandler = () => {
    setOpen(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  useEffect(() => {
    setOpen(isOpen || false);
  }, [isOpen]);

  useEffect(() => {
    if (open) {
      setLastFocusedElementBeforeModal(document.activeElement as HTMLElement);
      document.addEventListener('keydown', handleKeyDown);
      const focusableElementsInModal =
        modalRef.current?.querySelectorAll(focusableElements);
      if (focusableElementsInModal) {
        const firstFocusableElement =
          focusableElementsInModal[0] as HTMLElement;
        firstFocusableElementRef.current = firstFocusableElement as HTMLElement;
        firstFocusableElement.focus();
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      returnFocusElementRef?.current
        ? returnFocusElementRef.current.focus()
        : lastFocusedElementBeforeModal?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      lastFocusedElementBeforeModal?.focus();
    };
  }, [open]);

  const ModalContent = (
    <div
      data-testid="modal"
      className={[styles['modal'], styles[`size-${size}`], className].filter(Boolean).join(' ')}
    >
      <Button
        className={styles['close']}
        onClick={onDismissHandler}
        icon="close"
        circular
        small
        hideLabel
        label="Close"
      />
      <div
        className={styles['content']}
        aria-modal="true"
        role={isAlert ? 'alertdialog' : 'dialog'}
        aria-label={modalName}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );

  return open ? createPortal(ModalContent, document.body) : null;
};

Modal.displayName = 'Modal';

export default Modal;
