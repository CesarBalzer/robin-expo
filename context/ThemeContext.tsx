import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para salvar o tema preferido do usuário
import darkTheme from '@app/app/themes/darkTheme';
import lightTheme from '@app/app/themes/lightTheme';

interface ThemeContextProps {
	theme: typeof lightTheme;
	toggleTheme: () => void;
	isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
	const [theme, setTheme] = useState(lightTheme); // Define o tema claro como padrão
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Carregar tema salvo (se houver) do AsyncStorage
	useEffect(() => {
		const loadTheme = async () => {
			const savedTheme = await AsyncStorage.getItem('theme');
			if (savedTheme) {
				const isDark = savedTheme === 'dark';
				setTheme(isDark ? darkTheme : lightTheme);
				setIsDarkMode(isDark);
			}
		};
		loadTheme();
	}, []);

	const toggleTheme = async () => {
		const newTheme = isDarkMode ? lightTheme : darkTheme;
		setTheme(newTheme);
		setIsDarkMode(!isDarkMode);
		await AsyncStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
	};

	return <ThemeContext.Provider value={{theme, toggleTheme, isDarkMode}}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
