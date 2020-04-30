import { SeriesState } from './types'

export const getSeriesStore = (state: any): SeriesState => state.series

export const getCurrent = (state: any) => {
  const { series } = state
  return series.series
}
