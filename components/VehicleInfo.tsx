import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {Colors} from '@app/constants';

interface VehicleInfoProps {
	loading: boolean;
}

const VehicleInfo: React.FC<VehicleInfoProps> = ({loading}) => {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Icon name="car-hatchback" size={24} color={Colors.primary} />
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>Chevrolet Impala - Placa: AIN 0482</Text>
				<Text style={styles.subtitle}>Chevrolet Impala</Text>
				<Text style={styles.helper}>Atualizado em: 14/10/2024 - 13:00</Text>
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
