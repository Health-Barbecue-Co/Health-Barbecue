import { IUser } from '../../models/user'

import { ICrudService } from '../common/ICrudService'
import { HttpRequest } from '../common/HttpRequest'
import { AxiosResponse } from 'axios'

export class UserService implements ICrudService<IUser> {
  private api: HttpRequest<IUser>
  private pacsApi: HttpRequest<any>

  constructor() {
    this.api = new HttpRequest({
      baseURL: '/api/users',
    })

    this.pacsApi = new HttpRequest({
      baseURL: '/orthanc/dicom-web'
    })
  }

  getAll(): Promise<IUser[]> {
    return this.api.get('')
  }

  getOne(id: string): Promise<IUser | null> {
    return this.api.get(id)
  }

  update(id: string, item: IUser): Promise<IUser> {
    return this.api.put<IUser, IUser>(id, item)
  }

  create(item: IUser): Promise<IUser> {
    return this.api.post<IUser, IUser>('', item)
  }

  remove(item: IUser) {
    if (item.id) {
      this.api.delete(item.id)
    }
  }

  getInstanceUrls(SeriesInstanceUID: string): Promise<string[]> {
    return this.pacsApi.get('instances', { params: { SeriesInstanceUID }}).then((response: AxiosResponse) => {
      const { data: arrayOfInstance } = response
      // Order photos
      arrayOfInstance.sort((instance1: any, instance2: any) => instance1["00200013"]['Value'][0] - instance2["00200013"]['Value'][0])
      return arrayOfInstance.map((instance: any )=> {
        const objectUID = instance["00080018"]['Value'][0];
        const transferSyntax = instance["00080016"]['Value'][0];
        return `wadouri:/orthanc/wado?requestType=WADO&objectUID=${objectUID}&contentType=application%2Fdicom&transferSyntax=${transferSyntax}`;
      })
    })
  }
}

const service = new UserService()

export default service
