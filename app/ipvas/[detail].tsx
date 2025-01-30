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

	return (
		<View style={styles.container}>
			<VehicleInfo />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<View style={styles.cardContent}>
						<View style={styles.infoContainer}>
							<Text style={styles.label}>Descrição</Text>
							<Text style={styles.value}>{param.title}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Vencimento</Text>
							<Text style={styles.value}>{param.duedate}</Text>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Valor</Text>
							<Text style={[styles.value, {color: param.status !== 'pago' ? Colors.text : Colors.success}]}>
								{param.value}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.cardFooter}>
					{param.status !== 'pago' && (
						<Button
							label="PAGAR"
							size="medium"
							onPress={() =>
								router.push({
									pathname: `payments/${param.long_id}`,
									params: {
										id: param.long_id,
										title: 'Descrição',
										subtitle: param.title,
										value: param.value,
										duedate: param.duedate,
										status: param.status,
									}
								})
							}
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1f1f1',
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
		fontSize: 20,
		lineHeight: 24
	},
	cardFooter: {
		paddingVertical: 20,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default InfractionScreen;
