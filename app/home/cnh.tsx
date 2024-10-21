import CNHCard from '@app/components/CnhCard';
import { Colors } from '@app/constants';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function CnhScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>CNH asdasdasdas</Text>
			<CNHCard
				nome="Cesar Edenir Balzer"
				numeroCNH="1234567890"
				numeroRegistro="99999999999999"
				numeroCpf="025.076.009-59"
				validade="12/12/2030"
				categoria="AB"
				dataNascimento="24/09/1978"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0'
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
		color:Colors.primarySurface
	}
});
