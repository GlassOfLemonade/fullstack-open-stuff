import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  // app states
  const [countries, setCountries]  = useState([])
  const [filter, setFilter] = useState('')

  // functions and event handlers
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  useEffect(() => {
    // get all countries
    console.log('use effect running...')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  },[])

  // components
  const Countries = ({countries, filter}) => {
    //special render for empty
    if (filter === '') {
      return (
        <div>
          Please enter a search parameter to start
        </div>
      )
    }

    //filter countries list
    const filtered = (filter === '') ? countries : countries.filter(country => (country.name.toLowerCase().includes(filter) || country.name.includes(filter)))

    //rendering based on nonempty filter
    if (filtered.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    } else if (filtered.length === 1) {
      const country = filtered[0]
      return (
        <div>
          <h1>{country.name}</h1>
          <div>Capital: {country.capital}</div>
          <div>Population: {country.population}</div>
          <h2>Languages</h2>
          <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <div>
            <img style={{maxWidth: "100px"}} src={country.flag} alt="country flag"/>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {filtered.map(country => <div key={country.name}>{country.name}</div>)}
        </div>
      )
    }
  }

  return (
    <div>
      <div>find countries <input value={filter} onChange={handleFilter}/></div>
      <Countries countries={countries} filter={filter} />
    </div>
  );
}

export default App;