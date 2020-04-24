import { IUser } from '../../models/user'

import { ICrudService } from '../common/ICrudService'
import { HttpRequest } from '../common/HttpRequest'

export class UserService implements ICrudService<IUser> {
  private api: HttpRequest<IUser>

  constructor() {
    this.api = new HttpRequest({
      baseURL: '/api/users',
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
}

const service = new UserService()

export default service
