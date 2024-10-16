import {Colors} from '@app/constants';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface MenuCardProps {
	icon: string | null;
	label: string;
	notifications?: number;
	onPress: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({icon, label, notifications, onPress}) => {
	const iconColor = notifications && notifications > 0 ? Colors.danger : Colors.primary;

	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			<View style={styles.iconContainer}>
				<MaterialCommunityIcons name={icon} size={32} color={iconColor} />
			</View>
			{notifications && notifications > 0 && (
				<View style={styles.badge}>
					<Text style={styles.badgeText}>{notifications}</Text>
				</View>
			)}
			<Text style={styles.label}>{label}</Text>
		</TouchableOpacity>
	);
};

interface MenuProps {
	items: Array<{icon: string; label: string; notifications?: number; onPress: () => void}>;
}

const Menu: React.FC<MenuProps> = ({items}) => {
	return (
		<View style={styles.menuContainer}>
			{items.map((item, index) => (
				<MenuCard key={index} icon={item.icon} label={item.label} notifications={item.notifications} onPress={item.onPress} />
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	menuContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 0, // Removido para evitar margens laterais
	},
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 15,
		padding: 10,
		width: '48%', // Garante que dois cartões caibam na linha
		height: 130,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.5,
		position: 'relative',
		marginBottom: 15, // Ajuste no espaçamento vertical
	},
	iconContainer: {
		marginBottom: 5,
		alignItems: 'center',
	},
	badge: {
		position: 'absolute',
		right: 10,
		top: 10,
		backgroundColor: Colors.danger,
		borderRadius: 10,
		paddingHorizontal: 6,
		paddingVertical: 2,
	},
	badgeText: {
		color: '#FFFFFF',
		fontSize: 12,
		fontWeight: 'bold',
	},
	label: {
		fontSize: 14,
		fontWeight: '500',
		color: '#000',
		textAlign: 'center',
	},
});

export default Menu;
