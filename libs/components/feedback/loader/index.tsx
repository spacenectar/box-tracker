'use client'

import React from 'react'
import styles from './styles.module.scss'

interface Props {
  className?: string
}

/**
 * A loading component that displays a bouncing square loader
 * @param param0 
 * @returns 
 */
export const Loader: React.FC<Props> = ({ className = '' }) => {
  return (
    <div className={`${styles.loader} ${className}`}>
      <div className={`${styles.square} ${styles.square1}`}></div>
      <div className={`${styles.square} ${styles.square2}`}></div>
      <div className={`${styles.square} ${styles.square3}`}></div>
      <div className={`${styles.square} ${styles.square4}`}></div>
      <div className={`${styles.square} ${styles.square5}`}></div>
    </div>
  )
}

export default Loader
