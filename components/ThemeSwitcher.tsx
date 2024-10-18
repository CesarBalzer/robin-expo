import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'; // Usar ícones de sol e lua
import {useTheme} from '../context/ThemeContext';

const ThemeSwitcher = () => {
	const {toggleTheme, isDarkMode, theme} = useTheme();
    // console.log('THEMESWITCHER => ', toggleTheme, isDarkMode, theme);

	return (
		<View style={styles.container}>
			<MaterialIcons name={isDarkMode ? 'nightlight-round' : 'wb-sunny'} size={24} color={theme.primary} style={styles.icon} />
			<Switch
				value={isDarkMode}
				onValueChange={toggleTheme}
				thumbColor={isDarkMode ? theme.primary : theme.secondary}
				trackColor={{false: theme.textSecondary, true: theme.primarySurface}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	icon: {
		marginRight: 10
	}
});

export default ThemeSwitcher;
