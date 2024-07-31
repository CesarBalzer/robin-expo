import axios, { AxiosInstance } from 'axios';
import { Auth } from './modules';

export default class Service {
  client: AxiosInstance;

  //modules
  auth!: Auth;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL
    });

    this.configureInterceptors(this.client);
    this.initializeModules(this.client);
  }

  private configureInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    )

    instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    )
  }

  private initializeModules(client: AxiosInstance) {
    this.auth = new Auth(client);
  }
}