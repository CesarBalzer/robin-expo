import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Image, Dimensions, BackHandler} from 'react-native';
import VehiclePlate from '@app/components/VehiclePlate';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {Colors} from '@app/constants';
import Menu from '@app/components/MenuCard';
import {banner_home} from '@app/assets';
import {useNavigation, useRouter} from 'expo-router';
import {useModal} from '@app/context/modalcontext';
import {useAuth} from '@app/hooks/useAuth';
import {ButtonCustom} from '@app/components/ButtonCustom';
import {Ionicons} from '@expo/vector-icons';

const {width} = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const {logout} = useAuth();
	const navigation: any = useNavigation();
	const {showModal} = useModal();
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

	useLayoutEffect(() => {
		navigation.setOptions({
			gestureEnabled: false
		});
	}, [navigation]);

	const VehicleInfo: React.FC<VehicleInfoProps> = ({loading}) => (
		<View style={styles.vehicleInfoContainer}>
			<View style={styles.plateContainer}>
				<VehiclePlate plateNumber="AIN0482" />
			</View>
			<Text style={styles.vehicleName}>Chevrolet Impala</Text>
			<StatusBadge />
			<Text style={styles.updateText}>Atualizado em: 14/10/2024 - 13:00</Text>
			<ButtonCustom
				label="Trocar de veículo"
				outline
				rounded
				loading={loading}
				size="small"
				onPress={() =>
					showModal(
						<View>
							<Text>This is dynamic modal content!</Text>
						</View>
					)
				}
				style={styles.button}
			/>
		</View>
	);

	const handleLogout = async () => {
		await logout(false);
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
			<Header />
			<VehicleInfo loading={loading} />
			<MenuItems />
			<Menu items={menuItems} />
			<View style={styles.bannerContainer}>
				<Image source={banner_home} style={styles.banner} />
			</View>
			<View style={styles.logoutButtonContainer}>
				<ButtonCustom
					label="Sair do app"
					size="small"
					fullWidth
					loading={loading}
					onPress={handleLogout}
					icon={<Ionicons name="exit-outline" size={20} color={Colors.primarySurface} />}
				/>
			</View>
		</ScrollView>
	);
};

const Header: React.FC = () => (
	<View style={styles.header}>
		<Icon name="car-hatchback" size={20} color={Colors.primary} />
		<Text style={styles.headerText}>Situação do veículo</Text>
	</View>
);

const MenuItems: React.FC = () => (
	<View style={styles.header}>
		<Icon name="cog" size={20} color={Colors.primary} />
		<Text style={styles.headerText}>Outras opções</Text>
	</View>
);

interface VehicleInfoProps {
	loading: boolean;
}

const StatusBadge: React.FC = () => (
	<View style={styles.badge}>
		<Icon name="check-circle-outline" size={20} color="#FFF" />
		<Text style={styles.badgeText}>Licenciamento em dia</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10
	},
	headerText: {
		fontSize: 14,
		fontWeight: '700',
		marginLeft: 5
	},
	vehicleInfoContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 15,
		padding: 10,
		marginBottom: 20,
		alignItems: 'center'
	},
	plateContainer: {
		paddingTop: 0
	},
	vehicleName: {
		fontSize: 28,
		fontWeight: '700',
		lineHeight: 28,
		paddingVertical: 5
	},
	button: {
		fontSize: 12,
		paddingHorizontal: 20
	},
	badge: {
		backgroundColor: '#68E765',
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: 10,
		alignItems: 'center',
		height: 50,
		width: 300,
		marginVertical: 10
	},
	badgeText: {
		fontSize: 12,
		fontWeight: '600',
		paddingHorizontal: 10,
		color: '#FFF'
	},
	updateText: {
		color: '#9B9B9B',
		fontSize: 12,
		fontWeight: '500',
		paddingVertical: 10
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
	logoutButtonContainer: {
		marginTop: 20,
		marginBottom: 30,
		alignItems: 'center'
	}
});

export default DashboardScreen;
