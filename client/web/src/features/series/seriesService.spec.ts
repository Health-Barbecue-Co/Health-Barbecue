import { ISeries } from '../../models/series'
import seriesService, { SeriesService } from './seriesService'
import { HttpRequest } from '../common/HttpRequest'

jest.mock('../common/HttpRequest')

describe('SeriesService', () => {
  let mockapiInstance: any

  beforeEach(() => {
    // eslint-disable-next-line prefer-destructuring
    mockapiInstance = HttpRequest.mock.instances[0]
  })

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    // HttpRequest.mockClear()
  })

  it('is an instance of ICrudService', () => {
    expect(seriesService).toBeInstanceOf(SeriesService)
  })

  describe('SeriesService.getAll', () => {
    it('exist', () => {
      expect(seriesService.getAll).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockGet = mockapiInstance.get

      seriesService.getAll()

      expect(mockGet).toHaveBeenCalled()
    })
  })

  describe('SeriesService.getOne', () => {
    it('exists', () => {
      expect(seriesService.getOne).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockGet = mockapiInstance.get
      seriesService.getOne('my-id')

      expect(mockGet).toHaveBeenCalled()
      expect(mockGet).toHaveBeenCalledWith('my-id')
    })
  })

  describe('SeriesService.update', () => {
    it('exists', () => {
      expect(seriesService.update).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockGet = mockapiInstance.put
      seriesService.update('my-id', { id: 'myId' } as ISeries)

      expect(mockGet).toHaveBeenCalled()
      expect(mockGet).toHaveBeenCalledWith('my-id', { id: 'myId' })
    })
  })

  describe('SeriesService.create', () => {
    it('exists', () => {
      expect(seriesService.create).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockPost = mockapiInstance.post
      seriesService.create({ id: 'myId' } as ISeries)

      expect(mockPost).toHaveBeenCalled()
      expect(mockPost).toHaveBeenCalledWith('', { id: 'myId' })
    })
  })

  describe('SeriesService.remove', () => {
    let mockDelete: any

    beforeEach(() => {
      mockapiInstance.delete.mockClear()
      mockDelete = mockapiInstance.delete
    })
    it('exists', () => {
      expect(seriesService.remove).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      mockDelete = mockapiInstance.delete
      seriesService.remove({ id: 'myId' } as ISeries)

      expect(mockDelete).toHaveBeenCalled()
      expect(mockDelete).toHaveBeenCalledWith('myId')
    })

    it('does nothing if there is no Id', () => {
      mockDelete = mockapiInstance.delete
      seriesService.remove({} as ISeries)

      expect(mockDelete).not.toHaveBeenCalled()
    })
  })
})
