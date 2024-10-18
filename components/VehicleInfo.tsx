import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {Colors} from '@app/constants';
import TitleHeader from './TitleHeader';
import {ButtonCustom} from './ButtonCustom';
import {useModal} from '@app/context/modalcontext';
import VehiclePlate from './VehiclePlate';
import {IVehiclesProps} from '@app/types/IVehicle';

interface VehiclesProps {
	loading?: boolean;
	vehicles?: [];
}

const VehicleInfo: React.FC<VehiclesProps> = ({vehicles, loading}) => {
	console.log('VEHICLES => ', vehicles);
	const {showModal} = useModal();

	const StatusBadge = () => (
		<View style={styles.badge}>
			<Icon name="check-circle-outline" size={20} color={Colors.surface} />
			<Text style={styles.badgeText}>Licenciamento em dia</Text>
		</View>
	);

	return (
		<View style={styles.vehicleInfoContainer}>
			<View style={styles.plateContainer}>
				<VehiclePlate plateNumber="AIN0482" />
			</View>
			<TitleHeader title="Chevrolet Impala" align={'center'} />
			<StatusBadge />
			<Text style={styles.helper}>Atualizado em: 14/10/2024 - 13:00</Text>
			<View style={styles.containerButton}>
				<ButtonCustom
					label="Trocar de veículo"
					outline
					rounded
					loading={loading}
					size="small"
					onPress={() =>
						showModal(
							<View>
								<Text>This is dynamic modal content!</Text>
							</View>
						)
					}
					style={styles.button}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	vehicleInfoContainer: {
		backgroundColor: Colors.surface,
		borderRadius: 15,
		padding: 10,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	vehicleName: {
		color: Colors.text,
		fontSize: 28,
		fontWeight: '700',
		lineHeight: 28,
		paddingVertical: 5
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 15,
		padding: 10,
		marginBottom: 20,
		borderColor: Colors.textSecondary,
		borderWidth: 1
	},
	iconContainer: {
		padding: 10
	},
	infoContainer: {
		flexGrow: 1,
		flexShrink: 1,
		padding: 10,
		flexDirection: 'column'
	},
	title: {
		color: Colors.textSecondary,
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 16
	},
	subtitle: {
		color: Colors.textSecondary,
		fontSize: 12,
		fontWeight: '500',
		lineHeight: 18
	},
	helper: {
		color: Colors.textSecondary,
		fontSize: 12,
		fontWeight: '500',
		paddingVertical: 10
	},
	plateContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	plateBackground: {
		width: 250,
		height: 120,
		justifyContent: 'center',
		alignItems: 'center'
	},
	plateNumber: {
		fontSize: 28,
		fontWeight: 'bold',
		color: Colors.text,
		marginTop: 16
	},
	button: {
		fontSize: 12,
		paddingHorizontal: 20
	},
	badge: {
		backgroundColor: Colors.success,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: 10,
		alignItems: 'center',
		height: 50,
		width: 300,
		marginVertical: 10
	},
	badgeText: {
		fontSize: 12,
		fontWeight: '600',
		paddingHorizontal: 10,
		color: Colors.surface
	},
	containerButton: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10
	}
});

export default VehicleInfo;
