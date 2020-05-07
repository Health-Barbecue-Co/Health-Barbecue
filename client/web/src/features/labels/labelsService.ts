import { ISeries } from '../../models/series'

import { ICrudService } from '../common/ICrudService'
import { HttpRequest } from '../common/HttpRequest'
import { ILabel } from '../../models/ILabel'

export class LabelsService implements ICrudService<ILabel> {
  private api: HttpRequest<ILabel>

  constructor() {
    this.api = new HttpRequest({ baseURL: '/api/Label' })
  }

  getAll(): Promise<ILabel[]> {
    return this.api.get('')
  }

  getOne(id: string): Promise<ILabel | null> {
    return this.api.get(id)
  }

  update(id: string, item: ILabel): Promise<ILabel> {
    return this.api.put<ISeries, ILabel>(id, item)
  }

  create(item: ILabel): Promise<ILabel> {
    return this.api.post<ILabel, ILabel>('', item)
  }

  remove(item: ILabel) {
    if (item.id) {
      this.api.delete(item.id)
    }
  }
}

const service = new LabelsService()

export default service
