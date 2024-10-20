import {Colors} from '@app/constants';
import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet, ViewStyle, TextStyle, Dimensions, Text} from 'react-native';

export interface PlateInputProps {
	autoFocus?: boolean;
	onChange?: (value: string) => void;
	containerStyle?: ViewStyle;
	length?: number;
	radius?: TextStyle['borderRadius'];
	size?: TextStyle['height'];
	style?: TextStyle;
	testID?: string;
	value?: string;
}

const {height} = Dimensions.get('window');

export const PlateOtp: React.FC<PlateInputProps> = ({length = 7, testID = 'plate', containerStyle, value = '', ...props}) => {
	const [plate, setPlate] = useState<string[]>(new Array(length).fill(''));
	const inputRefs = useRef<TextInput[]>([]);

	useEffect(() => {
		if (value.length === length) {
			setPlate(value.split(''));
		}
	}, [value]);

	useEffect(() => {
		props.onChange?.(plate.join(''));
	}, [plate]);

	function handleKeyPress(key: string, index: number) {
		if (key === 'Backspace') {
			handleChange(index, '');
		} else {
			handleChange(index, key);
		}
	}

	function handleChange(index: number, value: string) {
		const newPlate = [...plate];
		newPlate[index] = value;
		setPlate(newPlate);

		if (value === '' && index > 0) {
			inputRefs.current[index - 1].focus();
		} else if (value !== '' && index < length - 1) {
			inputRefs.current[index + 1].focus();
		}

		updateKeyboardType(index, value);
	}

	function handlePaste(value: string) {
		if (value.length > 1) {
			const newPlate = value.split('');
			setPlate(newPlate);
			inputRefs.current[newPlate.length - 1].focus();
		}
	}

	function updateKeyboardType(index: number, value: string) {
		if (index < 3) {
			inputRefs.current[index].setNativeProps({keyboardType: 'default'});
		} else if (index === 3 || index === 4) {
			inputRefs.current[index].setNativeProps({keyboardType: 'numeric'});
		} else {
			inputRefs.current[index].setNativeProps({keyboardType: 'default'});
		}
	}

	return (
		<View style={[styles.plateBox]}>
			<View style={[styles.frame]}>
				<View style={styles.brazilContainer}>
					<Text style={styles.brazilText}>BRASIL</Text>
				</View>
				<View style={styles.inputContainer}>
					{Array.from({length}).map((_, i) => (
						<TextInput
							autoFocus={i === 0 && props.autoFocus}
							key={i}
							ref={(ref) => (inputRefs.current[i] = ref as TextInput)}
							style={[
								styles.input,
								props.style,
								{
									marginRight: i === length - 1 ? 0 : i === 2 ? 15 : 5
								}
							]}
							value={plate[i]}
							onChangeText={(text) => (i === 0 ? handlePaste(text) : undefined)}
							onKeyPress={({nativeEvent: {key}}) => handleKeyPress(key, i)}
							keyboardType="default"
							maxLength={1}
							testID={`${testID}.input${i > 0 ? '-' + i : ''}`}
							placeholder={i < 3 ? 'A' : '9'}
							placeholderTextColor={Colors.disabled}
						/>
					))}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	plateBox: {
		borderColor: '#000000',
		borderWidth: 1,
		borderRadius: 10,
		width: '100%',
		padding: 5
	},
	frame: {
		borderColor: '#000000',
		borderWidth: 1,
		borderRadius: 10,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 90,
		width: '100%'
	},
	brazilContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0032a0',
		borderTopLeftRadius: 9,
		borderTopRightRadius: 9,
		height: 20,
		width: '100%'
	},
	brazilText: {
		fontFamily: 'GillSansStdCondensed',
		fontSize: 12,
		color: Colors.surface
	},
	inputContainer: {
		flexDirection: 'row',
		flex: 1,
		marginVertical: 10,
		paddingHorizontal: 10
	},
	input: {
		fontFamily: 'FEEngschrift',
		borderColor: Colors.primary,
		borderRadius: 5,
		fontSize: 48,
		textAlign: 'center',
		flex: 1
	},
	placeholderColor: {
		color: '#fd6b6b'
	}
});
