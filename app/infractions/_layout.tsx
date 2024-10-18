import {router, Stack, useRouter} from 'expo-router';
import {useEffect} from 'react';
import {Button, Image, Platform} from 'react-native';
import {UserProvider} from '@app/context';
import * as StatusBar from 'expo-status-bar';
import {logo} from '@app/assets';
import BackButton from '@app/components/BackButton';
import {Colors} from '@app/constants';
import {ModalProvider} from '@app/context/modalcontext';

export default function Layout() {
	const router = useRouter();
	useEffect(() => {
		StatusBar.setStatusBarStyle('dark');
		if (Platform.OS === 'android') {
			StatusBar.setStatusBarBackgroundColor('transparent', false);
		}
	}, []);

	return (
		<ModalProvider>
			<UserProvider>
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor: '#ECECEC'
						},
						headerTintColor: Colors.primary,
						headerTitleStyle: {
							fontWeight: 'bold'
						},
						headerTitleAlign: 'center',
						headerShadowVisible: false,
						headerTitle: () => <Image source={logo} style={{width: 100, height: 41}} />,
						headerLeft: () => <BackButton onPress={() => router.back()} />
					}}
				></Stack>
			</UserProvider>
		</ModalProvider>
	);
}
