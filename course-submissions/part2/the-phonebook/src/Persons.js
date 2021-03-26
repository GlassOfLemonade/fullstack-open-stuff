import React from 'react'

const Persons = ({persons, filter}) => {
    // rerender by filtering persons array
    const filtered = (filter === '') ? persons : persons.filter(person => (person.name.toLowerCase().includes(filter) || person.name.includes(filter)))

    return (
        <div>
            {filtered.map(person => 
                <p key={person.name}>{person.name} {person.number}</p>
            )}
        </div>
    )
}

export default Persons