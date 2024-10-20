import React from 'react';
import {View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

interface CustomModalProps {
	visible: boolean;
	onClose: () => void;
	onCloseBackdrop?: () => void;
	content: React.ReactNode;
	fullScreen?: boolean;
	showCloseButton?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
	visible,
	onClose,
	onCloseBackdrop,
	content,
	fullScreen = false,
	showCloseButton = false
}) => {
	return (
		<>
			<Modal visible={visible} animationType="slide" presentationStyle={fullScreen ? 'fullScreen' : 'formSheet'}>
				<View style={styles.backdrop} onTouchEnd={onCloseBackdrop}>
					<View style={[styles.modalContent]}>
						{showCloseButton && (
							<TouchableOpacity style={styles.closeButton} onPress={onClose}>
								<MaterialIcons name="close" size={24} color="black" />
							</TouchableOpacity>
						)}
						{content}
					</View>
				</View>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalContent: {
		flex: 1,
		padding: 20,
		width: '100%'
	},
	fullScreenModal: {
		width: '100%',
		height: '100%',
		borderRadius: 0,
		justifyContent: 'center',
		padding: 10
	},
	defaultModal: {
		padding: 20
	},
	contentContainer: {
		width: '100%',
		alignItems: 'center'
	},
	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
		zIndex: 1
	},
	buttonContainer: {
		marginTop: 15
	}
});

export default CustomModal;
