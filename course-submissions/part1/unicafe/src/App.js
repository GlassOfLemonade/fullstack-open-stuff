import React, { useState } from 'react'

const Statistics = ({stats}) => {
  const { good, neutral, bad} = stats
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good*1 + bad*-1) / (good + neutral + bad)}</p>
      <p>positive {good / (good + neutral + bad)}%</p>
   </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const props = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <button onClick={() => { setGood(good + 1) }}>good</button>
        <button onClick={() => { setNeutral(neutral + 1) }}>neutral</button>
        <button onClick={() => { setBad(bad + 1) }}>bad</button>
      </div>
      <Statistics stats={props} />
    </div>
  )
}

export default App;