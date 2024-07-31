import React from 'react'
import styles from './Categories.module.css'

const Categories = () => {
  return (
    <div className={styles.Container}>
        <div className={styles.Element}>NEWS</div>
        <div className={styles.Element}>HACKHATHONS</div>
        <div className={styles.Element}>BLOG</div>
    </div>
  )
}

export default Categories