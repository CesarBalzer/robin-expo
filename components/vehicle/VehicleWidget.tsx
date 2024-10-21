import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {Colors} from '@app/constants';
import TitleHeader from '../TitleHeader';
import {ButtonCustom} from '../ButtonCustom';
import {useModal} from '@app/context/modalcontext';
import VehiclePlate from './VehiclePlate';
import {useVehicle} from '@app/hooks/useVehicle';
import {formatDate} from 'date-fns';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import VehicleList from './VehicleList';
import api from '@app/api';
import SkeletonLoader from '../SkeletonLoader';

interface VehiclesProps {
	loading?: boolean;
	vehicles?: [];
	handleShowModal: () => void;
}

const VehicleWidget: React.FC<VehiclesProps> = ({handleShowModal}) => {
	const {showModal} = useModal();
	const [loading, setLoading] = useState(false);
	const {vehicles, vehicle, setVehicle, loadVehicles} = useVehicle();

	useEffect(() => {
		(async () => {})();
	}, []);

	const statusConfig: Record<string, {color: string; text: string}> = {
		processed: {color: Colors.success, text: 'Licenciamento em dia'},
		canceled: {color: Colors.danger, text: 'Licenciamento cancelado'},
		waiting: {color: Colors.warning, text: 'Licenciamento pendente'},
		recused: {color: Colors.info, text: 'Licenciamento recusado'},
		blocked: {color: Colors.primary, text: 'Licenciamento bloqueado'},
		killed: {color: Colors.danger, text: 'Licenciamento extinto'}
	};

	const getStatusBadge = (status: keyof typeof statusConfig) => {
		const statusDetails = statusConfig[status];
		if (!statusDetails) return null;
		return <StatusBadge color={statusDetails.color} text={statusDetails.text} />;
	};

	const StatusBadge = ({color, text}: {color: string; text: string}) => (
		<View style={[styles.badge, {backgroundColor: color}]}>
			<Icon name="check-circle-outline" size={20} color={Colors.surface} />
			<Text style={styles.badgeText}>{text}</Text>
		</View>
	);

	const handleModal = () => {
		showModal(<VehicleList vehicles={vehicles} setVehicle={setNewVehicle} />);
	};

	const setNewVehicle = async (vehicle:any) => {
		console.log('ID => ', vehicle);
		setLoading(true);
		try {
			const response = await api.vehicle.fetch(vehicle.long_id);
			if (response && response.vehicle) {
				setVehicle(response.vehicle);
			}
		} catch (error) {
			console.log('ERROR => ', error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	};

	const updatedVehicleInfo = async (id: string) => {
		setLoading(true);
		try {
			const response = await api.vehicle.fetch(id);
			if (response && response.vehicle) {
				setVehicle(response.vehicle);
			}
		} catch (error) {
			console.log('ERROR => ', error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 5000);
		}
	};

	return (
		<View style={styles.vehicleInfoContainer}>
			{loading && <SkeletonLoader type="vehicle" />}
			{!loading && (
				<>
					<View style={styles.plateContainer}>
						<VehiclePlate plateNumber={vehicle?.plate || ''} />
					</View>

					{vehicle?.name && <TitleHeader title={vehicle?.name || ''} align="center" />}

					{vehicle && getStatusBadge(vehicle.last_query_status as keyof typeof statusConfig)}

					{vehicle && (
						<Text style={styles.helper}>
							Atualizado em: {vehicle.updated_at && formatDate(vehicle.updated_at, 'dd/MM/yyyy HH:mm')}
						</Text>
					)}
				</>
			)}
			<View style={styles.containerButton}>
				{vehicles && (
					<ButtonCustom
						label="Trocar veículo"
						outline
						loading={loading}
						size="small"
						onPress={handleModal}
						style={styles.button}
						icon={<MaterialCommunityIcons name="car-select" color={Colors.primary} size={18} />}
						color={Colors.primary}
						iconPosition="left"
					/>
				)}
				{vehicle ? (
					<ButtonCustom
						label="Atualizar veículo"
						outline
						loading={loading}
						size="small"
						onPress={() => updatedVehicleInfo(vehicle.long_id)}
						style={styles.button}
						icon={<MaterialCommunityIcons name="car-info" color={Colors.primary} size={18} />}
						color={Colors.primary}
						iconPosition="left"
					/>
				) : (
					<ButtonCustom
						label="Adicionar veículo"
						outline
						loading={loading}
						size="small"
						onPress={() => handleShowModal()}
						style={styles.button}
						icon={<MaterialCommunityIcons name="car-settings" color={'#810a0a'} />}
						color={Colors.primary}
						iconPosition="left"
					/>
				)}
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
		paddingVertical: 5,
		fontFamily: 'WorkSans'
	},
	container: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: 15,
		padding: 10,
		marginBottom: 20,
		borderColor: Colors.warning,
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
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		gap: 10
	},
	modalContent: {
		// width:'100%'
		flex: 1,
		// padding: 20,
		backgroundColor: Colors.success
		// borderRadius: 15,
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	modalTitle: {
		fontSize: 20
		// fontWeight: 'bold',
		// marginBottom: 15
	},
	closeButton: {
		position: 'absolute',
		top: 0,
		right: 20,
		zIndex: 1
	}
});

export default VehicleWidget;
