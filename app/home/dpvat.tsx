import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import VehicleInfo from '@app/components/VehicleInfo';
import ItemInfo from '@app/components/ItemInfo';
import Tabs from '@app/components/Tabs';
import {useRouter} from 'expo-router';
import api from '@app/api';
import {formatCurrency} from '@app/utils/helper';
import {formatDate} from 'date-fns';

type TabKey = 'open' | 'paid';

const DpvatScreen: React.FC = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<TabKey>('open');
	const tabs: {key: TabKey; label: string}[] = [
		{key: 'open', label: 'Multas em Aberto'},
		{key: 'paid', label: 'Multas Pagas'}
	];
	const [infractions, setInfractions] = useState();

	useEffect(() => {
		(async () => {
			loadData();
		})();
	}, []);

	const loadData = async () => {
		const id = 'dd54fe70-5462-4947-93fc-42e4c97e3b21';
		try {
			const response = await api.infraction.fetch(id);
			console.log('RESPONSE => ', response);
			// setInfractions(response.multas);
		} catch (error) {}
	};

	const openFinesMock = [
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

	const paidFinesMock = [
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

	return (
		<View style={styles.container}>
			<Header />
			<VehicleInfo loading={loading} />
			<Tabs<TabKey> tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

			<ScrollView style={styles.finesContainer} showsVerticalScrollIndicator={false}>
				{activeTab === 'open' &&
					openFinesMock.map((fine, index) => (
						<ItemInfo
							key={index}
							title={fine.name}
							subtitle={formatCurrency(fine.value)}
							helper={formatDate(new Date(fine.duedate), 'dd/MM/yyyy')}
							isPaid={false}
							isOverdue={true}
							onPress={() =>
								router.push({pathname: `infractions/${fine.long_id}`, params: {infraction: 'random', id: fine.long_id}})
							}
						/>
					))}
				{activeTab === 'paid' &&
					paidFinesMock.map((fine, index) => (
						<ItemInfo
							key={index}
							title={fine.name}
							subtitle={formatCurrency(fine.value)}
							helper={formatDate(new Date(fine.duedate), 'dd/MM/yyyy')}
							isPaid={false}
							isOverdue={true}
							onPress={() =>
								router.push({pathname: `infractions/${fine.long_id}`, params: {infraction: 'random', id: fine.long_id}})
							}
						/>
					))}
			</ScrollView>
		</View>
	);
};

const Header: React.FC = () => (
	<View style={styles.header}>
		<Text style={styles.headerText}>Infrações - Multas</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10
	},
	headerText: {
		fontSize: 20,
		fontWeight: '700'
	},
	finesContainer: {
		marginTop: 10,
		flexGrow: 1
	}
});

export default DpvatScreen;
