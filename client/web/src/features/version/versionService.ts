import { HttpRequest } from '../common/HttpRequest'
import { IVersion } from '../../models/version'

export class VersionService {
  private api: HttpRequest<IVersion>

  constructor() {
    this.api = new HttpRequest({
      baseURL: '/api/version',
    })
  }

  get(): Promise<IVersion> {
    return this.api.get('')
  }
}

const service = new VersionService()

export default service
