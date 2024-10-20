import React, {useState} from 'react';
import {Pressable, StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View} from 'react-native';
import {MaskedTextInput} from 'react-native-mask-text';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';

interface InputProps extends TextInputProps {
	label?: string;
	value?: string;
	error?: boolean;
	disabled?: boolean;
	helperText?: string;
	mask?: boolean;
	maskType?: 'plate' | 'phone' | 'currency' | 'creditCard' | 'renavam';
	size?: 'small' | 'medium' | 'large' | 'fullWidth';
}

export const Input: React.FC<InputProps> = ({
	label,
	value,
	error,
	disabled = false, 
	helperText,
	mask = false,
	maskType,
	size = 'medium',
	onChangeText,
	...props
}) => {
	const [secure, setSecure] = useState(props.secureTextEntry);

	const getSizeStyle = () => {
		switch (size) {
			case 'small':
				return styles.small;
			case 'medium':
				return styles.medium;
			case 'large':
				return styles.large;
			case 'fullWidth':
				return styles.fullWidth;
			default:
				return styles.medium;
		}
	};

	const inputStyles: StyleProp<TextStyle>[] = [styles.input, getSizeStyle(), props.style];
	const helperStyles: StyleProp<TextStyle>[] = [styles.helper];

	if (error) {
		inputStyles.push(styles.inputError);
		helperStyles.push(styles.helperError);
	}

	const getMask = () => {
		switch (maskType) {
			case 'plate':
				return 'AAA AAAA';
			case 'phone':
				return '(99) 99999-9999';
			case 'currency':
				return 'currency';
			case 'creditCard':
				return '9999 9999 9999 9999';
			case 'renavam':
				return '99999999999';
			default:
				return '';
		}
	};

	const handleMaskedTextChange = (masked: string, unmasked: string) => {
		if (onChangeText) {
			onChangeText(unmasked);
		}
	};

	return (
		<View style={styles.container}>
			{Boolean(label) && <Text style={styles.label}>{label}</Text>}

			<View style={inputStyles}>
				{mask ? (
					<MaskedTextInput
						mask={maskType === 'currency' ? undefined : getMask()}
						type={maskType === 'currency' ? 'currency' : undefined}
						options={
							maskType === 'currency'
								? {
										prefix: '$',
										decimalSeparator: '.',
										groupSeparator: ',',
										precision: 2
								  }
								: undefined
						}
						onChangeText={handleMaskedTextChange}
						value={value}
						editable={!disabled} 
						style={[styles.textInput, disabled && styles.textInputDisabled]} 
						keyboardType={maskType === 'currency' || maskType === 'renavam' ? 'numeric' : 'default'}
						{...props}
					/>
				) : (
					<TextInput
						{...props}
						value={value}
						editable={!disabled} 
						onChangeText={onChangeText}
						secureTextEntry={secure}
						style={[styles.textInput, disabled && styles.textInputDisabled]} 
					/>
				)}

				{props.secureTextEntry && (
					<Pressable onPress={() => setSecure(!secure)} style={styles.iconRight}>
						<Icon color={Colors.textSecondary} name={secure ? 'eye' : 'eye-off'} size={20} />
					</Pressable>
				)}
			</View>

			{helperText && <Text style={helperStyles}>{helperText}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 4,
		
	},
	label: {
		color: Colors.text,
		fontSize: 14,
		marginLeft: 4,
		
	},
	input: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: Colors.primary,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: Colors.background,
		
	},
	textInput: {
		flex: 1,
		paddingHorizontal: 12,
		height: '100%'
	},
	textInputDisabled: {
		
		backgroundColor: Colors.disabled, 
		borderRadius:10
		// opacity: 0.5 
	},
	inputError: {
		borderColor: Colors.danger
	},
	helper: {
		color: Colors.textSecondary,
		fontSize: 12,
		marginLeft: 8
	},
	helperError: {
		color: Colors.danger
	},
	small: {
		height: 40,
		width: '50%'
	},
	medium: {
		height: 48,
		width: '75%'
	},
	large: {
		height: 56,
		width: '100%'
	},
	fullWidth: {
		height: 48,
		width: '100%'
	},
	iconRight:{
		paddingHorizontal:5
	}
});
