import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Colors from '../constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
	label?: string;
	outline?: boolean;
	loading?: boolean;
	rounded?: boolean;
	size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
	label,
	outline,
	loading,
	rounded,
	size = 'medium', 
	...props
}) => {
	const textSize = getTextSize(size); 

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			{...props}
			style={[styles.button, outline && styles.outline, rounded && styles.rounded, props.style]}
		>
			{loading ? (
				<ActivityIndicator color={Colors.primarySurface} />
			) : (
				<Text style={[styles.text, {fontSize: textSize}, outline && styles.outlineText]}>{label}</Text>
			)}
		</TouchableOpacity>
	);
};


const getTextSize = (size: 'small' | 'medium' | 'large'): number => {
	switch (size) {
		case 'small':
			return 12;
		case 'medium':
			return 16;
		case 'large':
			return 22;
		default:
			return 16; 
	}
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
		borderWidth: 1,
		borderRadius: 8,
		height: 48,
		alignItems: 'center',
		justifyContent: 'center'
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
	}
});
