import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './components/Notification'
import personService from './services/persons'

const Person = ({ personObj, handleDelete }) => (
	<div>
		{personObj.name} {personObj.number}
		<button onClick={handleDelete} 
			value={[personObj.id, personObj.name]}>delete</button>
	</div>
)

const Filter = ({ searchTerm, handleSearch }) => (
	<div>
		filter shown with: <input value={searchTerm} onChange={handleSearch} />
	</div>
)

const Form = ({ addPerson, newName, handlePerson, newNumber, handleNumber }) => (
	<form onSubmit={addPerson}>
		<div>
			name: <input value={newName} onChange={handlePerson}/>
		</div>
		<div>
			number: <input value={newNumber} onChange={handleNumber}/>
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
)

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newNumber, setNewNumber ] = useState('')
	const [ newName, setNewName ] = useState('')
	const [ searchTerm, setSearchTerm ] = useState('')
	const [ infoMessage, setInfoMessage ] = useState(null)
	const [ isError, setIsError ] = useState(false)
	
	useEffect(() => {
		personService
			.getAll()
				.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])
	
	const addPerson = (event) => {
		const nameList = persons.map(person => person.name)
		console.log(nameList)
		event.preventDefault()
		if (!nameList.includes(newName)) { 
			const personObject = {
				name: newName,
				number: newNumber,
			}
			personService
				.create(personObject)
					.then(returnedPerson => {
					setIsError(false)
					setInfoMessage(`${newName} added`)
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
					setTimeout(() => {
						setInfoMessage(null)
					}, 4000)
				})
		}
		else {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				console.log('Number to be replaced')
				const person = persons.find(p => p.name === newName)
				const id = person.id
				const changedPerson = { ...person, number: newNumber }
				personService
					.changeNum(id, changedPerson)
						.then(returnedPerson => {
						setIsError(false)
						setInfoMessage(`${newName}s number changed to ${newNumber}`)
						setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
						setTimeout(() => {
							setInfoMessage(null)
						}, 4000)						
					})
					.catch(error => {
						setIsError(true)
						setInfoMessage(`Information of ${newName} has already been deleted from the server`)
						setPersons(persons.filter(person => person.id != id))
						setTimeout(() => {
							setInfoMessage(null)
						}, 4000)
					})
			}
		}
	}
	
	const handlePerson = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}
	
	const handleNumber = (event) => {
		console.log(event.target.value)
		setNewNumber(event.target.value)
	}
	
	const handleSearch = (event) => {
		console.log(event.target.value)
		setSearchTerm(event.target.value)
	}
	
	const handleDelete = (event) => {
		const deletePerson = (event.target.value).split(",")
		const id = deletePerson[0]
		const name = deletePerson[1]
		console.log(deletePerson)
		if (window.confirm(`Delete ${name}?`)) {	
			personService.delet(id)	
			setPersons(persons.filter(person => person.id != id))
		}
	}
	
	const personsToShow = persons.filter(person => person.name.includes(searchTerm))
		console.log(personsToShow)
	
	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={infoMessage} isError={isError} />
			<Filter searchTerm={searchTerm} handleSearch={handleSearch} />
			<h2>add a new</h2>
			<Form addPerson={addPerson} newName={newName} handlePerson={handlePerson} 
				newNumber={newNumber} handleNumber={handleNumber}/>
			<h2>Numbers</h2>
				{personsToShow.map(person => <Person key={person.name} personObj={person} handleDelete={handleDelete}/>)}
		</div>
	)	
}

export default App 