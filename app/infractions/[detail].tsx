import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import VehicleInfo from '@app/components/vehicle/VehicleInfo';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Colors} from '@app/constants';
import {Button} from '@app/components';
import {formatDate} from 'date-fns';
import {ButtonCustom} from '@app/components/ButtonCustom';

const InfractionScreen: React.FC = () => {
	const param = useLocalSearchParams();
	console.log('PARAM => ', param);
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const mockMultaDetail = {
		long_id: 'dd54fe70-5462-4947-93fc-42e4c97e3b21',
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
			<VehicleInfo />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<View style={styles.cardContent}>
						<Text style={styles.title}>{mockMultaDetail.name}</Text>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Número</Text>
							<Text style={styles.value}>{mockMultaDetail.detail.ait}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Data da autuação</Text>
							<Text style={styles.value}>
								{mockMultaDetail.detail.data && formatDate(new Date(mockMultaDetail.detail.data), 'dd/MM/yyyy HH:ii:ss')}
							</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Local</Text>
							<Text style={styles.value}>{mockMultaDetail.detail.local}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Valor</Text>
							<Text style={styles.value}>{mockMultaDetail.detail.valor}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Vencimento</Text>
							<Text style={styles.value}>{mockMultaDetail.duedate && formatDate(mockMultaDetail.duedate, 'dd/MM/yyyy')}</Text>
						</View>

						<View style={styles.separator} />

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Guia</Text>
							<Text style={styles.value}>{mockMultaDetail.detail.guia}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Infracao</Text>
							<Text style={styles.value}>{mockMultaDetail.detail.infracao}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Municipio</Text>
							<Text style={styles.value}>{mockMultaDetail.detail.municipio}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Receita</Text>
							<Text style={styles.value}>{mockMultaDetail.detail.receita}</Text>
						</View>
					</View>
				</View>
				<View style={styles.cardFooter}>
					<ButtonCustom
						fullWidth
						label="PAGAR"
						size="medium"
						onPress={() =>
							router.push({
								pathname: `payments/${mockMultaDetail.long_id}`,
								params: {infraction: 'random', id: mockMultaDetail.long_id}
							})
						}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

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
		marginVertical: 25,
		textAlign: 'center',
		textTransform: 'uppercase',
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
	cardFooter: {
		paddingVertical: 20
	}
});

export default InfractionScreen;
