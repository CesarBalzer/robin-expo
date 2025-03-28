import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from 'expo-router';
import {MaterialIcons} from '@expo/vector-icons';
import api from '@app/api';
import {getErrorMessage} from '@app/utils/text';
import {ButtonCustom} from '@app/components/ButtonCustom';
import {Input} from '@app/components';
import {PlateOtp} from '../PlateOtp';
import {Colors} from '@app/constants';
import {logo_icon} from '@app/assets';
import {useVehicle} from '@app/hooks/useVehicle';

type FormKey = 'placa' | 'renavam';

interface FormVehicleProps {
	onClose?: () => void;
}

export default function VehicleForm({onClose}: FormVehicleProps) {
	const navigation: any = useNavigation();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<Record<FormKey, string>>({placa: '', renavam: ''});
	const isFormValid = useMemo(validateFormData, [formData]);
	const {vehicles, vehicle, setVehicle, loadVehicles} = useVehicle();

	useEffect(() => {
		if (vehicle) {
			setFormData({renavam: vehicle.renavam, placa: vehicle.plate});
		}
	}, []);

	function handleForm(key: FormKey, value: string) {
		setFormData((prev) => ({
			...prev,
			[key]: value
		}));
	}

	function handlePlateChange(value: string) {
		handleForm('placa', value);
	}

	function validateFormData(): boolean {
		return formData?.placa?.length === 7 && formData?.renavam?.length > 5;
	}

	async function handleSubmit() {
		setLoading(true);
		try {
			const response = await api.vehicle.fetchOrInsert(formData);
			setVehicle(response.vehicle);
			handleFetchVehicle(response);
		} catch (error: any) {
			Alert.alert('Erro', getErrorMessage(error));
			setLoading(false);
		} finally {
		}
	}
	const handleFetchVehicle = async (response: any) => {
		console.log('HANDLE FETCH VEHICLE => ', response);
		if (response) {
			setTimeout(async () => {
				await handleConsult(response);
			}, 8000);
		}
		if (!response) {
			setLoading(false);
		}
	};

	const handleConsult = async (response: any) => {
		console.log('HANDLE FETCH VEHICLE => ', response);
		setLoading(true);
		try {
			const updatedVehicle = await api.vehicle.fetch(response.long_id);
			setVehicle(updatedVehicle);
		} catch (error: any) {
			console.log('ERROR => ', error);
			Alert.alert('Erro', "A comunicação com a API falhou!");
		} finally {
			setLoading(false);
			handleClose();
		}
	};

	function handleClose() {
		if (onClose) {
			onClose();
		} else {
			navigation.goBack();
		}
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding" enabled={Platform.OS === 'ios'}>
			<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
				<MaterialIcons name="close" size={32} color={Colors.primary} />
			</TouchableOpacity>

			<View style={{paddingVertical: 20}}>
				<Image source={logo_icon} style={{alignSelf: 'center', paddingHorizontal: 20, width: 100, height: 100}} />
			</View>
			<View style={styles.innerContainer}>
				<Text style={[styles.instructionText, {fontSize: 24}]}>Adicionar veículo</Text>

				<Text style={styles.instructionText}>Informe a PLACA e o número do RENAVAM.</Text>

				<View style={styles.plateContainer}>
					<PlateOtp onChange={handlePlateChange} autoFocus={true} value={formData.placa} />
				</View>

				<Input
					autoCapitalize="words"
					label="Renavam"
					placeholder="Informe o renavam do veículo"
					onChangeText={(value: string) => handleForm('renavam', value)}
					value={formData.renavam}
					mask={true}
					maskType="renavam"
					disabled={formData?.placa?.length !== 7}
				/>
				<ButtonCustom
					style={{marginTop: 20}}
					fullWidth
					label="Continuar"
					outline={!isFormValid}
					loading={loading}
					onPress={handleSubmit}
					disabled={!isFormValid}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		padding: 10,
		gap: 20
	},
	instructionText: {
		fontSize: 16,
		fontWeight: '700',
		textAlign: 'center',
		fontFamily: 'WorkSans',
		paddingHorizontal: 30
	},
	plateContainer: {
		width: '75%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	closeButton: {
		position: 'absolute',
		top: 0,
		right: 20,
		zIndex: 1
	}
});
