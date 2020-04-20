import { IUser } from '../../models/user'
import { getSelected, getList } from './selectors'

const storeState = {
  user: {
    user: { id: 'my-id' } as IUser,
    list: [{ id: 'my-id2' } as IUser],
  },
}

describe('user selectors', () => {
  describe('getSelected', () => {
    it('returns the state of selected user', () => {
      const result = getSelected(storeState)
      expect(result).toEqual({ id: 'my-id' })
    })
  })

  describe('getList', () => {
    it('returns the list of users', () => {
      const result = getList(storeState)
      expect(result).toEqual([{ id: 'my-id2' }])
    })
  })
})
