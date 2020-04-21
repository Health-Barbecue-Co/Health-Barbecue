import { HttpRequest } from '../common/HttpRequest'

export class MirrorPacsService {
  private api: HttpRequest<string>

  constructor() {
    this.api = new HttpRequest({ baseURL: '/api/PacsMirror' })
  }

  mirrorPacs(): Promise<string> {
    return this.api.get('')
  }
}

const mirrorPacsService = new MirrorPacsService()

export default mirrorPacsService
