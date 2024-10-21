import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';

interface ButtonProps extends TouchableOpacityProps {
	label?: string;
	outline?: boolean;
	loading?: boolean;
	rounded?: boolean;
	size?: 'small' | 'medium' | 'large';
	icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	label,
	outline,
	loading,
	rounded,
	size = 'medium',
	icon,
	...props
}) => {
	const textSize = getTextSize(size);
	const buttonSize = getButtonSize(size);

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			{...props}
			style={[
				styles.button,
				outline && styles.outline,
				rounded && styles.rounded,
				{height: buttonSize.height, width: buttonSize.width},
				props.style
			]}
		>
			{loading ? (
				<ActivityIndicator color={Colors.primarySurface} />
			) : (
				<View style={styles.content}>
					{/* {icon && <View style={styles.icon}>{icon}</View>} */}
					<Text
						style={[
							styles.text,
							{fontSize: textSize},
							outline && styles.outlineText,
							icon ? styles.textWithIcon : styles.textWithoutIcon
						]}
					>
						{label}
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};
// Função para determinar o tamanho do texto
const getTextSize = (size: 'small' | 'medium' | 'large'): number => {
	switch (size) {
		case 'small':
			return 12;
		case 'medium':
			return 14;
		case 'large':
			return 18;
		default:
			return 16;
	}
};
// Função para determinar o tamanho do botão
const getButtonSize = (size: 'small' | 'medium' | 'large') => {
	switch (size) {
		case 'small':
			return {height: 36, width: 100};
		case 'medium':
			return {height: 48, width: 150};
		case 'large':
			return {height: 56, width: 200};
		default:
			return {height: 48, width: 150};
	}
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
		borderWidth: 1,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
		shadowColor: Colors.primary,
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.3,
		shadowRadius: 4
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	text: {
		color: Colors.primarySurface,
		fontWeight: '500'
	},
	outline: {
		backgroundColor: 'transparent'
	},
	rounded: {
		borderRadius: 50
	},
	outlineText: {
		color: Colors.primary
	},
	icon: {
		marginRight: 8
	},
	textWithIcon: {
		marginLeft: 8
	},
	textWithoutIcon: {
		marginLeft: 0
	}
});
