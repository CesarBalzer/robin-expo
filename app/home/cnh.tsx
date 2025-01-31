import CNHCard from '@app/components/CnhCard';
import {Colors} from '@app/constants';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function CnhScreen() {
	return (
		<View style={styles.container}>
			<Header/>
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

const Header: React.FC = () => (
	<View style={styles.header}>
		<Text style={styles.headerText}>Minha CNH</Text>
	</View>
);

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20
	},
	headerText: {
		fontSize: 20,
		fontWeight: '700',
		marginTop:50
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0'
	},
	// title: {
	// 	fontSize: 24,
	// 	marginBottom: 20,
	// 	color: Colors.primarySurface
	// }
});
