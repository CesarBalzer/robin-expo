import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {plate} from '@app/assets';

interface VehiclePlateProps {
	plateNumber: string;
}

const VehiclePlate: React.FC<VehiclePlateProps> = ({plateNumber}) => {
	return (
		<View style={styles.container}>
			<ImageBackground source={plate} style={styles.plateBackground} resizeMode="contain">
				<Text style={styles.plateNumber}>{plateNumber}</Text>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	plateBackground: {
		width: 250,
		height: 120,
		justifyContent: 'center', // Centraliza verticalmente
		alignItems: 'center' // Centraliza horizontalmente
	},
	plateNumber: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#000000',
		marginTop: 16
	}
});

export default VehiclePlate;
