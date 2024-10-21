import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import VehicleInfo from '@app/components/vehicle/VehicleInfo';
import ItemInfo from '@app/components/ItemInfo';
import Tabs from '@app/components/Tabs';
import {useRouter} from 'expo-router';
import api from '@app/api';
import {formatCurrency} from '@app/utils/helper';
import {formatDate} from 'date-fns';
import {IInfraction} from '@app/types/IInfraction';
import Alert from '@app/components/Alert';
import {useVehicle} from '@app/hooks/useVehicle';

type TabKey = 'open' | 'paid';

const InfractionScreen: React.FC = () => {
	const router = useRouter();
	const {vehicle, setVehicles} = useVehicle();
	const [loading, setLoading] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<TabKey>('open');
	const tabs: {key: TabKey; label: string}[] = [
		{key: 'open', label: 'Em Aberto'},
		{key: 'paid', label: 'Pagos'}
	];
	const [data, setData] = useState<IInfraction[]>([]);
	const [openInfractions, setOpenInfractions] = useState<IInfraction[]>([]);
	const [paidInfractions, setPaidInfractions] = useState<IInfraction[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const id = '';
		try {
			setLoading(true);
			setErrorMessage(null);
			const response = await api.infraction.fetch(vehicle.long_id);

			console.log('RESPONSE => ', response);

			if (response.error) {
				setErrorMessage(`Erro ${response.code}: ${response.error}`);
				setData([]);
				setOpenInfractions([]);
				setPaidInfractions([]);
			} else {
				setData(response.multa);
				setOpenInfractions(handleOpenInfractions(response.multa));
				setPaidInfractions(handlePaidInfractions(response.multa));
			}
		} catch (error) {
			console.error(error);
			setErrorMessage('Erro inesperado ao carregar as infrações.');
			setData([]);
			setOpenInfractions([]);
			setPaidInfractions([]);
		} finally {
			setLoading(false);
		}
	};

	const handleOpenInfractions = (data: IInfraction[]): IInfraction[] => {
		return data.filter((fine) => {
			const dueDate = new Date(fine.detail.vencimento);
			return dueDate >= new Date() || !fine.detail.vencimento;
		});
	};

	const handlePaidInfractions = (data: IInfraction[]): IInfraction[] => {
		return data.filter((fine) => {
			const dueDate = new Date(fine.detail.vencimento);
			const isPaid = false;
			return dueDate < new Date() && !isPaid;
		});
	};

	return (
		<View style={styles.container}>
			<Header />
			<VehicleInfo />
			<Tabs<TabKey> tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

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
					<>
						{activeTab === 'open' &&
							(openInfractions.length === 0 ? (
								<Alert message="Não existem multas em aberto no momento." />
							) : (
								openInfractions.map((fine, index) => {
									const dueDate = new Date(fine.duedate);
									const isPaid = false;
									const isOverdue = dueDate < new Date() && !isPaid;

									return (
										<ItemInfo
											key={index}
											title={fine.name}
											subtitle={formatCurrency(fine.value)}
											helper={formatDate(dueDate, 'dd/MM/yyyy')}
											isPaid={isPaid}
											isOverdue={isOverdue}
											onPress={() =>
												router.push({pathname: `infractions/${fine.long_id}`, params: {infraction: 'random', id: fine.long_id}})
											}
										/>
									);
								})
							))}
						{activeTab === 'paid' &&
							(paidInfractions.length === 0 ? (
								<Alert message="Não existem multas pagas no momento." />
							) : (
								paidInfractions.map((fine, index) => {
									const dueDate = new Date(fine.duedate);
									const isPaid = true;
									const isOverdue = dueDate < new Date() && !isPaid;

									return (
										<ItemInfo
											key={index}
											title={fine.name}
											subtitle={formatCurrency(fine.value)}
											helper={formatDate(dueDate, 'dd/MM/yyyy')}
											isPaid={isPaid}
											isOverdue={isOverdue}
											onPress={() => router.push({pathname: `infractions/${fine.long_id}`})}
										/>
									);
								})
							))}
					</>
				)}
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

export default InfractionScreen;
