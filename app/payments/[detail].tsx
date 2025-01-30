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

	const copyToClipboard = (text: string) => {
		console.log('COPY TO CLIPBOARD => ', text);
	};

	return (
		<View style={styles.container}>
			<VehicleInfo />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<View style={styles.cardContent}>
						<Text style={styles.title}>{param.title}</Text>
						<Text style={styles.subtitle}>{param.subtitle}</Text>

						<View style={styles.infoContainer}>
							<Text style={styles.label}>Valor</Text>
							<Text style={styles.value}>{param.value}</Text>
						</View>

						<View style={styles.qrContainer}>
							<Image source={qrcode} style={styles.qrImage} />
							<ButtonCustom
								style={styles.copyButton}
								color={Colors.primary}
								label="Copiar código"
								size="small"
								icon={<MaterialCommunityIcons name={'content-copy'} color={Colors.surface} />}
								onPress={() => copyToClipboard('Balzer')}
							/>
						</View>

						<View style={{flexDirection: 'row', justifyContent: 'space-around', flexWrap:'wrap'}}>
							<ButtonCustom
								style={styles.button}
								color={Colors.success}
								label="Comprovante pago"
								size="small"
								icon={<MaterialCommunityIcons name={'file-document-outline'} color={Colors.surface} />}
								onPress={() =>
									router.navigate({
										pathname: `payments/invoice`,
										params: {
											id: param.id,
											title: param.title,
											subtitle: param.subtitle,
											value: param.value,
											status: 'pago'
										}
									})
								}
							/>
							<ButtonCustom
								style={styles.button}
								color={Colors.warning}
								label="Comprovante pendente"
								size="small"
								icon={<MaterialCommunityIcons name={'file-document-outline'} color={Colors.surface} />}
								onPress={() =>
									router.navigate({
										pathname: `payments/invoice`,
										params: {
											id: param.id,
											title: param.title,
											subtitle: param.subtitle,
											value: param.value,
											status: 'pendente'
										}
									})
								}
							/>
							<ButtonCustom
								style={styles.button}
								color={Colors.danger}
								label="Comprovante cancelado"
								size="small"
								icon={<MaterialCommunityIcons name={'file-document-outline'} color={Colors.surface} />}
								onPress={() =>
									router.navigate({
										pathname: `payments/invoice`,
										params: {
											id: param.id,
											title: param.title,
											subtitle: param.subtitle,
											value: param.value,
											status: 'cancelado'
										}
									})
								}
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
		fontWeight: '700',
		marginBottom: 4,
		textAlign: 'center'
	},
	value: {
		color: '#000',
		fontSize: 20,
		lineHeight: 24,
		textAlign: 'center',
		fontWeight: '600'
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
		marginVertical: 20
	},
	button: {
		
		marginVertical: 2
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
