import React, { Fragment, useEffect, useState } from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/logo.png'

export const Header = ({ stays, filterStays }) => {
  const [menuExpanded, setMenuExpanded] = useState(false)
  const [locations, setLocations] = useState([])
  const [locationsCount, setLocationsCount] = useState(0)
  const [guestsCount, setGuestsCount] = useState({ adults: 0, children: 0 })
  const [locationsListVisibility, setLocationsListVisibility] = useState(false)
  const [guestsSettingsVisibility, setGuestsSettingsVisibility] = useState(false)

  useEffect(() => {
    let locationsList = stays.map(stay => ({ 'city': stay.city, 'country': stay.country }))
      .reduce((prev, item) => {
        for (let value of prev) {
          if ((value.city === item.city) && (value.country === item.country)) return prev
        }
        return [...prev, item]
      }, [])
    setLocations(locationsList)
  }, [stays])

  const onSearchClicked = () => {
    let cityFilter = locations.reduce((acc, item) => (
      item.isChecked ? [...acc, item.city] : acc
    ), [])
    let countryFilter = locations.reduce((acc, item) => (
      item.isChecked ? [...acc, item.country] : acc
    ), [])
    let guestsFilter = guestsCount.adults + guestsCount.children
    filterStays(cityFilter, countryFilter, guestsFilter)
    setMenuExpanded(false)
  }

  const onLocationItemClicked = (index) => {
    let toggleIsChecked = !locations[index].isChecked
    toggleIsChecked ? setLocationsCount(prev => prev + 1) : setLocationsCount(prev => prev - 1)
    setLocations(prev => prev.map((item, i) => {
      return index === i ? { ...item, isChecked: toggleIsChecked } : item
    })
    )
  }

  const onAddLocationClicked = () => {
    setMenuExpanded(true)
    setLocationsListVisibility(true)
    setGuestsSettingsVisibility(false)
  }
  const onAddGuestsClicked = () => {
    setMenuExpanded(true)
    setGuestsSettingsVisibility(true)
    setLocationsListVisibility(false)

  }
  const onAdultsAddClicked = () => {
    setGuestsCount(prev => ({ ...prev, 'adults': prev.adults + 1 }))
  }
  const onAdultsRemoveClicked = () => {
    guestsCount.adults > 0
      && setGuestsCount(prev => ({ ...prev, 'adults': prev.adults - 1 }))
  }
  const onChildrenRemoveClicked = () => {
    guestsCount.children > 0
      && setGuestsCount(prev => ({ ...prev, 'children': prev.children - 1 }))
  }
  const onChildrenAddClicked = () => {
    setGuestsCount(prev => ({ ...prev, 'children': prev.children + 1 }))
  }

  return (
    <Fragment>

      {
        menuExpanded
          ? <div
            className={styles.overlay}
            onClick={() => setMenuExpanded(false)}
          ></div>
          : null
      }

      <header className={styles.header}>
        <div className={styles.container}>

          <div className={`${styles.inner} ${menuExpanded ? styles.expanded : ''}`}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
            </div>
            <div className={styles.searchBar}>
              <div
                className={styles.location}
                onClick={onAddLocationClicked}
              >
                {locationsCount
                  ? <span style={{ color: '#000' }}>{locationsCount} cities</span>
                  : 'Add location'
                }

              </div>
              <div
                className={styles.guests}
                onClick={onAddGuestsClicked}
              >
                {
                  (guestsCount.adults === 0 && guestsCount.children === 0)
                    ? 'Add guests'
                    : <span style={{ color: '#000' }}>
                      {guestsCount.adults + guestsCount.children} guests
                  </span>
                }
              </div>
              <div className={styles.btn}
                onClick={onSearchClicked}
              >
                <span className="material-icons">search </span>

              </div>
            </div>
            {
              menuExpanded
                ? <div className={styles.searchParams}>
                  {
                    locationsListVisibility
                      ? <div className={styles.locationsList}>
                        {
                          locationsListVisibility
                            ? locations.map((item, index) => (
                              <div
                                className={styles.locationItem}
                                key={index}
                                onClick={() => onLocationItemClicked(index)}
                              >
                                <span className="material-icons">location_on</span>
                                {`${item.city}, ${item.country}`}
                                {item.isChecked && <i className="material-icons">check</i>}
                              </div>
                            ))
                            : null}
                      </div>
                      : null
                  }
                  {
                    guestsSettingsVisibility
                      ? <div className={styles.guestsSearchParams}>
                        <div >
                          <div className={styles.guestsAgeTitle}>Adults</div>
                          <div className={styles.guestsAgeText}>Ages 13 or above</div>
                          <div className={styles.guestsCtrl}>
                            <span
                              className={styles.guestsBtn}
                              onClick={onAdultsRemoveClicked}
                            >
                              <span className="material-icons">remove</span>
                            </span>
                            <span className={styles.guestsCounter}>{guestsCount.adults}</span>
                            <span
                              className={styles.guestsBtn}
                              onClick={onAdultsAddClicked}
                            >
                              <span className="material-icons">add</span>
                            </span>
                          </div>
                        </div>
                        <div >
                          <div className={styles.guestsAgeTitle}>Children</div>
                          <div className={styles.guestsAgeText}>Ages 2-12</div>
                          <div className={styles.guestsCtrl}>
                            <span
                              className={styles.guestsBtn}
                              onClick={onChildrenRemoveClicked}

                            >
                              <span className="material-icons">remove</span>
                            </span>
                            <span className={styles.guestsCounter}>{guestsCount.children}</span>
                            <span
                              className={styles.guestsBtn}
                              onClick={onChildrenAddClicked}

                            >
                              <span className="material-icons">add</span>

                            </span>
                          </div>
                        </div>
                      </div>
                      : null
                  }
                </div>
                : null
            }

          </div>

        </div>

      </header>
    </Fragment>
  )
}