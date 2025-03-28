import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {Colors} from '@app/constants';
import {Button, Input} from '@app/components';
import {useVehicle} from '@app/hooks/useVehicle';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {ButtonCustom} from '@app/components/ButtonCustom';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CnhCard from '@app/components/CnhCard';

interface CnhProps {
	nome: string;
	numeroCNH: string;
	numeroRegistro: string;
	numeroCpf: string;
	validade: string;
	categoria: string;
	dataNascimento: string;
}

const CnhsScreen: React.FC = () => {
	const param = useLocalSearchParams();
	const {vehicle} = useVehicle();
	const [activeTab, setActiveTab] = useState<'info' | 'visualizacao'>('info');
	const [cnh, setCnh] = useState<CnhProps>({
		nome: 'Cesar Edenir Balzer',
		numeroCNH: '1234567890',
		numeroRegistro: '99999999999999',
		numeroCpf: '025.076.009-59',
		validade: '12/12/2030',
		categoria: 'AB',
		dataNascimento: '24/09/1978'
	});

	const handleInputChange = (field: keyof CnhProps, value: string) => {
		setCnh({...cnh, [field]: value});
	};

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.tabsContainer}>
				<TouchableOpacity style={[styles.tab, activeTab === 'info' && styles.activeTab]} onPress={() => setActiveTab('info')}>
					<Text style={styles.tabText}>Informações</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, activeTab === 'visualizacao' && styles.activeTab]}
					onPress={() => setActiveTab('visualizacao')}
				>
					<Text style={styles.tabText}>Visualização</Text>
				</TouchableOpacity>
			</View>

			{activeTab === 'info' ? (
				<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
					<View style={styles.card}>
						<View style={styles.cardContent}>
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
						<View style={styles.buttonContainer}>
							<ButtonCustom
								color={Colors.primary}
								label="Salvar"
								size="medium"
								icon={<MaterialCommunityIcons name="content-save" color={Colors.surface} />}
							/>
						</View>
					</View>
				</ScrollView>
			) : (
				<CnhCard
					nome={cnh.nome}
					numeroCNH={cnh.numeroCNH}
					numeroRegistro={cnh.numeroRegistro}
					numeroCpf={cnh.numeroCpf}
					validade={cnh.validade}
					categoria={cnh.categoria}
					dataNascimento={cnh.dataNascimento}
				/>
			)}
		</View>
	);
};

const Header: React.FC = () => (
	<View style={styles.header}>
		<Text style={styles.headerText}>Minha CNH</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f1f1f1',
		padding: 20,
		marginBottom:20
	},
	scrollContainer: {
		// flex: 1,
		backgroundColor: '#f1f1f1',
		paddingTop: 20,
		marginBottom:200
	},
	tabsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 15
	},
	tab: {
		padding: 10,
		borderBottomWidth: 2,
		borderBottomColor: 'transparent'
	},
	activeTab: {
		borderBottomColor: Colors.primary
	},
	tabText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: Colors.text
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
	card: {
		borderRadius: 15,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 5},
		shadowOpacity: 0.1,
		shadowRadius: 15,
		elevation: 5
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
		paddingBottom: 10
	},
	cardHeaderText: {
		fontSize: 16,
		fontWeight: '500',
		marginLeft: 10,
		color: Colors.text
	},
	cardContent: {
		flexDirection: 'column',
		gap: 15
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20
	}
});

export default CnhsScreen;
