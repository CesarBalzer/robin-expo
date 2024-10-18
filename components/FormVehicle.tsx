import React, {useMemo, useState} from 'react';
import {Alert, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {logo} from '@app/assets';
import {ContainerImage, Input} from '@app/components';
import {Colors} from '@app/constants';
import {useNavigation} from 'expo-router';
import api from '@app/api';
import {getErrorMessage} from '@app/utils/text';
import {ButtonCustom} from '@app/components/ButtonCustom';

type FormKey = 'placa' | 'renavam';

export default function FormVehicle() {
	const navigation: any = useNavigation();
	const [checked, setChecked] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<Record<FormKey, string>>();
	const isFormValid = useMemo(validateFormData, [formData]);

	function handleForm(key: FormKey, value: string) {
		setFormData((prev: any) => ({
			...prev,
			[key]: value
		}));
	}

	function validateFormData(): boolean {
		if (!formData || Object.keys(formData).length < 4) {
			return false;
		}

		let isValid = true;

		for (const key in formData) {
			if (key === 'placa' && formData[key].length < 7) {
				isValid = false;
				break;
			}

			if (key === 'renavam' && !formData[key]) {
				isValid = false;
				break;
			}
		}

		return isValid;
	}

	async function handleSubmit() {
		setLoading(true);
		try {
			await api.auth.register(formData as any);
			setFormData(undefined);
			navigation.navigate('auth/login');
		} catch (error: any) {
			Alert.alert('Erro', getErrorMessage(error));
		}
		setLoading(false);
	}

	return (
		<KeyboardAvoidingView style={{}} behavior="padding" enabled={Platform.OS === 'ios'}>
			<View style={{justifyContent: 'center', gap: 20}}>
				<Text style={{fontSize: 16, fontWeight: '700', textAlign: 'center'}}>Para começarmos, precisamos que informe a placa do seu veiculo e o número do renavam</Text>

				<Input
					autoCapitalize="words"
					label="Placa do veículo"
					placeholder="AAA9A78"
					onChangeText={(value) => handleForm('placa', value)}
					value={formData?.placa}
				/>
				<Input
					autoCapitalize="words"
					label="Renavam"
					placeholder="Informe o renavam do veículo"
					onChangeText={(value) => handleForm('renavam', value)}
					value={formData?.renavam}
				/>

				<ButtonCustom
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
	terms: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10
	},
	checkbox: {
		height: 20,
		width: 20,
		borderWidth: 1,
		borderColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2
	},
	box: {
		borderColor: Colors.primary,
		borderRightWidth: 2,
		borderBottomWidth: 2,
		borderBottomRightRadius: 2,
		height: 14,
		width: 8,
		bottom: 2,
		transform: [{rotate: '40deg'}]
	}
});
