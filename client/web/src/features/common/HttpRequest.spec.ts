import { mockAxios } from 'mockAxios'
import { HttpRequest } from './HttpRequest'

type T = {}

describe('HttpRequest', () => {
  let instance: HttpRequest<T>

  beforeEach(() => {
    mockAxios.reset()
  })

  describe('get', () => {
    beforeEach(() => {
      instance = new HttpRequest<T>({})
    })

    it('returns a Promise', () => {
      mockAxios.onGet('my-url').replyOnce(200, [{ id: 'my-id' }])
      const result = instance.get('my-url', {})
      expect(result).toBeInstanceOf(Promise)
    })

    it('returns the data', async () => {
      mockAxios.onGet('my-url').replyOnce(200, [{ id: 'my-id' }])
      const result = await instance.get('my-url', {})

      expect(result.data).toEqual([{ id: 'my-id' }])
    })
  })

  describe('delete', () => {
    beforeEach(() => {
      instance = new HttpRequest<T>({})
    })

    it('returns a Promise', () => {
      mockAxios.onDelete('my-url').replyOnce(200, 123)
      const result = instance.delete('my-url', {})
      expect(result).toBeInstanceOf(Promise)
    })
  })

  describe('post', () => {
    beforeEach(() => {
      instance = new HttpRequest<T>({})
    })

    it('returns a Promise', () => {
      mockAxios.onPost('my-url').replyOnce(200, { element: 'my-content' })
      const result = instance.post('my-url', {})
      expect(result).toBeInstanceOf(Promise)
    })

    it('returns some data', async () => {
      mockAxios.onPost('my-url').replyOnce(200, { element: 'my-content' })
      const result = await instance.post('my-url', {})

      expect(result.data).toEqual({ element: 'my-content' })
    })
  })

  describe('put', () => {
    beforeEach(() => {
      instance = new HttpRequest<T>({})
    })

    it('returns a Promise', () => {
      mockAxios.onPut('my-url').replyOnce(200, { element: 'my-content' })
      const result = instance.put('my-url', {})
      expect(result).toBeInstanceOf(Promise)
    })

    it('returns some data', async () => {
      mockAxios.onPut('my-url').replyOnce(200, { element: 'my-content' })
      const result = await instance.put('my-url', {})

      expect(result.data).toEqual({ element: 'my-content' })
    })
  })

  describe('patch', () => {
    beforeEach(() => {
      instance = new HttpRequest<T>({})
    })

    it('returns a Promise', () => {
      mockAxios.onPatch('my-url').replyOnce(200, { element: 'my-content' })
      const result = instance.patch('my-url', {})
      expect(result).toBeInstanceOf(Promise)
    })

    it('returns some data', async () => {
      mockAxios.onPatch('my-url').replyOnce(200, { element: 'my-content' })
      const result = await instance.patch('my-url', {})

      expect(result.data).toEqual({ element: 'my-content' })
    })
  })
})
