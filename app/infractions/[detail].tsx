import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import VehicleInfo from '@app/components/VehicleInfo';
import {useRouter} from 'expo-router';
import {Colors} from '@app/constants';

const InfractionScreen: React.FC = () => {
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
			<VehicleInfo loading={loading} />

			<ScrollView style={styles.finesContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<View style={styles.cardContent}>
						<Text style={styles.title}>{mockMultaDetail.name}</Text>
						<Text style={styles.subtitle}>Valor: {mockMultaDetail.detail.valor}</Text>
						<Text style={styles.helper}>Vencimento: {mockMultaDetail.duedate}</Text>
						<View style={styles.separator} />
						<Text style={styles.label}>Ait: {mockMultaDetail.detail.ait}</Text>
						<Text style={styles.label}>Data: {mockMultaDetail.detail.data}</Text>
						<Text style={styles.label}>Guia: {mockMultaDetail.detail.guia}</Text>
						<Text style={styles.label}>Local: {mockMultaDetail.detail.local}</Text>
						<Text style={styles.label}>Infracao: {mockMultaDetail.detail.infracao}</Text>
						<Text style={styles.label}>Municipio: {mockMultaDetail.detail.municipio}</Text>
						<Text style={styles.label}>Receita: {mockMultaDetail.detail.receita}</Text>
					</View>
				</View>
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
	label: {
		fontSize: 14,
		color: Colors.textSecondary,
		marginBottom: 5
	}
});

export default InfractionScreen;
