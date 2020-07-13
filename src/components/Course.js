import React from 'react'

const Part = ({ partName, exercises }) => (
	<>
		<p>{partName} {exercises}</p>
	</>
)

const Total = ({parts}) => {
	console.log({parts})
	const numExs = parts.map(part => part.exercises)
	const total = numExs.reduce((a, b) => a + b, 0)
	return (
		<>
			<strong>total of {total} exercises</strong>
		</>
	)
}

const Content = ({parts}) => (
	<>
		{parts.map(part => <Part key={part.id} partName={part.name} exercises = {part.exercises} />)}
		<Total parts={parts} />
	</>
)

const Header = ({headerName}) => (
	<>
		<h1>{headerName}</h1>
	</>
)

const Course = ({course}) => ( 
	<>
		<Header headerName={course.name} />
		<Content parts={course.parts} />
	</>
		
)

export default Course