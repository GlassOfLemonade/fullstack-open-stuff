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
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + neutral + bad} />
          <Statistic text="average" value={(good*1 + bad*-1) / (good + neutral + bad)} />
          <Statistic text="positive" value={(good / (good + neutral + bad)) * 100 + " %"} />
        </tbody>
      </table>
   </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
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
        <Button handleClick={() => { setGood(good + 1) }} text="good" />
        <Button handleClick={() => { setNeutral(neutral + 1) }} text="neutral" />
        <Button handleClick={() => { setBad(bad + 1) }} text="bad" />
      </div>
      <Statistics stats={props} />
    </div>
  )
}

export default App;