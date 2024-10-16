import Module from './module';

export class License extends Module {
	fetch(id: number) {
		return this.get(`/vehicle/${id}/licenciamento`);
	}
}
