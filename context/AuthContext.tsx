import React, {createContext, useState, useEffect} from 'react';
import StorageService from '@app/services/StorageService';
import api from '@app/api';

type User = {
	name: string;
	email: string;
	user_type_id: number;
};

export type AuthContextType = {
	userToken: string | null;
	user: User | null;
	isAuthenticated: boolean;
	login: (token: string, userData: User) => void;
	logout: (rememberMe: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
	const [userToken, setUserToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUserData = async () => {
			const token = await StorageService.getData('access_token');
			const userData = await StorageService.getJson('user');
			if (token) {
				setUserToken(token);
				setUser(userData);
			}
			setLoading(false);
		};

		loadUserData();
	}, []);

	const login = async (token: string, userData: User) => {
		setUserToken(token);
		setUser(userData);
		await StorageService.storeData('access_token', token);
		await StorageService.storeJson('user', userData);
	};

	const logout = async (rememberMe: boolean) => {
		try {
			// await api.auth.logoff(); // Supondo que você tenha um endpoint de logoff
		} catch (error) {
			console.error('Erro ao fazer logoff:', error);
		}
		setUserToken(null);
		setUser(null);

		if (!rememberMe) {
			await StorageService.remove('access_token');
			await StorageService.remove('user');
		}
	};
	

	if (loading) {
		return null; 
	}

	return (
		<AuthContext.Provider
			value={{
				userToken,
				user,
				isAuthenticated: !!userToken,
				login,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
