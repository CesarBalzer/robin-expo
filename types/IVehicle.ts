import {IDpvat} from './IDpvat';
import {IIpva} from './IIpva';
import {IInfraction} from './IInfraction';
import {ILicense} from './ILicense';
import {IInfoVehicle} from './IInfoVehicle';

export interface IVehicle {
	long_id: string;
	plate: string;
	chassis: string;
	renavam: string;
	document: string;
	last_query: string;
	last_query_id: string;
	last_query_status: string;
	created_at: string;
	updated_at: string;
	deleted_at?: string;
	info: IInfoVehicle;
	dpvat: IDpvat[];
	ipva: IIpva[];
	multa: IInfraction[];
	licenciamento: ILicense[];
}

export interface IVehiclesProps {
	vehicles: IVehicle[];
}
