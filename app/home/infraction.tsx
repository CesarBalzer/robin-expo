import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import VehicleInfo from '@app/components/VehicleInfo';
import ItemInfo from '@app/components/ItemInfo';
import Tabs from '@app/components/Tabs';
import {useRouter} from 'expo-router';

type TabKey = 'open' | 'paid';

const InfractionScreen: React.FC = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<TabKey>('open');
	const tabs: {key: TabKey; label: string}[] = [
		{key: 'open', label: 'Multas em Aberto'},
		{key: 'paid', label: 'Multas Pagas'}
	];

	const openFines = [
		{
			id: 1,
			title: 'Multa por excesso de beleza',
			subtitle: 'R$ 1.234,00',
			helper: 'Vencimento em: 30/11/2029',
			isPaid: true,
			isOverdue: false
		},
		{
			id: 2,
			title: 'Multa por excesso de velocidade',
			subtitle: 'R$ 200,00',
			helper: 'Vencimento em: 30/11/2022',
			isPaid: false,
			isOverdue: true
		},
		{
			id: 3,
			title: 'Multa por não uso do cinto',
			subtitle: 'R$ 100,00',
			helper: 'Vencimento em: 05/12/2022',
			isPaid: true,
			isOverdue: false
		}
	];

	const paidFines = [{id: 4, title: 'Multa por estacionamento irregular', subtitle: 'R$ 50,00', helper: 'Pago em: 10/10/2024'}];

	return (
		<View style={styles.container}>
			<Header />
			<VehicleInfo loading={loading} />
			<Tabs<TabKey> tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

			<ScrollView style={styles.finesContainer} showsVerticalScrollIndicator={false}>
				{activeTab === 'open' &&
					openFines.map((fine, index) => (
						<ItemInfo
							key={index}
							title={fine.title}
							subtitle={fine.subtitle}
							helper={fine.helper}
							isPaid={fine.isPaid}
							isOverdue={fine.isOverdue}
							onPress={() => router.push(`infractions/${fine.id}`)}
						/>
					))}
				{activeTab === 'paid' &&
					paidFines.map((fine, index) => (
						<ItemInfo
							key={index}
							title={fine.title}
							subtitle={fine.subtitle}
							helper={fine.helper}
							isPaid={true}
							isOverdue={false}
							onPress={() => router.push(`infractions/${fine.id}`)}
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

export default InfractionScreen;
