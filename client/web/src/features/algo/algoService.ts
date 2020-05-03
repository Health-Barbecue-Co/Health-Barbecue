import { HttpRequest } from '../common/HttpRequest'
import { IAlgoExeInfo } from '../../models/IAlgo'

export class AlgoService {
  private api: HttpRequest<string>

  constructor() {
    this.api = new HttpRequest({ baseURL: '/api/Algo' })
  }

  executeAlgo(algoInfo: IAlgoExeInfo): Promise<string> {
    return this.api.post('', algoInfo);
  }
}

const algoService = new AlgoService()

export default algoService
