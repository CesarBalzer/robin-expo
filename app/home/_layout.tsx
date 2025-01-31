import {Stack} from 'expo-router';
import {useEffect} from 'react';
import {Image, Platform} from 'react-native';
import {UserProvider} from '@app/context';
import * as StatusBar from 'expo-status-bar';
import {logo} from '@app/assets';
import BackButton from '@app/components/BackButton';
import {Colors} from '@app/constants';
import {ModalProvider} from '@app/context/modalcontext';

export default function Layout() {
	useEffect(() => {
		StatusBar.setStatusBarStyle('dark');
		if (Platform.OS === 'android') {
			StatusBar.setStatusBarBackgroundColor('transparent', false);
		}
	}, []);

	const routesConfig = [
		{name: 'dashboard', backPath: '/', showBackButton: false},
		{name: 'cnh', backPath: 'home', showBackButton: true},
		{name: 'dpvat', backPath: 'home', showBackButton: true},
		{name: 'infraction', backPath: 'home', showBackButton: true},
		// {name: 'infractions', backPath: 'home', showBackButton: true},
		{name: 'ipva', backPath: 'home', showBackButton: true},
		{name: 'crlv', backPath: 'home', showBackButton: true},
		{name: 'license', backPath: 'home', showBackButton: true},
		{name: 'secure', backPath: 'home', showBackButton: true},
		{name: 'financing', backPath: 'home', showBackButton: true},
		{name: 'fipe', backPath: 'home', showBackButton: true}
	];

	return (
		<ModalProvider>
			<UserProvider>
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor: '#f3f3f3'
						},
						headerTintColor: Colors.primary,
						headerTitleStyle: {
							fontWeight: 'bold'
						},
						headerTitleAlign: 'center',
						headerShadowVisible: false,
						headerTitle: () => <Image source={logo} style={{width: 100, height: 42}} />
					}}
				>
					{routesConfig.map(({name, backPath, showBackButton}) => (
						<Stack.Screen
							key={name}
							name={name}
							options={{
								headerLeft: () => (showBackButton ? <BackButton path={backPath} /> : null),
								headerBackVisible: false
							}}
						/>
					))}
				</Stack>
			</UserProvider>
		</ModalProvider>
	);
}
