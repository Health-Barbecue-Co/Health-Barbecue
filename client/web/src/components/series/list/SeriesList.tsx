import React, { useState, useEffect } from 'react'
import axios from 'axios'

type SeriesListProps = {}

export const SeriesList: React.FC<SeriesListProps> = () => {
	const [list, setList] = useState([])

	useEffect(() => {
		axios.get('/api/series')
			.then(response => {
				setList(response.data)
			})
	}, [])

	return (
		<>
			<div>SeriesList</div>
			<div>{
				list.map(({ uid }) => <div key={uid}>{uid}</div>)
			}</div>
		</>
	)
}
