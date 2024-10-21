export const openInfractionMock = [
	{
		long_id: 1,
		name: 'Multa por excesso de beleza',
		value: 1234.0,
		year: 2029,
		duedate: '2029-11-30',
		detail: {
			ait: 'AA12345678',
			data: '2029-11-01 12:00:00',
			guia: '123456789',
			local: 'Rua da Beleza, 123',
			valor: 'R$ 1.234,00',
			receita: 'DETRAN',
			infracao: 'Excesso de beleza',
			municipio: 'São Paulo',
			vencimento: '2029-11-30'
		}
	},
	{
		long_id: 2,
		name: 'Multa por excesso de velocidade',
		value: 200.0,
		year: 2022,
		duedate: '2022-11-30',
		detail: {
			ait: 'AA23456789',
			data: '2022-11-01 14:00:00',
			guia: '987654321',
			local: 'Av. Rápida, 456',
			valor: 'R$ 200,00',
			receita: 'DETRAN',
			infracao: 'Excesso de velocidade',
			municipio: 'Rio de Janeiro',
			vencimento: '2022-11-30'
		}
	},
	{
		long_id: 3,
		name: 'Multa por não uso do cinto',
		value: 100.0,
		year: 2022,
		duedate: '2022-12-05',
		detail: {
			ait: 'AA34567890',
			data: '2022-12-01 10:00:00',
			guia: '112233445',
			local: 'Rua da Segurança, 789',
			valor: 'R$ 100,00',
			receita: 'DETRAN',
			infracao: 'Não uso do cinto',
			municipio: 'Curitiba',
			vencimento: '2022-12-05'
		}
	}
];

export const paidInfractionMock = [
	{
		long_id: 4,
		name: 'Multa por estacionamento irregular',
		value: 50.0,
		year: 2024,
		duedate: '2024-10-10',
		detail: {
			ait: 'AA45678901',
			data: '2024-06-13 19:43:00',
			guia: '180187820',
			local: 'AV. CARLOS CALDEIRA FILHO, SN',
			valor: 'R$ 50,00',
			receita: 'DETRAN',
			infracao: 'Estacionamento irregular.',
			municipio: 'São Paulo',
			vencimento: '2024-10-10'
		}
	}
];
