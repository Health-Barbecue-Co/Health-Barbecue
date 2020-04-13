import React, { useState, useEffect } from 'react'
import axios from 'axios'

type StudiesListProps = {}

export const StudiesList: React.FC<StudiesListProps> = () => {
	const [list, setList] = useState([])

	useEffect(() => {
		axios.get('/orthanc/studies')
			.then(response => {
				setList(response.data)
			})
	}, [])

	return (
		<>
			<div>StudiesList</div>
			<div>{
				list.map((id: any) => <div key={id}>{id}</div>)
			}</div>
		</>
	)
}
