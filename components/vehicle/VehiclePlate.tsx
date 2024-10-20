import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {plate} from '@app/assets';

interface VehiclePlateProps {
	plateNumber: string;
}

const VehiclePlate: React.FC<VehiclePlateProps> = ({plateNumber}) => {
	const formatPlateNumber = (plate: string) => {
		if (plate.length >= 3) {
			return `${plate.slice(0, 3)} ${plate.slice(3)}`;
		}
		return plate;
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={plate} style={styles.plateBackground} resizeMode="contain">
				{plateNumber ? (
					<Text style={styles.plateNumber}>{formatPlateNumber(plateNumber)}</Text>
				) : (
					<Text style={styles.plateNumberDisabled}>ABC 1D34</Text>
				)}
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
		justifyContent: 'center',
		alignItems: 'center'
	},
	plateNumber: {
		fontFamily: 'FEEngschrift',
		fontSize: 42,
		fontWeight: 'bold',
		color: '#000000',
		marginTop: 16
	},
	plateNumberDisabled: {
		fontFamily: 'FEEngschrift',
		fontSize: 42,
		fontWeight: 'bold',
		color: '#cdcdcd',
		marginTop: 16
	}
});

export default VehiclePlate;
