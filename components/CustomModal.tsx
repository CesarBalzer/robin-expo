import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Modal} from 'react-native';

interface CustomModalProps {
	visible: boolean;
	onClose: () => void;
	content: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({visible, onClose, content}) => {
	return (
		<Modal visible={visible} transparent animationType="slide">
			<View style={styles.backdrop} onTouchEnd={onClose}>
				<View style={styles.modalContent}>
					{content}
					<View style={styles.buttonContainer}>
						<Button title="Fechar" onPress={onClose} />
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(225, 225, 225, 0.85)'
	},
	modalContent: {
		width: '80%',
		maxHeight: '60%',
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	buttonContainer: {
		marginTop: 15
	}
});

export default CustomModal;
