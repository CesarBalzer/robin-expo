import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import CustomPicker from '@app/components/CustomPicker';

const FipeScreen: React.FC = () => {
	const [marca, setMarca] = useState('Citroen');
	const [modelo, setModelo] = useState('AIRCROSS GLX 1.6 FLEX 16V 5P MEC');
	const [ano, setAno] = useState('2012/2013');

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Tabela FIPE</Text>

			<CustomPicker label="Marca do veículo" selectedValue={marca} onValueChange={setMarca} options={['Citroen']} />
			<CustomPicker
				label="Modelo"
				selectedValue={modelo}
				onValueChange={setModelo}
				options={['AIRCROSS GLX 1.6 FLEX 16V 5P MEC']}
			/>
			<CustomPicker label="Ano modelo" selectedValue={ano} onValueChange={setAno} options={['2012/2013']} />

			<TouchableOpacity style={styles.button}>
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
