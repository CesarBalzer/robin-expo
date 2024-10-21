export interface IInfraction {
	long_id: string;
	name: string;
	value: number;
	year: number;
	duedate: Date;
	detail: Detail;
	md5: string;
	vehicle_id: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface Detail {
	ait: string;
	data: Date;
	guia: string;
	local: string;
	valor: string;
	receita: string;
	infracao: string;
	municipio: string;
	vencimento: Date;
}
