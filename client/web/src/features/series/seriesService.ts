import { AxiosResponse } from 'axios'

import { ISeries } from '../../models/series'

import { ICrudService } from '../common/ICrudService'
import { HttpRequest } from '../common/HttpRequest'

export class SeriesService implements ICrudService<ISeries> {
  private api: HttpRequest<ISeries>

  private pacsApi: HttpRequest<any>

  constructor() {
    this.api = new HttpRequest({ baseURL: '/api/series' })
    this.pacsApi = new HttpRequest({ baseURL: '/orthanc/dicom-web' })
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

  getInstanceUrls(SeriesInstanceUID: string): Promise<string[]> {
    return this.pacsApi
      .get('instances', { params: { SeriesInstanceUID } })
      .then((response: AxiosResponse) => {
        const { data: arrayOfInstance } = response

        // Order photos
        arrayOfInstance.sort(
          (instance1: any, instance2: any) =>
            instance1['00200013'].Value[0] - instance2['00200013'].Value[0]
        )
        return arrayOfInstance.map((instance: any) => {
          const objectUID = instance['00080018'].Value[0]
          const transferSyntax = instance['00080016'].Value[0]
          return `wadouri:/orthanc/wado?requestType=WADO&objectUID=${objectUID}&contentType=application%2Fdicom&transferSyntax=${transferSyntax}`
        })
      })
  }
}

const service = new SeriesService()

export default service
