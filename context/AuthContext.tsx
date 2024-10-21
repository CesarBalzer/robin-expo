import React, {createContext, useState, useEffect, useCallback} from 'react';
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
	onUnauthenticated: (callback: () => void) => void;
	onAuthenticated: (callback: (token: string) => void) => void;
	setUserToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
	const [userToken, setUserTokenState] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [onUnauthenticatedCallback, setOnUnauthenticatedCallback] = useState<() => void>(() => {});
	const [onAuthenticatedCallback, setOnAuthenticatedCallback] = useState<(token: string) => void>(() => {});

	useEffect(() => {
		const loadUserData = async () => {
			const token = await StorageService.getData('access_token');
			const userData = await StorageService.getJson('user');
			if (token) {
				setUserTokenState(token);
				setUser(userData);
			}
			setLoading(false);
		};

		loadUserData();
	}, []);

	const fireCallback = useCallback((callback: (...params: any[]) => void, ...params: any[]) => {
		if (callback) {
			setTimeout(() => callback(...params), 0);
		}
	}, []);

	const login = async (token: string, userData: User) => {
		setUserTokenState(token);
		setUser(userData);
		await StorageService.storeData('access_token', token);
		await StorageService.storeJson('user', userData);
		fireCallback(onAuthenticatedCallback, token);
	};

	const logout = async (rememberMe: boolean) => {
		try {
			await api.auth.logout();
		} catch (error) {
			console.error('LOGOUT ERROR', error);
		}
		setUserTokenState(null);
		setUser(null);

		if (!rememberMe) {
			await StorageService.remove('access_token');
			await StorageService.remove('user');
		}
	};

	const onUnauthenticated = (callback: () => void) => {
		setOnUnauthenticatedCallback(() => callback);
	};

	const onAuthenticated = (callback: (token: string) => void) => {
		setOnAuthenticatedCallback(() => callback);
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
				logout,
				onUnauthenticated,
				onAuthenticated,
				setUserToken: setUserTokenState
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
