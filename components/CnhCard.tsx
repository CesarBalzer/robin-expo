import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {cnh_model} from '@app/assets';

interface CNHProps {
	nome: string;
	numeroCNH: string;
	numeroRegistro: string;
	numeroCpf: string;
	validade: string;
	categoria: string;
	dataNascimento: string;
}

const CNHCard: React.FC<CNHProps> = ({nome, numeroCNH, numeroRegistro,numeroCpf, validade, categoria, dataNascimento}) => {
	return (
		<View style={styles.card}>
			<ImageBackground source={cnh_model} style={styles.container} resizeMode="contain">
				<Text style={styles.nome}>{nome}</Text>
				<Text style={styles.numeroCNH}>{numeroCNH}</Text>
				<Text style={styles.numeroRegistro}>{numeroRegistro}</Text>
				<Text style={styles.numeroCpf}>{numeroCpf}</Text>
				<Text style={styles.validade}>{validade}</Text>
				<Text style={styles.categoria}>{categoria}</Text>
				<Text style={styles.dataNascimento}>{dataNascimento}</Text>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		marginHorizontal: 20,
		padding: 20,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#fff'
	},
	container: {
		width: '100%',
		height: '100%'
	},
	nome: {
		position: 'absolute',
		top: '41.3%',
		left: '17%',
		color: '#000',
		fontSize: 10,
		backgroundColor: 'transparent'
	},
	numeroCNH: {
		position: 'absolute',
		top: '41%',
		left: '-40%',
		color: '#7a7a7a',
		fontSize: 15,
    fontWeight:'700',
		transform: [{rotate: '270deg'}],
		width: '100%',
		backgroundColor: 'transparent'
	},
	numeroRegistro: {
		position: 'absolute',
		top: '63.7%',
		left: '17%',
		color: '#000',
		fontSize: 10,
		width: '100%',
		backgroundColor: 'transparent'
	},
	validade: {
		position: 'absolute',
		top: '63.7%',
		left: '51%',
		color: '#000',
		fontSize: 10,
		backgroundColor: 'transparent'
	},
	categoria: {
		position: 'absolute',
		top: '60.5%',
		left: '85%',
		color: '#000',
		fontSize: 10,
		backgroundColor: 'transparent'
	},
	dataNascimento: {
		position: 'absolute',
		top: '48.2%',
		left: '77%',
		color: '#000',
		fontSize: 10,
		backgroundColor: 'transparent'
	},
	numeroCpf: {
		position: 'absolute',
		top: '48.2%',
		left: '51%',
		color: '#000',
		fontSize: 10,
		backgroundColor: 'transparent'
	}
});

export default CNHCard;
