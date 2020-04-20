import { ISeries } from '../../models/series'

import { ICrudService } from '../common/ICrudService'
import { HttpRequest } from '../common/HttpRequest'

export class SeriesService implements ICrudService<ISeries> {
  private api: HttpRequest<ISeries>

  constructor() {
    this.api = new HttpRequest({ baseURL: '/api/series' })
  }

  getAll(): Promise<ISeries[]> {
    return this.api.get('')
  }

  getOne(id: string): Promise<ISeries | null> {
    return this.api.get(id)
  }

  update(id: string, item: ISeries): Promise<ISeries> {
    return this.api.put<ISeries, ISeries>(id, item)
  }

  create(item: ISeries): Promise<ISeries> {
    return this.api.post<ISeries, ISeries>('', item)
  }

  remove(item: ISeries) {
    if (item.id) {
      this.api.delete(item.id)
    }
  }
}

const service = new SeriesService()

export default service
