import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Colors} from '@app/constants';
import {formatDate} from 'date-fns';

interface VehicleListItemProps {
	plate?: string;
	renavam?: string;
	createdAt?: string;
	updatedAt?: string;
	onSelect?: () => void;
}

const VehicleListItem: React.FC<VehicleListItemProps> = ({plate, renavam, createdAt, updatedAt, onSelect}) => {
	const icons: Array<'car' | 'car-outline' | 'car-side'> = ['car', 'car-outline', 'car-side'];

	const getRandomIcon = (): 'car' | 'car-outline' | 'car-side' => {
		const randomIndex = Math.floor(Math.random() * icons.length);
		return icons[randomIndex];
	};

	return (
		<TouchableOpacity style={styles.itemContainer} onPress={onSelect}>
			<MaterialCommunityIcons name={getRandomIcon()} size={48} color={Colors.primary} style={styles.icon} />
			<View style={styles.textContainer}>
				<Text style={styles.plateText}>{plate}</Text>
				<Text style={styles.renavamText}>Renavam: {renavam}</Text>
				<View style={styles.footerContainer}>
					<Text style={styles.dateText}>Criado: {createdAt && formatDate(new Date(createdAt), 'dd/MM/yyyy')}</Text>
					<Text style={styles.dateText}>Atualizado: {updatedAt && formatDate(new Date(updatedAt), 'dd/MM/yyyy')}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: Colors.background,
		borderRadius: 10,
		marginVertical: 5
	},
	icon: {
		marginRight: 15
	},
	textContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	plateText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.text
	},
	renavamText: {
		fontSize: 14,
		color: Colors.text
	},
	footerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 5
	},
	dateText: {
		fontSize: 10,
		fontStyle: 'italic',
		color: Colors.secondary
	}
});

export default VehicleListItem;
