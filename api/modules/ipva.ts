import Module from './module';

export class Ipva extends Module {
	fetch(id: number) {
		return this.get(`/vehicle/${id}/ipva`);
	}
}
