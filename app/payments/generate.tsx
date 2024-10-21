import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import VehicleInfo from '@app/components/vehicle/VehicleInfo';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Colors} from '@app/constants';
import {Button} from '@app/components';

const InfractionScreen: React.FC = () => {
	const param = useLocalSearchParams();
	console.log('PARAM => ', param);
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const mockMultaDetail = {
		name: 'Multa por estacionamento irregular',
		value: 50.0,
		year: 2023,
		duedate: '2023-10-10',
		detail: {
			ait: 'AA01690791',
			data: '2023-06-13 19:43:00',
			guia: '180187820',
			local: 'AV. CARLOS CALDEIRA FILHO, SN',
			valor: 'R$ 50,00',
			receita: 'DETRAN',
			infracao: 'Estacionamento irregular.',
			municipio: 'São Paulo',
			vencimento: '2023-10-10'
		}
	};

	return (
		<View style={styles.container}>
			<Header />
			<VehicleInfo />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<View style={styles.cardContent}>
						<Text style={styles.title}>{mockMultaDetail.name}</Text>

						


					</View>
				</View>
				<View style={styles.cardFooter}>
					<Button label='PAGAR' size="medium" />
				</View>
			</ScrollView>
		</View>
	);
};

const Header: React.FC = () => (
	<View style={styles.header}>
		<Text style={styles.headerText}>QRCode de pagamento</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f9f9f9',
		padding: 20
	},
	scrollContainer: {
		paddingBottom: 20
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
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 15,
		padding: 20,
		marginVertical: 10,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 5},
		shadowOpacity: 0.1,
		shadowRadius: 15,
		elevation: 5
	},
	cardContent: {
		flexDirection: 'column'
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		marginBottom: 10,
		color: Colors.primary
	},
	subtitle: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 10,
		color: Colors.textSecondary
	},
	helper: {
		fontSize: 14,
		color: Colors.textSecondary,
		marginBottom: 10
	},
	separator: {
		borderBottomColor: '#E0E0E0',
		borderBottomWidth: 1,
		marginVertical: 10
	},
	infoContainer: {
		marginBottom: 15
	},
	label: {
		color: '#006385',
		fontSize: 16,
		marginBottom: 4
	},
	value: {
		color: '#000',
		fontSize: 20,
		lineHeight: 24
	},
	cardFooter:{
		paddingVertical:20
	}
});

export default InfractionScreen;
