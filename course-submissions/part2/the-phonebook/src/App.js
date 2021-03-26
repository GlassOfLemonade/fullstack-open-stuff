import React, { useState } from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')

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