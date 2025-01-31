import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import VehicleInfo from '@app/components/vehicle/VehicleInfo';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Colors} from '@app/constants';
import {Button} from '@app/components';
import {useVehicle} from '@app/hooks/useVehicle';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { ButtonCustom } from '@app/components/ButtonCustom';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const DetailsScreen: React.FC = () => {
	const param = useLocalSearchParams();
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const {vehicle} = useVehicle();
	console.log('VEHICLE => ', vehicle);
	return (
		<View style={styles.container}>
			<Header />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<View style={styles.cardTop}>
						<View style={styles.cardHeader}>
							<Icon name="car" size={20} color={Colors.primary} />
							<Text style={styles.cardHeaderText}>Informações do veículo</Text>
						</View>
					</View>

					<View style={styles.cardContent}>
						<View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
							<View style={styles.infoContainer}>
								<Text style={styles.label}>Tipo de veículo</Text>
								<Text style={styles.value}>{vehicle?.info?.type}</Text>
							</View>
							<View style={styles.infoContainer}>
								<Text style={styles.label}>Marca/Modelo</Text>
								<Text style={styles.value}>{vehicle?.info?.brand_model}</Text>
							</View>

							<View style={styles.infoContainer}>
								<Text style={styles.label}>Placa</Text>
								<Text style={styles.value}>{vehicle.plate}</Text>
							</View>

							<View style={styles.infoContainer}>
								<Text style={styles.label}>Ano de fabricação/Modelo</Text>
								<Text style={styles.value}>{vehicle?.info?.year}</Text>
							</View>
						</View>
						<View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
							<View style={styles.infoContainer}>
								<Text style={styles.label}>Renavam</Text>
								<Text style={styles.value}>{vehicle?.renavam}</Text>
							</View>

							<View style={styles.infoContainer}>
								<Text style={styles.label}>Combustível</Text>
								<Text style={styles.value}>{vehicle?.info?.fuel}</Text>
							</View>

							<View style={styles.infoContainer}>
								<Text style={styles.label}>Cidade</Text>
								<Text style={styles.value}>{vehicle?.info?.city}</Text>
							</View>
							<View style={styles.infoContainer}>
								<Text style={styles.label}>Categoria</Text>
								<Text style={styles.value}>{vehicle?.info?.category}</Text>
							</View>

							<View style={styles.infoContainer}>
								<Text style={styles.label}>Cor</Text>
								<Text style={styles.value}></Text>
							</View>
						</View>
					</View>

					<View style={{flexDirection: 'row', justifyContent: 'center'}}>
						<ButtonCustom
							color={Colors.primary}
							label="Baixar CRLV"
							size="small"
							icon={<MaterialCommunityIcons name="file-pdf-box" color={Colors.surface} />}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const Header: React.FC = () => (
	<View style={styles.header}>
		<Text style={styles.headerText}>CRLV</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1f1f1',
		padding: 20
	},
	scrollContainer: {
		paddingBottom: 20
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10
	},
	headerText: {
		fontSize: 20,
		fontWeight: '700'
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
		paddingBottom: 20
	},
	cardHeaderText: {
		fontSize: 16,
		fontWeight: '500',
		marginLeft: 10,
		color: Colors.text
	},
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 15,
		padding: 20,
		marginVertical: 10,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 5},
		shadowOpacity: 0.1,
		shadowRadius: 15,
		elevation: 5
	},
	cardTop: {
		// flexDirection: 'column'
	},
	cardContent: {
		flexDirection: 'row',
		gap: 15
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		marginBottom: 10,
		color: Colors.primary
	},
	subtitle: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 10,
		color: Colors.textSecondary
	},
	helper: {
		fontSize: 14,
		color: Colors.textSecondary,
		marginBottom: 10
	},
	separator: {
		borderBottomColor: '#E0E0E0',
		borderBottomWidth: 1,
		marginVertical: 10
	},
	infoContainer: {
		marginBottom: 15
	},
	label: {
		color: '#1f1f1f',
		fontSize: 16,
		marginBottom: 4
	},
	value: {
		color: '#9B9B9B',
		fontSize: 12,
		paddingTop: 5
	},
	cardFooter: {
		paddingVertical: 20,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default DetailsScreen;
