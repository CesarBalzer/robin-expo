import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import Colors from '../constants/Colors';
import {getButtonHeight, getContrastColor, getTextSize} from '@app/utils/helper';

interface ButtonCustomProps extends TouchableOpacityProps {
	label?: string;
	outline?: boolean;
	loading?: boolean;
	rounded?: boolean;
	size?: 'small' | 'medium' | 'large';
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right' | 'center';
	fullWidth?: boolean;
	color?: string;
}

export const ButtonCustom: React.FC<ButtonCustomProps> = ({
	label,
	outline,
	loading,
	rounded,
	size = 'medium',
	icon,
	iconPosition = 'left',
	fullWidth = false,
	color = Colors.primary,
	...props
}) => {
	const textSize = getTextSize(size);
	const buttonHeight = getButtonHeight(size);
	const buttonColor = outline ? 'transparent' : color;
	const borderColor = outline ? color : buttonColor;
	const textColor = outline ? color : getContrastColor(buttonColor);
	const iconColor = outline ? color : getContrastColor(buttonColor);

	const buttonStyle = [
		styles.button,
		{height: buttonHeight, paddingHorizontal: 12, backgroundColor: buttonColor, borderColor: borderColor},
		rounded && styles.rounded,
		fullWidth && styles.fullWidth,
		props.style
	];
	const contentStyle = loading ? styles.loadingContent : styles.content;

	return (
		<TouchableOpacity activeOpacity={0.6} {...props} style={buttonStyle}>
			{loading ? (
				<ActivityIndicator color={iconColor} />
			) : (
				<View style={contentStyle}>
					{icon && iconPosition === 'left' && (
						<View style={styles.iconContainer}>{React.cloneElement(icon as React.ReactElement, {color: iconColor})}</View>
					)}
					{label && <Text style={[styles.text, {fontSize: textSize, color: textColor}]}>{label}</Text>}
					{icon && iconPosition === 'right' && (
						<View style={styles.iconContainer}>{React.cloneElement(icon as React.ReactElement, {color: iconColor})}</View>
					)}
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
		borderWidth: 1,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		alignSelf: 'flex-start'
	},
	fullWidth: {
		width: '100%'
	},
	text: {
		fontWeight: '500'
	},
	rounded: {
		borderRadius: 50
	},
	loadingContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	iconContainer: {
		marginRight: 8,
		flexShrink: 1
	}
});
