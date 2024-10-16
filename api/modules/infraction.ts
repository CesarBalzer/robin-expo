import Module from './module';

export class Infraction extends Module {
	fetch(id: number) {
		return this.get(`/vehicle/${id}/multa`);
	}
}
