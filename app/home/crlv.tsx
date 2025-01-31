import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import VehicleInfo from '@app/components/vehicle/VehicleInfo';
import ItemInfo from '@app/components/ItemInfo';
import Tabs from '@app/components/Tabs';
import {useRouter} from 'expo-router';
import api from '@app/api';
import {formatCurrency} from '@app/utils/helper';
import {formatDate} from 'date-fns';
import Alert from '@app/components/Alert';
import {useVehicle} from '@app/hooks/useVehicle';
import {IDpvat} from '@app/types/IDpvat';

type TabKey = 'open' | 'paid';

const mockDpvat = [
	{
		long_id: '12345678',
		name: 'IPVA 2025',
		value: 3500,
		year: 2025,
		duedate: '2025-02-10',
		detail: {},
		status: 'pendente'
	},
	{
		long_id: '12345679',
		name: 'IPVA 2024',
		value: 2800,
		year: 2024,
		duedate: '2024-02-10',
		detail: {},
		status: 'pago'
	}
];

const CrlvScreen: React.FC = () => {
	const router = useRouter();
	const {vehicle} = useVehicle();
	console.log('VEHICLE => ', vehicle);
	const {name, plate, renavam, updated_at} = vehicle || {};
	const [loading, setLoading] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<TabKey>('open');
	const tabs: {key: TabKey; label: string}[] = [
		{key: 'open', label: 'Em Aberto'},
		{key: 'paid', label: 'Pagos'}
	];
	const [data, setData] = useState<IDpvat[]>(mockDpvat);
	const [opens, setOpens] = useState<IDpvat[]>([mockDpvat[0]]);
	const [paids, setPaids] = useState<IDpvat[]>([mockDpvat[1]]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		// loadData();
	}, []);

	const loadData = async () => {
		const id = '';
		try {
			setLoading(true);
			setErrorMessage(null);
			const response = await api.dpvat.fetch(vehicle.long_id);

			console.log('RESPONSE => ', response);

			// if (response.error) {
			// 	setErrorMessage(`Erro ${response.code}: ${response.error}`);
			// 	setData([]);
			// 	setOpens([]);
			// 	setPaids([]);
			// } else {
			// 	setData(response.multa);
			// 	setOpens(handleOpens(response.multa));
			// 	setPaids(handlePaids(response.multa));
			// }
		} catch (error) {
			console.error(error);
			setErrorMessage('Erro inesperado ao carregar o crvl.');
			setData([]);
			setOpens([]);
			setPaids([]);
		} finally {
			setLoading(false);
		}
	};

	const handleOpens = (data: IDpvat[]): IDpvat[] => {
		return (
			data &&
			data.filter((fine) => {
				const dueDate = new Date(fine.detail.vencimento);
				return dueDate >= new Date() || !fine.detail.vencimento;
			})
		);
	};

	const handlePaids = (data: IDpvat[]): IDpvat[] => {
		return (
			data &&
			data.filter((fine) => {
				const dueDate = new Date(fine.detail.vencimento);
				const isPaid = false;
				return dueDate < new Date() && !isPaid;
			})
		);
	};

	return (
		<View style={styles.container}>
			<Header />

			<ScrollView style={styles.finesContainer} showsVerticalScrollIndicator={false}>
				{errorMessage ? (
					<Alert
						message={errorMessage}
						color="green"
						iconPosition="right"
						closable={true}
						autoclose={true}
						autocloseTime={3000}
						onClose={() => console.log('Alert closed')}
					/>
				) : (
					<ItemInfo
						title={`${vehicle?.info?.brand_model ?? ''}`}
						subtitle={`${vehicle.plate}`}
						helperPrefix="Último licenciamento: "
						helper={vehicle?.info?.last_license}
						onPress={() =>
							router.push({
								pathname: `crlvs/${vehicle.long_id}`
							})
						}
					/>
				)}
			</ScrollView>
		</View>
	);
};

const Header: React.FC = () => (
	<View style={styles.header}>
		<Text style={styles.headerText}>CRLV</Text>
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

export default CrlvScreen;
