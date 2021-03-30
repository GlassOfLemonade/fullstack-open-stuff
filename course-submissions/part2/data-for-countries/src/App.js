import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  // app states and vars
  const [countries, setCountries]  = useState([])
  const [filter, setFilter] = useState('')

  const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY

  // functions and event handlers
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  useEffect(() => {
    // get all countries
    // console.log('use effect running...')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response => {
        // console.log('promise fulfilled')
        setCountries(response.data)
      })
  },[])

  // components
  const Weather = ({weather}) => {
    return (
      <div>
        <div>
          <div><b>Temperature:</b> {weather.current.temperature}</div>
          <div>
            <img src={weather.current.weather_icons[0]} alt="weather icon" />
          </div>
          <div><b>Wind:</b> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}</div>
        </div>
      </div>
    )
  }

  const View = ({country}) => {
    //component state
    const [weather, setWeather] = useState([])
    const [dataReceived, setDataReceived] = useState(false)

    useEffect(() => {
      // get weather of country's capital
      // console.log('getting weather...')
      axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + country.capital)
      .then( response => {
        // console.log('weather gotten from api!')
        setWeather(response.data)
        setDataReceived(true)
      })
    },[country.capital])

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
          <img style={{maxWidth: "100px"}} src={country.flag} alt={country.name + "'s national flag"}/>
        </div>
        <h2>Weather in {country.capital}</h2>
        { dataReceived && 
          <Weather weather={weather} />
        }
      </div>
    )
  }

  const CountryListItem = ({country}) => {
    //component state
    const [toggle, setToggle] = useState(false)

    //event handlers
    const handleShow = (event) => {
      // console.log('show button pressed')
      setToggle(true)
    }

    //render
    return (
      <div>
        <div>{country.name} <button onClick={handleShow}>show</button></div>
        {toggle &&
          <View country={country} />
        }
      </div>
    )
  }

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
        <View country={country} />
      )
    } else {
      return (
        <div>
          {filtered.map(country => {
            return (
              <CountryListItem key={country.name} country={country} />
            )
          })}
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