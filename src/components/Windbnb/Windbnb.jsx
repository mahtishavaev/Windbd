import React, { Fragment,  useState } from 'react'
import { Header } from '../Header/Header'
import { Stay } from '../Stay/Stay'
import styles from './Windbnb.module.scss'


export const Windbnb = ({ json }) => {
  const [stays, setStays] = useState(json)

  const filterByCity = (data, cityFilter = []) => {
    return (cityFilter.length === 0)
      ? data
      : data.filter(stay => (
        cityFilter.some(item => stay.city === item)
      )
      )
  }
  const filterByCountry = (data, countryFilter = []) => {
    return (countryFilter.length === 0)
      ? data
      : data.filter(stay => (
        countryFilter.some(item => stay.country === item)
      )
      )
  }
  const filterByGuests = (data, guestsFilter = 0) => {
    return (guestsFilter === 0)
      ? data
      : data.filter(stay => stay.maxGuests >= +guestsFilter
      )
  }
  const filterStays = (cityFilter = [], countryFilter = [], guestsFilter = 0) => {
    let result
    result = filterByCity(json, cityFilter)
    result = filterByCountry(result, countryFilter)
    result = filterByGuests(result, guestsFilter)
    setStays(result)
  }

  return (
    <Fragment>
      <Header stays={json} {...{ filterStays }} />
      <div className={styles.container}
      >
        <div className={styles.title}>
          <h2 className={styles.titleText}>Stays in Finland</h2>
          <span className={styles.staysCount}>{stays.length} stays</span>
        </div>
        <div className={styles.stays}>
          {stays
            ? stays.map((stay, index) => (
              <Stay {...stay} key={index} />
            ))
            : null}
          {
            stays.length === 0
              ? <h2 className={styles.ntd}>Nothing to display</h2>
              : null
          }
        </div>


        <footer className={styles.footer}>
          <div className={styles.contactInfo}>
            mahtishavaev @ DevChallenges.io
        </div>
        </footer>
      </div>
    </Fragment>
  )
}