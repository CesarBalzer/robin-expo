import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Image, Dimensions} from 'react-native';
import {Button} from '@app/components';
import VehiclePlate from '@app/components/VehiclePlate';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {Colors} from '@app/constants';
import Menu from '@app/components/MenuCard';
import {banner_home} from '@app/assets';
import {useNavigation} from 'expo-router';
import {useModal} from '@app/context/modalcontext';

const {width} = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
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

	const VehicleInfo: React.FC<VehicleInfoProps> = ({loading}) => (
		<View style={styles.vehicleInfoContainer}>
			<View style={styles.plateContainer}>
				<VehiclePlate plateNumber="AIN0482" />
			</View>
			<Text style={styles.vehicleName}>Chevrolet Impala</Text>
			<StatusBadge />
			<Text style={styles.updateText}>Atualizado em: 14/10/2024 - 13:00</Text>
			<Button
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

	return (
		<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
			<Header />
			<VehicleInfo loading={loading} />
			<MenuItems />
			<Menu items={menuItems} />
			<View style={styles.bannerContainer}>
				<Image source={banner_home} style={styles.banner} />
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
	}
});

export default DashboardScreen;
