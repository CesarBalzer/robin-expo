import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
	View,
	ScrollView,
	Image,
	BackHandler,
	Dimensions,
	StyleSheet,
	KeyboardAvoidingView,
	Alert,
	Platform,
	Text
} from 'react-native';
import Menu from '@app/components/MenuCard';
import {banner_home} from '@app/assets';
import {useAuth} from '@app/hooks/useAuth';
import {ButtonCustom} from '@app/components/ButtonCustom';
import {Ionicons} from '@expo/vector-icons';
import TitleSection from '@app/components/TitleSection';
import VehicleInfo from '@app/components/VehicleInfo';
import {useTheme} from '@app/context/ThemeContext';
import {useVehicle} from '@app/hooks/useVehicle';
import api from '@app/api';
import {useModal} from '@app/context/modalcontext';
import {Input} from '@app/components';
import {useNavigation} from 'expo-router';
import {getErrorMessage} from '@app/utils/text';
import FormVehicle from '@app/components/FormVehicle';

import {menuItems} from '../menuItems';

const {width} = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [openFormVehicle, setOpenFormVehicle] = useState<boolean>(false);
	const {logout} = useAuth();
	const {theme} = useTheme();
	const {vehicles, vehicle, setVehicle, loadVehicles} = useVehicle();

	const [listVehicles, setListVehicles] = useState();
	const {showModal} = useModal();

	

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	useEffect(() => {
		const backAction = () => {
			return true;
		};
		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		const fetchVehicles = async () => {
			setLoading(true);
			try {
				if (!vehicle) {
					await handleVehicleAction();
				}
				// setListVehicles(vehicles);
			} catch (error) {
				console.error('Erro ao carregar veículos:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchVehicles();
	}, []);

	const handleVehicleAction = async () => {
		const list = await api.vehicle.fetchAll();

		if (list && list.vehicles) {
			setListVehicles(list.vehicles);
		}

		// if (list && !list?.vehicles) {
		showModal(<FormVehicle />);
		// }
	};

	const handleLogout = async () => {
		await logout(false);
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
			<View style={styles.infoContainer}>
				<TitleSection title="Situação do veículo" icon="car-hatchback" iconColor={theme.primary} iconSize={20} />
				<VehicleInfo vehicles={listVehicles} loading={loading} />
				<TitleSection title="Outras opções" icon="cog" iconColor={theme.primary} iconSize={20} />
			</View>
			<Menu items={menuItems} />
			<View style={styles.bannerContainer}>
				<Image source={banner_home} style={styles.banner} />
			</View>
			<View style={styles.logoutContainer}>
				<ButtonCustom
					label="Sair do app"
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
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center'
	}
});

export default DashboardScreen;
