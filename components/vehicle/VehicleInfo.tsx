import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {Colors} from '@app/constants';
import {useVehicle} from '@app/hooks/useVehicle';
import {formatDate} from 'date-fns';

const VehicleInfo: React.FC = () => {
	const {vehicle} = useVehicle();
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Icon name="car-hatchback" size={24} color={Colors.primary} />
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>{`${vehicle?.name || ''} ${vehicle?.plate}`}</Text>
				<Text style={styles.subtitle}>{`Renavam: ${vehicle?.renavam}`}</Text>
				<Text style={styles.helper}>{`Atualizado em: ${
					vehicle?.updated_at && formatDate(vehicle?.updated_at, 'dd/MM/yyyy HH:ii')
				}`}</Text>
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
