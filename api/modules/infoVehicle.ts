import Module from './module';

export class InfoVehicle extends Module {
	fetch(id: number) {
		return this.get(`/vehicle/${id}/info`);
	}
}
