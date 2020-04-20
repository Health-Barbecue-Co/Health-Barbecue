import { ISeries } from '../../models/series'
import serieService, { SerieService } from './seriesService'
import { HttpRequest } from '../common/HttpRequest'

jest.mock('../common/HttpRequest')

describe('SerieService', () => {
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
    expect(serieService).toBeInstanceOf(SerieService)
  })

  describe('SerieService.getAll', () => {
    it('exist', () => {
      expect(serieService.getAll).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockGet = mockapiInstance.get

      serieService.getAll()

      expect(mockGet).toHaveBeenCalled()
    })
  })

  describe('SerieService.getOne', () => {
    it('exists', () => {
      expect(serieService.getOne).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockGet = mockapiInstance.get
      serieService.getOne('my-id')

      expect(mockGet).toHaveBeenCalled()
      expect(mockGet).toHaveBeenCalledWith('my-id')
    })
  })

  describe('SerieService.update', () => {
    it('exists', () => {
      expect(serieService.update).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockGet = mockapiInstance.put
      serieService.update('my-id', { id: 'myId' } as ISeries)

      expect(mockGet).toHaveBeenCalled()
      expect(mockGet).toHaveBeenCalledWith('my-id', { id: 'myId' })
    })
  })

  describe('SerieService.create', () => {
    it('exists', () => {
      expect(serieService.create).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      const mockPost = mockapiInstance.post
      serieService.create({ id: 'myId' } as ISeries)

      expect(mockPost).toHaveBeenCalled()
      expect(mockPost).toHaveBeenCalledWith('', { id: 'myId' })
    })
  })

  describe('SerieService.remove', () => {
    let mockDelete: any

    beforeEach(() => {
      mockapiInstance.delete.mockClear()
      mockDelete = mockapiInstance.delete
    })
    it('exists', () => {
      expect(serieService.remove).toBeDefined()
    })

    it('calls an HttpRequest', () => {
      mockDelete = mockapiInstance.delete
      serieService.remove({ id: 'myId' } as ISeries)

      expect(mockDelete).toHaveBeenCalled()
      expect(mockDelete).toHaveBeenCalledWith('myId')
    })

    it('does nothing if there is no Id', () => {
      mockDelete = mockapiInstance.delete
      serieService.remove({} as ISeries)

      expect(mockDelete).not.toHaveBeenCalled()
    })
  })
})
