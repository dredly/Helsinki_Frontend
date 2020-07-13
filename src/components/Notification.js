import React from 'react'

const Notification = ({ message, isError }) => {
	const infoStyle = {
		color: 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	}
	console.log(isError)
	if (isError === true) {
		infoStyle.color = 'red'
		console.log(infoStyle.color)
	}
	
	if (message === null) {
		return null
	}
	
	return (
		<div style={infoStyle}>
			{message}
		</div>
	)
}

export default Notification