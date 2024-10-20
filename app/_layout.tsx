if (__DEV__) {
	require('../ReactotronConfig');
}
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, Platform} from 'react-native';
import {Stack, useRouter} from 'expo-router';
import * as StatusBar from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {AuthProvider} from '@app/context/AuthContext';
import {ThemeProvider} from '@app/context/ThemeContext';
import {useAuth} from '@app/hooks/useAuth';
import api from '@app/api';
import {VehicleProvider} from '@app/context/VehicleContext';
import * as Font from 'expo-font';
import {Colors} from '@app/constants';

SplashScreen.preventAutoHideAsync();

const Layout: React.FC = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		async function loadFonts() {
			await Font.loadAsync({
				FEEngschrift: require('../assets/fonts/FEEngschrift.otf'),
				GillSansStdCondensed: require('../assets/fonts/GillSansStdCondensed.otf'),
				WorkSans: require('../assets/fonts/WorkSans.ttf')
			});

			setFontsLoaded(true);
			await SplashScreen.hideAsync();
		}

		loadFonts();
	}, []);

	if (!fontsLoaded) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<ThemeProvider>
			<AuthProvider>
				<VehicleProvider>
					<MainStack />
				</VehicleProvider>
			</AuthProvider>
		</ThemeProvider>
	);
};

const MainStack: React.FC = () => {
	const router = useRouter();
	const {userToken, setUserToken} = useAuth();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setLoading(false);
	}, []);

	useEffect(() => {
		StatusBar.setStatusBarStyle('dark');
		if (Platform.OS === 'android') {
			StatusBar.setStatusBarBackgroundColor('transparent', false);
		}

		api.onUnauthenticated(() => {
			setUserToken(null);
			router.replace('/auth/login');
		});

		if (userToken) {
			router.replace('/home');
		} else {
			router.replace('/');
		}
	}, [userToken, router, setUserToken]);

	return (
		<Stack screenOptions={{headerShown: false}}>
			<Stack.Screen name="auth/login" />
			<Stack.Screen name="home" />
			<Stack.Screen name="auth/registration/form" />
			<Stack.Screen name="auth/registration/code" />
		</Stack>
	);
};

export default Layout;
