import React from 'react'

const PersonForm = ({newName, newPhone, handleNewName, handleNewPhone, handleNewPerson}) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNewName} />
            </div>
            <div>
                number: <input value={newPhone} onChange={handleNewPhone} />
            </div>
            <div>
                <button type="submit" onClick={handleNewPerson}>add</button>
            </div>
      </form>
    )
}

export default PersonForm