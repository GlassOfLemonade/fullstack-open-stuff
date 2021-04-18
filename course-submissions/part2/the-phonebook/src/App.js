import React, { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'
import Person from './Person'
import Phonebook from './services/Phonebook'

const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>{message}</div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ type, setType ] = useState('')

  useEffect(() => {
    console.log('getting phonebook from db...')
    Phonebook
      .getAll()
      .then(InitialData => {
        console.log('phonebook retrieved! Data:')
        console.log(InitialData)
        setPersons(InitialData)
      })
  },[])
  
  // this is used to refresh data so that the id is in the app state,
  // in previous implementations when a new entry was added to phonebook
  // it would be added to the state as well, but it would not have an id
  // due to id on the db file being generated by json-server. I'd rather
  // take the perf hit from loading the whole db again than have the id
  // be missing in state because that can cause all sorts of issues.
  const refreshData = () => {
    Phonebook
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    Phonebook.remove(id).then(response => {
      setType('error')
      setErrorMessage(
        `Information of ${person.name} has been successfully removed!`
      )
      setTimeout(() => {
        setErrorMessage(null)
        setType('')
      }, 4000)
      console.log(response)
      // refresh data
      refreshData()
    })
    .catch(error => {
      setType('error')
      setErrorMessage(
        'Entry has already been removed from the server, please refresh your application!'
      )
      setTimeout(() => {
        setErrorMessage(null)
        setType('')
      }, 4000)
    })
  }

  const handleNewPerson = (event) => {
    event.preventDefault()

    const matchFound = persons.find(({name}) => name === newName)

    if (matchFound === undefined) {
      const newPerson = {
        name: newName,
        number: newPhone
      }
      Phonebook.create(newPerson).then(response => {
        console.log(response)
        setType('notification')
        setErrorMessage(
          `${newName} added`
        )
        setTimeout(() => {
          setErrorMessage(null)
          setType('')
        }, 4000)
        //reset form fields
        setNewName('')
        setNewPhone('')
        refreshData()
      })
      .catch(error => {
        console.log(error.response.data)
        setType('error')
        setErrorMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
          setType('')
        }, 4000)
      })
      
    } else { // existing name found
      console.log(matchFound)
      // find the entry in state
      const person = persons.find(entry => entry.name === newName)
      const newPersonObj = { ...person, number: newPhone }
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        Phonebook.update(person.id, newPersonObj).then(response => {
          console.log(response)
          setType('notification')
          setErrorMessage(
            `Entry for ${person.name} has been updated in the phonebook!`
          )
          setTimeout(() => {
            setErrorMessage(null)
            setType('')
          }, 4000)
          // refresh data
          refreshData()
        })
        .catch(error => {
          setType('error')
          setErrorMessage(
            `${error.response.data.error}`
          )
          setTimeout(() => {
            setErrorMessage(null)
            setType('')
          }, 4000)
        })
      }
    }
  }

  // rerender by filtering persons array
  const filtered = (filter === '') ? persons : persons.filter(person => (person.name.toLowerCase().includes(filter) || person.name.includes(filter)))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={type}/>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add New</h2>
      <PersonForm newName={newName} newPhone={newPhone} handleNewName={handleNewName} handleNewPhone={handleNewPhone} handleNewPerson={handleNewPerson} />
      <h2>Numbers</h2>
      {filtered.map(person => 
        <Person key={person.id} person={person} handleDelete={() => {
          if (window.confirm(`Delete ${person.name}?`)) {
            handleDelete(person.id)
          }
        } } /> 
      )}
    </div>
  )
}

export default App