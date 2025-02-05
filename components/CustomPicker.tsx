import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@app/constants';

type CustomPickerProps = {
	label: string;
	title?: string;
	selectedValue: string;
	onValueChange: (value: any) => void;
	options: any[];
	disabled?: boolean;
	showCloseButton?: boolean;
};

const CustomPicker: React.FC<CustomPickerProps> = ({
	label,
	title = '',
	selectedValue,
	onValueChange,
	options,
	disabled = false,
	showCloseButton = true
}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const searchInputRef = useRef<TextInput>(null);

	useEffect(() => {
		if (modalVisible) {
			setTimeout(() => {
				searchInputRef.current?.focus();
			}, 100);
		}
	}, [modalVisible]);

	const filteredOptions = options.filter((item) =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

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
						{showCloseButton && (
							<TouchableOpacity style={styles.modalCloseIcon} onPress={() => setModalVisible(false)}>
								<FontAwesome name="times" size={22} color={Colors.text} />
							</TouchableOpacity>
						)}

						<Text style={styles.modalTitle}>{title}</Text>

						<View style={styles.searchContainer}>
							<TextInput
								ref={searchInputRef}
								style={styles.searchInput}
								placeholder="Digite algo para pesquisar..."
								value={searchQuery}
								onChangeText={setSearchQuery}
							/>
							{searchQuery.length > 0 && (
								<TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
									<FontAwesome name="times" size={16} color="#999" />
								</TouchableOpacity>
							)}
						</View>

						<FlatList
							data={filteredOptions}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={styles.option}
									onPress={() => {
										onValueChange(item);
										setModalVisible(false);
										setSearchQuery('');
									}}
								>
									<Text style={styles.optionText}>{item.name}</Text>
								</TouchableOpacity>
							)}
						/>

						<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
							<FontAwesome name="times" size={20} color="#fff" />
							<Text style={styles.closeButtonText}>Fechar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	pickerContainer: { marginBottom: 15 },
	label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
	modalTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
		padding: 10,
		textAlign: 'center'
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		marginBottom: 10,
		paddingHorizontal: 10
	},
	searchInput: {
		flex: 1,
		height: 40,
		fontSize: 16
	},
	clearButton: {
		padding: 5
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
	pickerText: { fontSize: 16 },
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
		height: '85%',
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 20,
		position: 'relative'
	},
	modalCloseIcon: {
		// backgroundColor:'gray',
		position: 'absolute',
		top: 15,
		right: 15,
		padding: 10
	},
	option: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	},
	optionText: { fontSize: 16 },
	closeButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		alignItems: 'center',
		padding: 10,
		backgroundColor: Colors.primary,
		borderRadius: 8
	},
	closeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginHorizontal: 10 }
});

export default CustomPicker;
