import { ISerie } from '../../models/serie'

import { ICrudService } from '../common/ICrudService'
import { HttpRequest } from '../common/HttpRequest'

class SerieService implements ICrudService<ISerie> {
  private static instance: SerieService

  private api: HttpRequest<ISerie>

  constructor() {
    this.api = new HttpRequest({ baseURL: '/api/series' })
  }

  static getInstance() {
    if (!SerieService.instance) {
      SerieService.instance = new SerieService()
    }

    return SerieService.instance
  }

  getAll(): Promise<ISerie[]> {
    return this.api.get('')
  }

  getOne(id: string): Promise<ISerie | null> {
    return this.api.get(id)
  }

  update(id: string, item: ISerie): Promise<ISerie> {
    return this.api.put<ISerie, ISerie>(id, item)
  }

  create(item: ISerie): Promise<ISerie> {
    return this.api.post<ISerie, ISerie>('', item)
  }

  remove(item: ISerie) {
    if (item.id) {
      this.api.delete(item.id)
    }
  }
}

const service = new SerieService()

export default service
