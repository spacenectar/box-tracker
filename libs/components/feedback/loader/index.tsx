'use client'

import React from 'react'
import styles from './styles.module.scss'

interface Props {
  /**
   * Text to display for screen readers while loading
   */
  helpText?: string
  className?: string
}

/**
 * A loading component that displays a bouncing square loader.
 * Screen readers will be notified of the loading state via an ARIA live region.
 */
export const Loader: React.FC<Props> = ({
  className = '',
  helpText = 'Loading...',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`${styles.loader} ${className}`}
    >
      <div className={`${styles.square} ${styles.square1}`} />
      <div className={`${styles.square} ${styles.square2}`} />
      <div className={`${styles.square} ${styles.square3}`} />
      <div className={`${styles.square} ${styles.square4}`} />
      <div className={`${styles.square} ${styles.square5}`} />
      <span className="visually-hidden">{helpText}</span>
    </div>
  )
}

export default Loader