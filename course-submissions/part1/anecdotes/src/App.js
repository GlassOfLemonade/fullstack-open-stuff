import React, { useState } from 'react'

const TopAnecdote = ({points, anecdotes}) => {

  const indexOfMax = (array) => {
    if (array.length === 0) {
      return -1
    }

    let max = array[0]
    let maxIndex = 0

    for (let i = 0; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i]
        maxIndex = i
      }
    }

    return maxIndex
  }

  const highest = Math.max(...points)
  const highestIndex = indexOfMax(...points)
  const anecdote = anecdotes[highestIndex]
  
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdote}</p>
      <p>has {highest} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  return (
    <div>
      <h1>Anectdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleClick}>vote</button>
      <button onClick={() => {setSelected(getRandomInt(anecdotes.length - 1))}}>next anecdote</button>

      <TopAnecdote points={points} anecdotes={anecdotes} />
    </div>
  )
}

export default App