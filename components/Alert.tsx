import {MaterialIcons} from '@expo/vector-icons';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type AlertColors = 'orange' | 'red' | 'yellow' | 'green' | 'blue' | 'gray' | 'gray-light' | 'disabled';

type AlertProps = {
	message: string;
	color?: AlertColors;
	iconPosition?: 'left' | 'right';
	closable?: boolean;
	autoclose?: boolean;
	autocloseTime?: number;
	onClose?: () => void;
};

const Alert: React.FC<AlertProps> = ({
	message,
	color = 'green',
	iconPosition = 'left',
	closable = true,
	autoclose = false,
	autocloseTime = 2000,
	onClose
}) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (autoclose) {
			const timer = setTimeout(() => {
				setVisible(false);
				onClose?.();
			}, autocloseTime);

			return () => clearTimeout(timer);
		}
	}, [autoclose, autocloseTime, onClose]);

	if (!visible) return null;

	const handleClose = () => {
		setVisible(false);
		onClose?.();
	};

	const getColorStyles = (color: AlertColors) => {
		const colorMap = {
			orange: '#FFA500',
			red: '#FF5252',
			yellow: '#FFEB3B',
			green: '#4CAF50',
			blue: '#2196F3',
			gray: '#9E9E9E',
			'gray-light': '#F5F5F5',
			disabled: '#BDBDBD'
		};

		const borderColorMap = {
			orange: '#FF8C00',
			red: '#E53935',
			yellow: '#FDD835',
			green: '#388E3C',
			blue: '#1976D2',
			gray: '#757575',
			'gray-light': '#E0E0E0',
			disabled: '#9E9E9E'
		};

		return {
			backgroundColor: colorMap[color],
			borderColor: borderColorMap[color]
		};
	};

	return (
		<View style={[styles.alertContainer, getColorStyles(color)]}>
			{iconPosition === 'left' && <MaterialIcons name="check-circle" size={24} color="#fff" style={styles.icon} />}
			<Text style={styles.alertText}>{message}</Text>
			{iconPosition === 'right' && <MaterialIcons name="check-circle" size={24} color="#fff" style={styles.icon} />}
			{closable && (
				<TouchableOpacity onPress={handleClose} style={styles.closeButton}>
					<MaterialIcons name="close" size={24} color="#fff" />
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	alertContainer: {
		padding: 10,
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 10,
		borderWidth: 1
	},
	alertText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '500',
		flex: 1
	},
	icon: {
		marginHorizontal: 10
	},
	closeButton: {
		paddingHorizontal: 5
	}
});

export default Alert;
