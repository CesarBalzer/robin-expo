import Module from './module';

export class Vehicle extends Module {
	fetch(id: number) {
		return this.get(`/vehicle/${id}`);
	}
}
