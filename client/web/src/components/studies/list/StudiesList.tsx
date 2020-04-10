import React, { useEffect } from 'react'

type StudiesListProps = {}

export const StudiesList: React.FC<StudiesListProps> = () => {
	let list: any = [];

	useEffect(() => {
		fetch('/api/studies').then((content: Response) => {
			console.log('__________________', content)
			list = content.body
		})
	}, [])
	return (
		<>
			<div>StudiesList</div>
			<div>{JSON.stringify(list)}</div>
		</>
	)
}
