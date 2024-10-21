import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import VehicleInfo from '@app/components/vehicle/VehicleInfo';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Colors} from '@app/constants';
import {ButtonCustom} from '@app/components/ButtonCustom';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {logo, qrcode} from '@app/assets';

const InfractionScreen: React.FC = () => {
	const param = useLocalSearchParams();
	console.log('PARAM => ', param);
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const mockMultaDetail = {
		name: 'Multa por estacionamento irregular',
		value: 50.0,
		year: 2023,
		duedate: '2023-10-10',
		detail: {
			ait: 'AA01690791',
			data: '2023-06-13 19:43:00',
			guia: '180187820',
			local: 'AV. CARLOS CALDEIRA FILHO, SN',
			valor: 'R$ 50,00',
			receita: 'DETRAN',
			infracao: 'Estacionamento irregular.',
			municipio: 'São Paulo',
			vencimento: '2023-10-10'
		}
	};

	return (
		<View style={styles.container}>
			<VehicleInfo />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<View style={styles.cardContent}>
						<Text style={styles.title}>{mockMultaDetail.name}</Text>
						<Text style={styles.subtitle}>{mockMultaDetail.detail.infracao}</Text>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Valor</Text>
							<Text style={styles.value}>{mockMultaDetail.detail.valor}</Text>
						</View>

						<View style={styles.qrContainer}>
							<Image source={qrcode} style={styles.qrImage} />
							<ButtonCustom
								style={styles.copyButton}
								color={Colors.primary}
								label="Copiar código"
								size="small"
								icon={<MaterialCommunityIcons name={'content-copy'} color={Colors.surface} />}
								onPress={()=> router.navigate('/payments/invoice')}
							/>
						</View>

						<View style={styles.tipsContainer}>
							<Text style={styles.helper}>1. Acesse seu aplicativo de banco</Text>
							<Text style={styles.helper}>2. Selecione pagar com QRCODE</Text>
							<Text style={styles.helper}>3. Aponte a câmera para o código acima, ou copie e cole o código PIX.</Text>
							<Text style={styles.helper}>4. Aguarde o pagamento ser concluído.</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f9f9f9',
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
		flexDirection: 'column'
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
	separator: {
		borderBottomColor: '#E0E0E0',
		borderBottomWidth: 1,
		marginVertical: 10
	},
	infoContainer: {
		marginBottom: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	qrContainer: {
		alignItems: 'center',
		marginBottom: 15
	},
	qrImage: {
		width: 150,
		height: 150,
		marginBottom: 10
	},
	copyButton: {
		alignSelf: 'center',
		marginBottom: 20
	},
	tipsContainer: {
		paddingVertical: 10
	},
	helper: {
		fontSize: 12,
		lineHeight: 16,
		color: Colors.textSecondary,
		marginBottom: 5
	}
});

export default InfractionScreen;
