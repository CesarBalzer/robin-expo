import Module from './module';

export class Dpvat extends Module {
	fetch(id: number) {
		return this.get(`/vehicle/${id}/dpvat`);
	}
}
