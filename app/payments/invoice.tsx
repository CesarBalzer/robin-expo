import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import VehicleInfo from '@app/components/vehicle/VehicleInfo';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Colors} from '@app/constants';
import {ButtonCustom} from '@app/components/ButtonCustom';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {qrcode} from '@app/assets';

type StatusIconMapping = {
	pago: 'check-circle';
	pendente: 'clock';
	cancelado: 'close-circle';
};

const InvoiceScreen: React.FC = () => {
	const param = useLocalSearchParams();
	console.log('PARAM => ', param);
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const statusIconMap: StatusIconMapping = {
		pago: 'check-circle',
		pendente: 'clock',
		cancelado: 'close-circle'
	};

	const getStatusIcon = () => {
		const status = Array.isArray(param.status) ? param.status[0] : param.status;
		const iconName = statusIconMap[status as keyof StatusIconMapping] || 'help-circle';

		let color;
		switch (status) {
			case 'pago':
				color = Colors.success;
				break;
			case 'pendente':
				color = Colors.warning;
				break;
			case 'cancelado':
				color = Colors.danger;
				break;
			default:
				color = Colors.textSecondary;
		}

		return {icon: iconName, color};
	};

	const {icon, color} = getStatusIcon();

	return (
		<View style={styles.container}>
			<VehicleInfo />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<View style={styles.cardContent}>
						<Text style={styles.title}>{param?.title}</Text>
						<Text style={styles.subtitle}>{param?.subtitle}</Text>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Valor</Text>
							<Text style={styles.value}>{param?.value}</Text>
						</View>

						<View style={styles.qrContainer}>
							<Image source={qrcode} style={[styles.qrImage, {borderColor: color}]} />
							<MaterialCommunityIcons name={icon} size={60} color={color} style={styles.statusIcon} />
						</View>
						<Text style={[styles.status, {color: color}]}>{param?.status}</Text>

						{param?.status === 'pago' ? (
							<ButtonCustom
								style={styles.saveButton}
								color={Colors.primary}
								label="Salvar ou compartilhar comprovante"
								size="small"
								icon={<MaterialCommunityIcons name="share-variant" color={Colors.surface} />}
							/>
						) : (
							<ButtonCustom
								style={styles.regenerateButton}
								color={color}
								label="Voltar e gerar outro QR code"
								size="small"
								icon={<MaterialCommunityIcons name="qrcode-scan" color={Colors.surface} />}
								onPress={() => {
									router.back();
									router.back();
								}}
							/>
						)}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1f1f1',
		padding: 20
	},
	scrollContainer: {
		paddingBottom: 20
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
	cardContent: {
		flexDirection: 'column',
		paddingBottom: 50
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		marginBottom: 10,
		color: Colors.secondary,
		textAlign: 'center'
	},
	subtitle: {
		fontSize: 12,
		marginBottom: 10,
		textAlign: 'center',
		paddingVertical: 10
	},
	label: {
		color: '#006385',
		fontSize: 16,
		marginBottom: 4,
		textAlign: 'center'
	},
	value: {
		color: '#000',
		fontSize: 20,
		lineHeight: 24,
		textAlign: 'center'
	},
	status: {
		fontSize: 20,
		lineHeight: 24,
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	infoContainer: {
		marginBottom: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	qrContainer: {
		alignItems: 'center',
		marginBottom: 15,
		position: 'relative'
	},
	qrImage: {
		width: 150,
		height: 150,
		opacity: 0.3,
		borderWidth: 2,
		borderRadius: 10
	},
	statusIcon: {
		position: 'absolute',
		top: '30%'
	},
	saveButton: {
		alignSelf: 'center',
		marginTop: 20
	},
	regenerateButton: {
		alignSelf: 'center',
		marginTop: 20
	}
});

export default InvoiceScreen;
