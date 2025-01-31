import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, FlatList} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {Colors} from '@app/constants';

type CustomPickerProps = {
	label: string;
	title?: string;
	selectedValue: string;
	onValueChange: (value: any) => void;
	options: any[];
	disabled?: boolean;
};

const CustomPicker: React.FC<CustomPickerProps> = ({
	label,
	title = '',
	selectedValue,
	onValueChange,
	options,
	disabled = false
}) => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View style={styles.pickerContainer}>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity
				style={[styles.picker, disabled && styles.disabledPicker]}
				onPress={() => !disabled && setModalVisible(true)}
				disabled={disabled}
			>
				<Text style={[styles.pickerText, disabled && styles.disabledText]}>{selectedValue || 'Selecione uma opção'}</Text>
				<FontAwesome name="chevron-down" size={16} color={disabled ? '#aaa' : '#000'} />
			</TouchableOpacity>

			<Modal visible={modalVisible} transparent animationType="slide">
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>{title}</Text>
						<FlatList
							data={options}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => (
								<TouchableOpacity
									style={styles.option}
									onPress={() => {
										onValueChange(item);
										setModalVisible(false);
									}}
								>
									<Text style={styles.optionText}>{item.name}</Text>
								</TouchableOpacity>
							)}
						/>
						<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
							<Text style={styles.closeButtonText}>Fechar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	pickerContainer: {marginBottom: 15},
	label: {fontSize: 16, fontWeight: 'bold', marginBottom: 5},
	modalTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
		padding: 10
	},
	picker: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderColor: Colors.primary,
		borderWidth: 1,
		padding: 12,
		borderRadius: 8
	},
	disabledPicker: {
		backgroundColor: '#f2f2f2',
		borderColor: '#ccc'
	},
	pickerText: {fontSize: 16},
	disabledText: {
		color: '#aaa'
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalContent: {
		width: '98%',
		height: '80%',
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 20
	},
	option: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	},
	optionText: {fontSize: 16},
	closeButton: {
		marginTop: 10,
		alignItems: 'center',
		padding: 10,
		backgroundColor: Colors.primary,
		borderRadius: 8
	},
	closeButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'}
});

export default CustomPicker;
