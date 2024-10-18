// if (__DEV__) {
// 	require('../ReactotronConfig');
// }
// import React, {useEffect} from 'react';
// import {StatusBar, View, Image, StyleSheet} from 'react-native';
// import {UserProvider} from '@app/context';
// import {NavigationContainer} from '@react-navigation/native';
// import LoginScreen from './app/auth/login';
// import RegistrationPage from './app/auth/registration/form';
// import RegistrationCode from './app/auth/registration/code';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

// export default function App() {
// 	useEffect(() => {
// 		StatusBar.setTranslucent(true); // Permite que a StatusBar seja translúcida
// 		StatusBar.setBackgroundColor('transparent'); // Define o fundo da StatusBar como transparente
// 		StatusBar.setBarStyle('dark-content'); // Ajusta o estilo da StatusBar
// 	}, []);

// 	return (
// 		<UserProvider>
// 			<NavigationContainer>
// 				<View style={styles.container}>
// 					{' '}
// 					{/* Contêiner para cobrir a StatusBar */}
// 					<StatusBar />
// 					<Stack.Navigator
// 						screenOptions={{
// 							headerShown: false
// 						}}
// 					>
// 						<Stack.Screen name="Login" component={LoginScreen} />
// 						<Stack.Screen name="RegistrationForm" component={RegistrationPage} />
// 						<Stack.Screen name="RegistrationCode" component={RegistrationCode} />
// 					</Stack.Navigator>
// 				</View>
// 			</NavigationContainer>
// 		</UserProvider>
// 	);
// }

// // Estilos para o container
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: 'transparent' // Corrigido para 'transparent'
// 	}
// });
