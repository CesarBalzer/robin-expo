import React, {useEffect} from 'react';
import {Stack, useRouter} from 'expo-router';
import {useAuth} from '@app/hooks/useAuth';

interface AuthenticatedStackProps {
	router: ReturnType<typeof useRouter>;
}

const AuthenticatedStack: React.FC<AuthenticatedStackProps> = ({router}) => {
	const {userToken, isAuthenticated} = useAuth();

	useEffect(() => {
		if (!userToken) {
			router.replace('/auth/login');
		} else {
			router.replace('/home');
		}
	}, [userToken]);

	return (
		<Stack screenOptions={{headerShown: false}}>
			{isAuthenticated ? (
				<>
					<Stack.Screen name="home" />
					<Stack.Screen name="dashboard" />
				</>
			) : (
				<>
					<Stack.Screen name="auth/login" />
					<Stack.Screen name="auth/registration/form" />
					<Stack.Screen name="auth/registration/code" />
				</>
			)}
		</Stack>
	);
};

export default AuthenticatedStack;
