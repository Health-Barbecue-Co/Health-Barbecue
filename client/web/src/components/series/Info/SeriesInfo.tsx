import React from 'react'

type SeriesInfoProps = {
  id: string
}

export const SeriesInfo: React.FC<SeriesInfoProps> = (
  props: SeriesInfoProps
) => {
  const { id } = props

  return <div>{id}</div>
}
