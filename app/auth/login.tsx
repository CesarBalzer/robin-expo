import {Image, Switch, Text, View} from 'react-native';
import {ContainerImage, Input} from '@app/components';
import {logo} from '@app/assets';
import {useState, useEffect} from 'react';
import api from '@app/api';
import {useAuth} from '@app/hooks/useAuth';
import StorageService from '@app/services/StorageService';
import {Colors} from '@app/constants';
import {ButtonCustom} from '@app/components/ButtonCustom';

export default function LoginScreen() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const {login} = useAuth();

	useEffect(() => {
		const loadStoredData = async () => {
			const storedEmail = await StorageService.getData('email');
			const storedPassword = await StorageService.getData('password');
			if (storedEmail && storedPassword) {
				setEmail(storedEmail);
				setPassword(storedPassword);
				setRememberMe(true);
			}
		};

		loadStoredData();
	}, []);

	async function handleSubmit() {
		if (!email || !password) {
			return setError(true);
		}

		setLoading(true);

		try {
			const response = await api.auth.login(email, password);
			const {access_token, user} = response;

			await login(access_token, user);

			if (rememberMe) {
				await StorageService.storeData('email', email);
				await StorageService.storeData('password', password);
			} else {
				await StorageService.remove('email');
				await StorageService.remove('password');
			}
		} catch (error) {
			console.error(error);
			setError(true);
		} finally {
			setLoading(false);
		}
	}

	return (
		<ContainerImage background="car" scrollable contentContainerStyle={{justifyContent: 'center', gap: 20}}>
			<Image source={logo} style={{alignSelf: 'center'}} />

			<Text style={{alignSelf: 'center', fontSize: 28, fontWeight: '600'}}>Acessar minha conta</Text>

			<Input
				autoCapitalize="none"
				label="Email"
				inputMode="email"
				value={email}
				onChangeText={(text) => setEmail(text)}
				error={error && !email}
				helperText={error && !email ? 'Campo obrigatório' : undefined}
			/>

			<Input
				autoCapitalize="none"
				label="Senha"
				secureTextEntry
				value={password}
				onChangeText={(text) => setPassword(text)}
				error={error && !password}
				helperText={error && !password ? 'Campo obrigatório' : undefined}
			/>

			<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
				<Switch
					trackColor={{false: Colors.text, true: Colors.primary}}
					thumbColor={rememberMe ? Colors.warning : Colors.primarySurface}
					ios_backgroundColor={Colors.textSecondary}
					onValueChange={() => setRememberMe((prev) => !prev)}
					value={rememberMe}
				/>
				<Text style={{fontStyle: 'italic', paddingHorizontal: 10, color: Colors.text}}>Lembrar dados de acesso</Text>
			</View>

			<ButtonCustom fullWidth label="Entrar" loading={loading} onPress={handleSubmit} />
		</ContainerImage>
	);
}
