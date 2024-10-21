import React, {useEffect} from 'react';
import {Stack, useRouter} from 'expo-router';
import { useAuth } from '@app/hooks/useAuth';

interface AuthenticatedStackProps {
	router: ReturnType<typeof useRouter>;
}

// Componente que verifica o estado de autenticação e redireciona
const AuthenticatedStack: React.FC<AuthenticatedStackProps> = ({router}) => {
	const {userToken, isAuthenticated} = useAuth();

	useEffect(() => {
		// Redireciona baseado no estado de autenticação
		if (!userToken) {
			router.replace('/auth/login'); // Redireciona para a página de login
		} else {
			router.replace('/home'); // Redireciona para a home se autenticado
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
