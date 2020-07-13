personService
			.delet(event.target.value)
			.then(returnedPersons => {
			setPersons(returnedPersons)	
		})