import { IUser } from '../../models/user'
import userService, { UserService } from './userService'
import { HttpRequest } from '../common/HttpRequest'

jest.mock('../common/HttpRequest')

describe('UserService', () => {
  let mockapiInstance: any

  beforeEach(() => {
    // eslint-disable-next-line prefer-destructuring
    mockapiInstance = HttpRequest.mock.instances[0]
  })

  it('is an instance of ICrudService', () => {
    expect(userService).toBeInstanceOf(UserService)
  })

  describe('UserService.getAll', () => {
    it('exist', () => {
      expect(userService.getAll).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockGet = mockapiInstance.get

      userService.getAll()

      expect(mockGet).toHaveBeenCalled()
    })
  })

  describe('UserService.getOne', () => {
    it('exists', () => {
      expect(userService.getOne).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockGet = mockapiInstance.get
      userService.getOne('my-id')

      expect(mockGet).toHaveBeenCalled()
      expect(mockGet).toHaveBeenCalledWith('my-id')
    })
  })

  describe('UserService.update', () => {
    it('exists', () => {
      expect(userService.update).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockGet = mockapiInstance.put
      userService.update('my-id', { id: 'myId' } as IUser)

      expect(mockGet).toHaveBeenCalled()
      expect(mockGet).toHaveBeenCalledWith('my-id', { id: 'myId' })
    })
  })

  describe('UserService.create', () => {
    it('exists', () => {
      expect(userService.create).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockPost = mockapiInstance.post
      userService.create({ id: 'myId' } as IUser)

      expect(mockPost).toHaveBeenCalled()
      expect(mockPost).toHaveBeenCalledWith('', { id: 'myId' })
    })
  })

  describe('UserService.remove', () => {
    let mockDelete: any

    beforeEach(() => {
      mockapiInstance.delete.mockClear()
      mockDelete = mockapiInstance.delete
    })
    it('exists', () => {
      expect(userService.remove).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      mockDelete = mockapiInstance.delete
      userService.remove({ id: 'myId' } as IUser)

      expect(mockDelete).toHaveBeenCalled()
      expect(mockDelete).toHaveBeenCalledWith('myId')
    })

    it('does nothing if there is no Id', () => {
      mockDelete = mockapiInstance.delete
      userService.remove({} as IUser)

      expect(mockDelete).not.toHaveBeenCalled()
    })
  })
})
