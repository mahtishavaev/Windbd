import React from 'react'
import styles from './Stay.module.scss'

export const Stay = ({ ...stay }) => {


  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <div className={styles.img}>
          <img src={stay.photo} alt="" />
        </div>
        <div className={styles.info}>
          {stay.superHost && <div className={styles.superHost}>Super Host</div>}
          <span className={styles.type}>{stay.type}
          {stay.beds && <span className={styles.beds}>{stay.beds} beds</span>}
          </span>
          
          <div className={styles.rating}>
            <span className="material-icons">star_rate</span>
            {stay.rating}
          </div>
        </div>
        <span className={styles.title}>{stay.title}</span>
      </div>
    </div>
  )
}
