import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import CustomPicker from '@app/components/CustomPicker';
import api from '@app/api';
import {Colors} from '@app/constants';

interface Brand {
	id: string;
	name: string;
}

interface Model {
	id: string;
	name: string;
}

interface Year {
	id: string;
	name: string;
}

interface FipeData {
	price: string;
	brand: string;
	model: string;
	year: number;
	fuel: string;
	fipe_code: string;
	reference_month: string;
	authentication: string;
	vehicle_type: number;
	abbr_fuel: string;
	date: Date;
	currency: string;
}

const FipeScreen: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [data, setData] = useState<FipeData | null>(null);
	const [brands, setBrands] = useState<Brand[]>([]);
	const [models, setModels] = useState<Model[]>([]);
	const [years, setYears] = useState<Year[]>([]);
	const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
	const [selectedModel, setSelectedModel] = useState<Model | null>(null);
	const [selectedYear, setSelectedYear] = useState<Year | null>(null);

	useEffect(() => {
		loadBrands();
	}, []);

	const loadBrands = async () => {
		try {
			setLoading(true);
			setErrorMessage(null);
			// const listBrands = await api.fipe.fetchBrands(1);
			const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
			const json = await response.json();
			const listBrands = json.map((item: any) => {
				return {id: item.codigo, name: item.nome};
			});
			setBrands(listBrands);
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
			// const listModels = await api.fipe.fetchModels(1, selectedBrand.id);
			const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand?.id}/modelos`);
			const json = await response.json();
			const listModels = json.modelos.map((item: any) => {
				return {id: item.codigo, name: item.nome};
			});
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
			// const listYears = await api.fipe.fetchYears(1, selectedBrand.id, selectedModel.id);
			const response = await fetch(
				`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand?.id}/modelos/${selectedModel?.id}/anos`
			);
			const json = await response.json();
			const listYears = json.map((item: any) => {
				return {id: item.codigo, name: item.nome};
			});
			setYears(listYears);
		} catch (error) {
			console.error(error);
			setErrorMessage('Erro ao carregar os anos.');
			setYears([]);
		} finally {
			setLoading(false);
		}
	};

	const loadPrice = async () => {
		try {
			setLoading(true);
			setErrorMessage(null);
			// const listPrice = await api.fipe.fetchYears(1, selectedBrand.id, selectedModel.id);
			const response = await fetch(
				`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand?.id}/modelos/${selectedModel?.id}/anos/${selectedYear?.id}`
			);
			const json = await response.json();

			console.log('JSON => ', json);

			setData({
				price: json.Valor,
				brand: json.Marca,
				model: json.Modelo,
				year: json.AnoModelo,
				fuel: json.Combustivel,
				fipe_code: json.CodigoFipe,
				reference_month: json.MesReferencia,
				authentication: '',
				vehicle_type: json.TipoVeiculo,
				abbr_fuel: json.SiglaCombustivel,
				date: new Date(),
				currency: 'BRL'
			});
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

			<TouchableOpacity style={styles.button} disabled={!selectedYear} onPress={loadPrice}>
				<FontAwesome name="search" size={16} color="#fff" />
				<Text style={styles.buttonText}>Pesquisar</Text>
			</TouchableOpacity>

			<View style={styles.resultContainer}>
				{renderResultRow('Mês de referência', data?.reference_month || '')}
				{renderResultRow('Código Fipe', data?.fipe_code || '')}
				{renderResultRow('Marca', data?.brand || '')}
				{renderResultRow('Modelo', data?.model || '')}
				{renderResultRow('Ano Modelo', data?.year?.toString() || '')}
				{renderResultRow('Autenticação', data?.authentication || '')}
				{renderResultRow('Data da consulta', data?.date?.toLocaleDateString() || '')}
				<View style={styles.priceContainer}>
					<Text style={styles.priceLabel}>Preço Médio</Text>
					<Text style={styles.priceValue}>{data?.price || 'R$ 0,00'}</Text>
				</View>
			</View>

			<TouchableOpacity style={styles.shareButton}>
				<FontAwesome name="share-alt" size={16} color={Colors.primary} />
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
		backgroundColor: Colors.primary,
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
		backgroundColor: Colors.primary,
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
		borderColor: Colors.primary,
		borderWidth: 1,
		borderRadius: 10,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15
	},
	shareText: {
		fontSize: 16,
		color: Colors.primary,
		marginLeft: 8
	}
});

export default FipeScreen;
