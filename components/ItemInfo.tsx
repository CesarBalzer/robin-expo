import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Colors} from '@app/constants';

interface ItemInfoProps {
	title: string | number;
	subtitle: string;
	helper: string;
	helperPrefix?: string;
	isPaid?: boolean;
	isOverdue?: boolean;
	onPress: () => void;
}

const ItemInfo: React.FC<ItemInfoProps> = ({title, subtitle, helper, helperPrefix = '', isPaid, isOverdue, onPress}) => {
	const getHelperTextColor = () => {
		if (isPaid) {
			return Colors.success;
		} else if (isOverdue) {
			return Colors.danger;
		} else {
			return Colors.textSecondary;
		}
	};

	return (
		<View style={styles.itemContainer}>
			<View style={styles.itemInfo}>
				<Text style={styles.itemTitle}>{title}</Text>
				<Text style={styles.itemSubtitle}>{subtitle}</Text>
				<Text style={[styles.itemHelper, {color: getHelperTextColor()}]}>
					{helperPrefix}
					{''}
					{helper}
				</Text>
			</View>
			<View style={styles.itemIcon}>
				<TouchableOpacity style={styles.button} onPress={onPress}>
					<MaterialIcons name="chevron-right" size={24} color="#fff" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 15,
		padding: 10,
		marginBottom: 15,

		shadowColor: '#000',
		shadowOffset: {width: 0, height: 5},
		shadowOpacity: 0.05,
		shadowRadius: 25,
		elevation: 5
	},
	itemInfo: {
		flexGrow: 1,
		flexShrink: 1,
		padding: 10,
		flexDirection: 'column'
	},
	itemTitle: {
		color: '#1f1f1f',
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 16
	},
	itemSubtitle: {
		color: '#1f1f1f',
		fontSize: 20,
		fontWeight: '500',
		lineHeight: 24,
		paddingVertical: 10
	},
	itemHelper: {
		fontSize: 12,
		fontWeight: '500',
		lineHeight: 16
	},
	itemIcon: {
		padding: 10
	},
	button: {
		backgroundColor: Colors.primary,
		borderRadius: 50,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default ItemInfo;
