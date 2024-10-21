import {Image, ImageBackground, SafeAreaView, Text, View} from 'react-native';
import {background_light, logo} from '@app/assets';
import {Button, OTPInput} from '@app/components';

export default function RegistrationCode() {
	return (
		<ImageBackground source={background_light} resizeMode="stretch" style={{flex: 1}}>
			<SafeAreaView style={{flex: 1}}>
				<View style={{flex: 1, padding: 20}}>
					<View style={{flex: 1, justifyContent: 'center', gap: 20}}>
						<Image source={logo} style={{alignSelf: 'center'}} />

						<Text style={{fontSize: 28, fontWeight: '700', textAlign: 'center'}}>
							Enviamos um código de autenticação para o seu email.
						</Text>

						<Text style={{fontSize: 16, textAlign: 'center'}}>
							Digite abaixo o código enviado para o email clienterobim@gmail.com.
						</Text>

						<OTPInput />

						<Button label="Confirmar" outline />
					</View>
				</View>
			</SafeAreaView>
		</ImageBackground>
	);
}
