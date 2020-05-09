import { HttpRequest } from '../common/HttpRequest'
import { IAlgo } from '../../models/IAlgo'
import { IAlgoExeInfo } from '../../models/IAlgoExeInfo';

export class AlgoService {
  private api: HttpRequest<string>

  constructor() {
    this.api = new HttpRequest({ baseURL: '/api/Algo' })
  }

  executeAlgo(algoExecInfo: IAlgoExeInfo): Promise<string> {
    return this.api.post('/execute', algoExecInfo);
  }

  getAllAlgo(): Promise<IAlgo[]> {
    return this.api.get('');
  }

  CreateAlgo(algo: IAlgo) {
    this.api.post('', algo);
  }

  DeleteAlgo(algo: IAlgo) {
    this.api.delete(algo.id);
  }
}

const algoService = new AlgoService()

export default algoService
