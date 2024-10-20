import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, Alert} from 'react-native';
import VehicleInfo from '@app/components/vehicle/VehicleInfo';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Colors} from '@app/constants';
import {formatDate} from 'date-fns';
import {ButtonCustom} from '@app/components/ButtonCustom';
import {getErrorMessage} from '@app/utils/text';
import api from '@app/api';
import {IInfraction} from '@app/types/IInfraction';

const InfractionScreen: React.FC = () => {
	const param = useLocalSearchParams();
	const {detail} = param;
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const [infraction, setInfraction] = useState<IInfraction>();

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const response = await api.infraction.fetch(String(detail));
				const multa = response.multa;

				const selectedMulta = multa.find((item: any) => item.long_id === String(detail));

				console.log('SELECTED MULTA => ', selectedMulta);

				setInfraction(selectedMulta);
			} catch (error) {
				Alert.alert('Erro', getErrorMessage(error));
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			<VehicleInfo />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<View style={styles.cardContent}>
						<Text style={styles.title}>{infraction?.name}</Text>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Número</Text>
							<Text style={styles.value}>{infraction?.detail.ait}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Data da autuação</Text>
							<Text style={styles.value}>
								{infraction?.detail.data && formatDate(new Date(infraction?.detail.data), 'dd/MM/yyyy HH:ii:ss')}
							</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Local</Text>
							<Text style={styles.value}>{infraction?.detail.local}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Valor</Text>
							<Text style={styles.value}>{infraction?.detail.valor}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Vencimento</Text>
							<Text style={styles.value}>{infraction?.duedate && formatDate(infraction?.duedate, 'dd/MM/yyyy')}</Text>
						</View>

						<View style={styles.separator} />

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Guia</Text>
							<Text style={styles.value}>{infraction?.detail.guia}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Infracao</Text>
							<Text style={styles.value}>{infraction?.detail.infracao}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Municipio</Text>
							<Text style={styles.value}>{infraction?.detail.municipio}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Receita</Text>
							<Text style={styles.value}>{infraction?.detail.receita}</Text>
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
								pathname: `payments/${infraction?.long_id}`,
								params: {infraction: 'random', id: infraction?.long_id}
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
