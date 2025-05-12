import React from 'react';
import styles from './styles.module.scss';
import Icon from '../../data-display/icon';

interface Props extends React.ComponentProps<'button'> {
  /**
   * Callback function to be executed when the component is clicked.
   */
  onClick: () => void;
}

/**
 * AddBox component visually represents an action to add a new box.
 * It renders as a button styled like a placeholder card with a plus icon.
 */
export const AddBox: React.FC<Props> = ({ className, onClick, ...props }) => {
  return (
    <button
      type="button"
      className={[
        styles['add-box'],
        className
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label="Add new box"
      {...props}
    >
      <Icon use="plus" className={styles['plus-sign']} />
      <span className={styles['text']}>Add new box</span>
    </button>
  );
};

export default AddBox;
