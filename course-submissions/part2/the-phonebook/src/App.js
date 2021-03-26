import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './PersonForm'
import Filter from './Filter'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('use effect running...')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled, data:')
        console.log(response.data)
        setPersons(response.data)
      })
  },[])

  const handleNewName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewPhone = (event) => {
    // console.log(event.target.value)
    setNewPhone(event.target.value)
  }
  const handleFilter = (event) => {
    // console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()

    const matchFound = persons.find(({name}) => name === newName)

    if (matchFound === undefined) {
      const newPerson = {
        name: newName,
        number: newPhone
      }
      setPersons(persons.concat(newPerson))
    } else {
      console.log(matchFound)
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add New</h2>
      <PersonForm newName={newName} newPhone={newPhone} handleNewName={handleNewName} handleNewPhone={handleNewPhone} handleNewPerson={handleNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} /> 
    </div>
  )
}

export default App