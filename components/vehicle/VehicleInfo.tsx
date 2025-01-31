import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {Colors} from '@app/constants';
import {useVehicle} from '@app/hooks/useVehicle';
import {formatDate} from 'date-fns';

const VehicleInfo: React.FC = () => {
	const {vehicle} = useVehicle();
	const {name, plate, renavam, updated_at} = vehicle || {};

	return (
		<View style={styles.container}>
			<Icon name="car-hatchback" size={24} color={Colors.primary} style={styles.icon} />
			<View style={styles.infoContainer}>
				<Text style={styles.title}>{name ? `${name} - ${plate}` : plate}</Text>
				<Text style={styles.subtitle}>{`Renavam: ${renavam || 'N/A'}`}</Text>
				<Text style={styles.helper}>{`Atualizado em: ${updated_at ? formatDate(updated_at, 'dd/MM/yyyy HH:mm') : 'N/A'}`}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 15,
		padding: 10,
		marginBottom: 20,
		borderColor: Colors.textSecondary,
		borderWidth: 1
	},
	icon: {
		padding: 10
	},
	infoContainer: {
		flex: 1,
		padding: 10
	},
	title: {
		color: '#9B9B9B',
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 16
	},
	subtitle: {
		color: '#9B9B9B',
		fontSize: 12,
		fontWeight: '500',
		lineHeight: 18
	},
	helper: {
		color: '#9B9B9B',
		fontSize: 12,
		fontWeight: '500'
	}
});

export default VehicleInfo;
