import { getAuth, getAuthMessage } from './selectors'

const authState = {
  auth: {
    auth: {
      id: 'my-id',
    },
    message: 'my auth message',
  },
}

describe('auth selectors', () => {
  describe('getAuth', () => {
    it('returns the authentication info', () => {
      const result = getAuth(authState)
      expect(result).toEqual({ id: 'my-id' })
    })
  })

  describe('getAuthMessage', () => {
    it('returns auth message', () => {
      const result = getAuthMessage(authState)
      expect(result).toEqual('my auth message')
    })
  })
})
