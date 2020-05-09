import { ISeries } from '../../models/series'
import { getSeriesStore, getCurrent } from './selectors'

const storeState = {
  series: {
    series: { id: 'my-id' } as ISeries,
    list: [{ id: 'my-id2' } as ISeries],
  },
}

describe('seroes selectors', () => {
  describe('getCurrent', () => {
    it('returns the state of selected series', () => {
      const result = getCurrent(storeState)
      expect(result).toEqual({ id: 'my-id' })
    })
  })

  describe('getSeriesStore', () => {
    it('returns the list of users', () => {
      const result = getSeriesStore(storeState)
      expect(result).toEqual(storeState.series)
    })
  })
})
