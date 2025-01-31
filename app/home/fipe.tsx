import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import CustomPicker from '@app/components/CustomPicker';
import api from '@app/api';

const FipeScreen: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [brands, setBrands] = useState<any[]>([]);
	const [models, setModels] = useState<any[]>([]);
	const [years, setYears] = useState<any[]>([]);
	const [selectedBrand, setSelectedBrand] = useState<any | null>(null);
	const [selectedModel, setSelectedModel] = useState<any | null>(null);
	const [selectedYear, setSelectedYear] = useState<any | null>(null);

	useEffect(() => {
		loadBrands();
	}, []);

	const loadBrands = async () => {
		try {
			setLoading(true);
			setErrorMessage(null);
			// const listBrands = await api.fipe.fetchBrands(1);
			setBrands([
				{id: 1, name: 'Acura'},
				{id: 2, name: 'Aston Martin'}
			]);
		} catch (error) {
			console.error(error);
			setErrorMessage('Erro ao carregar as marcas.');
			setBrands([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (selectedBrand) {
			loadModels();
		} else {
			setModels([]);
			setYears([]);
			setSelectedModel(null);
			setSelectedYear(null);
		}
	}, [selectedBrand]);

	const loadModels = async () => {
		try {
			setLoading(true);
			setErrorMessage(null);
			const listModels = await api.fipe.fetchModels(1, selectedBrand.id);
			setModels(listModels);
		} catch (error) {
			console.error(error);
			setErrorMessage('Erro ao carregar os modelos.');
			setModels([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (selectedModel) {
			loadYears();
		} else {
			setYears([]);
			setSelectedYear(null);
		}
	}, [selectedModel]);

	const loadYears = async () => {
		try {
			setLoading(true);
			setErrorMessage(null);
			const listYears = await api.fipe.fetchYears(1, selectedBrand.id, selectedModel.id);
			setYears(listYears);
		} catch (error) {
			console.error(error);
			setErrorMessage('Erro ao carregar os anos.');
			setYears([]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Tabela FIPE</Text>

			<CustomPicker
				title="Selecione uma marca"
				label="Marca do veículo"
				selectedValue={selectedBrand?.name || ''}
				onValueChange={setSelectedBrand}
				options={brands}
			/>

			<CustomPicker
				label="Modelo"
				selectedValue={selectedModel?.name || ''}
				onValueChange={setSelectedModel}
				options={models}
				disabled={!selectedBrand}
			/>

			<CustomPicker
				label="Ano modelo"
				selectedValue={selectedYear?.name || ''}
				onValueChange={setSelectedYear}
				options={years}
				disabled={!selectedModel}
			/>

			<TouchableOpacity style={styles.button} disabled={!selectedYear}>
				<FontAwesome name="search" size={16} color="#fff" />
				<Text style={styles.buttonText}>Pesquisar</Text>
			</TouchableOpacity>

			<View style={styles.resultContainer}>
				{renderResultRow('Mês de referência', 'Julho de 2024')}
				{renderResultRow('Código Fipe', '011102-3')}
				{renderResultRow('Marca', 'Citroën')}
				{renderResultRow('Modelo', 'AIRCROSS GLX 1.6 FLEX 16V 5p Mec.')}
				{renderResultRow('Ano Modelo', '2013 Gasolina')}
				{renderResultRow('Autenticação', 'r5ggrryybnnc')}
				{renderResultRow('Data da consulta', '11 de julho de 2024 16:01')}
				<View style={styles.priceContainer}>
					<Text style={styles.priceLabel}>Preço Médio</Text>
					<Text style={styles.priceValue}>R$ 36.601,00</Text>
				</View>
			</View>

			<TouchableOpacity style={styles.shareButton}>
				<FontAwesome name="share-alt" size={16} color="#007bff" />
				<Text style={styles.shareText}>Compartilhar</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

const renderResultRow = (label: string, value: string) => (
	<View style={styles.resultRow}>
		<Text style={styles.resultLabel}>{label}:</Text>
		<Text style={styles.resultValue}>{value}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#fff',
		padding: 20
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#007bff',
		padding: 12,
		borderRadius: 8,
		marginTop: 10
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		marginLeft: 8
	},
	resultContainer: {
		backgroundColor: '#f8f9fa',
		padding: 15,
		borderRadius: 8,
		marginTop: 20
	},
	resultRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 5
	},
	resultLabel: {
		fontWeight: 'bold'
	},
	resultValue: {
		fontSize: 16
	},
	priceContainer: {
		backgroundColor: '#007bff',
		padding: 10,
		borderRadius: 8,
		marginTop: 10,
		alignItems: 'center'
	},
	priceLabel: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold'
	},
	priceValue: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold'
	},
	shareButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15
	},
	shareText: {
		fontSize: 16,
		color: '#007bff',
		marginLeft: 8
	}
});

export default FipeScreen;
