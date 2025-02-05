import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Colors} from '@app/constants';
import {Button, Input} from '@app/components';
import {useVehicle} from '@app/hooks/useVehicle';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {ButtonCustom} from '@app/components/ButtonCustom';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface CnhProps {
	nome: string;
	numeroCNH: string;
	numeroRegistro: string;
	numeroCpf: string;
	validade: string;
	categoria: string;
	dataNascimento: string;
}

const DetailsScreen: React.FC = () => {
	const param = useLocalSearchParams();
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const {vehicle} = useVehicle();
	const [cnh, setCnh] = useState<CnhProps>({
		nome: '',
		numeroCNH: '',
		numeroRegistro: '',
		numeroCpf: '',
		validade: '',
		categoria: '',
		dataNascimento: ''
	});

	const handleInputChange = (field: keyof CnhProps, value: string) => {
		setCnh({...cnh, [field]: value});
	};

	const handleSubmit = () => {
		// Lógica para enviar o formulário
		console.log('CNH Data:', cnh);
	};

	return (
		<View style={styles.container}>
			<Header />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<View style={styles.cardTop}>
						<View style={styles.cardHeader}>
							<Icon name="card-account-details" size={20} color={Colors.primary} />
							<Text style={styles.cardHeaderText}>Informações da CNH</Text>
						</View>
					</View>

					<View style={styles.cardContent}>
						<View style={{flexDirection: 'column', justifyContent: 'flex-start', gap: 15}}>
							<Input
								label="Nome completo"
								value={cnh.nome}
								onChangeText={(text) => handleInputChange('nome', text)}
								size={'fullWidth'}
							/>
							<Input
								label="Número da CNH"
								value={cnh.numeroCNH}
								onChangeText={(text) => handleInputChange('numeroCNH', text)}
								size={'fullWidth'}
							/>
							<Input
								label="Número de Registro"
								value={cnh.numeroRegistro}
								onChangeText={(text) => handleInputChange('numeroRegistro', text)}
								size={'fullWidth'}
							/>
							<Input
								label="CPF"
								value={cnh.numeroCpf}
								onChangeText={(text) => handleInputChange('numeroCpf', text)}
								size={'fullWidth'}
							/>
							<Input
								label="Validade"
								value={cnh.validade}
								onChangeText={(text) => handleInputChange('validade', text)}
								size={'fullWidth'}
							/>
							<Input
								label="Categoria"
								value={cnh.categoria}
								onChangeText={(text) => handleInputChange('categoria', text)}
								size={'fullWidth'}
							/>
							<Input
								label="Data de Nascimento"
								value={cnh.dataNascimento}
								onChangeText={(text) => handleInputChange('dataNascimento', text)}
								size={'fullWidth'}
							/>
						</View>
					</View>

					<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
						<ButtonCustom
							color={Colors.primary}
							label="Salvar"
							size="medium"
							onPress={handleSubmit}
							icon={<MaterialCommunityIcons name="content-save" color={Colors.surface} />}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const Header: React.FC = () => (
	<View style={styles.header}>
		<Text style={styles.headerText}>CNH</Text>
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
