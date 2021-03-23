import React from 'react';

const Part = ({part}) => {
return (
    <p>
    {part.name} {part.exercises}
    </p>    
)
}

const Header = ({ name }) => {
return (
    <h1>{name}</h1>
)
}

const Total = ({ parts }) => {
const sum = parts.reduce((total, {name, exercises, id}) => total + exercises, 0)
// console.log(sum)
return (
    <h3>total of {sum} exercises</h3>
) 
}

const Content = ({ parts }) => {
return (
    <div>
    {parts.map(part =>
        <Part key={part.id} part={part} />
    )}
    </div>
)
}

const Course = ({courses}) => {
return (
    <div>
    {courses.map(course =>
        <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )}
    </div>
)
}

export default Course;
