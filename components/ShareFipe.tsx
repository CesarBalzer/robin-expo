import React from 'react';
import {Share, TouchableOpacity, Text, Alert, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';
import {format} from 'date-fns';
import {Colors} from '@app/constants';

interface FipeData {
	price: string;
	brand: string;
	model: string;
	year: number;
	fuel: string;
	fipe_code: string;
	reference_month: string;
}

interface ShareFipeProps {
	data: FipeData | null;
}

const ShareFipe: React.FC<ShareFipeProps> = ({data}) => {
	const formatShareMessage = (data: FipeData) => {
		return `📌 *Tabela Fipe*\n\n🚗 *Veículo:* ${data.brand} ${data.model} (${data.year})\n💰 *Preço:* ${
			data.price
		}\n⛽ *Combustível:* ${data.fuel}\n📅 *Mês de Referência:* ${data.reference_month}\n🔢 *Código Fipe:* ${
			data.fipe_code
		}\n\nFonte: Tabela Fipe em ${format(new Date(), 'dd/MM/yyyy HH:ii')}`;
	};

	const shareData = async () => {
		if (!data) {
			Alert.alert('Atenção!', 'Nenhum dado disponível para compartilhar.');
			return;
		}

		try {
			await Share.share({message: formatShareMessage(data)});
		} catch (error) {
			console.error('Erro ao compartilhar:', error);
		}
	};

	return (
		<View style={styles.containerButtonSearch}>
			<TouchableOpacity style={styles.button} onPress={shareData}>
				<FontAwesome name="share-alt" size={20} color={'#fff'} />
				<Text style={styles.buttonText}>Compartilhar</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	containerButtonSearch: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	button: {
		width: 200,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.primary,
		padding: 12,
		borderRadius: 20,
		marginTop: 10
	},
	buttonText: {
		fontSize: 16,
		color: '#fff',
		marginLeft: 8
	}
});

export default ShareFipe;
