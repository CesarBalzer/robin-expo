import axios, {AxiosInstance} from 'axios';
import {Auth, Dpvat, Vehicle} from './modules';
import {Infraction} from './modules/infraction';
import StorageService from '@app/services/StorageService';
import {Ipva} from './modules/ipva';
import {InfoVehicle} from './modules/infoVehicle';

export default class Service {
	client: AxiosInstance;
	auth!: Auth;
	infraction!: Infraction;
	dpvat!: Dpvat;
	ipva!: Ipva;
	info!: InfoVehicle;
	vehicle!: Vehicle;

	constructor(baseURL: string) {
		this.client = axios.create({
			baseURL
		});

		this.configureInterceptors(this.client);
		this.initializeModules(this.client);
	}

	private configureInterceptors(instance: AxiosInstance) {
		instance.interceptors.request.use(
			async (config) => {
				const token = await StorageService.getData('access_token');
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		instance.interceptors.response.use(
			(response) => response,
			(error) => Promise.reject(error)
		);
	}

	private initializeModules(client: AxiosInstance) {
		this.auth = new Auth(client);
		this.infraction = new Infraction(client);
		this.dpvat = new Dpvat(client);
		this.ipva = new Ipva(client);
		this.info = new InfoVehicle(client);
		this.vehicle = new Vehicle(client);
	}
}
