if (__DEV__) {
	require('../ReactotronConfig');
}

import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {Stack, useRouter} from 'expo-router';
import * as StatusBar from 'expo-status-bar';
import {AuthProvider} from '@app/context/AuthContext';
import {useAuth} from '@app/hooks/useAuth';

const Layout: React.FC = () => {
	return (
		<AuthProvider>
			<MainStack />
		</AuthProvider>
	);
};

const MainStack: React.FC = () => {
	const router = useRouter();
	const {userToken} = useAuth();

	useEffect(() => {
		StatusBar.setStatusBarStyle('dark');
		if (Platform.OS === 'android') {
			StatusBar.setStatusBarBackgroundColor('transparent', false);
		}

		if (userToken) {
			router.replace('/home');
		} else {
			router.replace('/');
		}
	}, [userToken, router]);

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
