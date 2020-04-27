import { AxiosResponse } from 'axios'
import { HttpRequest } from '../common/HttpRequest'
import { AuthenticatedUser } from '../../models/authenticatedUser'

export class AuthService {
  private api: HttpRequest<AuthenticatedUser>

  constructor() {
    this.api = new HttpRequest({
      baseURL: '/api/auth',
    })
  }

  login(login: string, password: string): Promise<AuthenticatedUser> {
    return this.api
      .post('authenticate', { Username: login, Password: password })
      .then((response: AxiosResponse) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(response.data))

        return response.data
      })
  }

  checkAuth(): Promise<AuthenticatedUser> {
    return this.api.get('is-authenticate')
  }

  public static logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
  }
}

const service = new AuthService()

export default service
