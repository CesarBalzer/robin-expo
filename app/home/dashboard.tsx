import React, {useEffect, useState} from 'react';
import {View, ScrollView, Image, BackHandler, Dimensions, StyleSheet} from 'react-native';
import {Colors} from '@app/constants';
import Menu from '@app/components/MenuCard';
import {banner_home} from '@app/assets';
import {useNavigation} from 'expo-router';
import {useAuth} from '@app/hooks/useAuth';
import {ButtonCustom} from '@app/components/ButtonCustom';
import {Ionicons} from '@expo/vector-icons';
import TitleSection from '@app/components/TitleSection';
import VehicleInfo from '@app/components/VehicleInfo';
import {useTheme} from '@app/context/ThemeContext';
import {IVehiclesProps} from '@app/types/IVehicle';

const {width} = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const {logout} = useAuth();
	const {theme} = useTheme();
	const [vehicles, setVehicles] = useState();

	const navigation: any = useNavigation();

	const menuItems = [
		{icon: 'card-account-details-outline', label: 'Minha CNH', onPress: () => navigation.navigate('cnh')},
		{icon: 'file-document-outline', label: 'DPVAT', onPress: () => navigation.navigate('dpvat')},
		{icon: 'file-alert-outline', label: 'Infrações - multas', notifications: 2, onPress: () => navigation.navigate('infraction')},
		{icon: 'calculator', label: 'IPVA', onPress: () => navigation.navigate('ipva')},
		{icon: 'car', label: 'CRLV', onPress: () => navigation.navigate('crlv')},
		{icon: 'file-check-outline', label: 'Licenciamentos', onPress: () => navigation.navigate('lincense')},
		{icon: 'lock-outline', label: 'Seguro', onPress: () => navigation.navigate('secure')},
		{icon: 'currency-usd', label: 'Financiamento', onPress: () => navigation.navigate('financing')}
	];

	useEffect(() => {
		const backAction = () => {
			return true;
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => backHandler.remove();
	}, []);

	const handleLogout = async () => {
		await logout(false);
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
			<View style={styles.infoContainer}>
				<TitleSection title="Situação do veículo" icon="car-hatchback" iconColor={theme.primary} iconSize={20} />
				<VehicleInfo vehicles={vehicles} loading={loading} />
				<TitleSection title="Outras opções" icon="cog" iconColor={theme.primary} iconSize={20} />
			</View>
			<Menu items={menuItems} />
			<View style={styles.bannerContainer}>
				<Image source={banner_home} style={styles.banner} />
			</View>
			<View style={styles.logoutContainer}>
				<ButtonCustom
					label="Sair do app"
					size="small"
					fullWidth
					loading={loading}
					onPress={handleLogout}
					icon={<Ionicons name="exit-outline" size={20} color={theme.primarySurface} />}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	infoContainer: {
		// alignItems: 'center'
	},
	bannerContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10
	},
	banner: {
		width: width * 0.9,
		height: width * 0.9 * (210 / 390),
		resizeMode: 'contain'
	},
	logoutContainer: {
		marginTop: 20,
		marginBottom: 30,
		alignItems: 'center'
	}
});

export default DashboardScreen;
