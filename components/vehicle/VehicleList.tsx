import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Colors} from '@app/constants';
import VehicleListItem from './VehicleListItem';
import {useModal} from '@app/context/modalcontext';

const VehicleList = ({vehicles, setVehicle}: {vehicles: any; setVehicle: any}) => {
	const {hideModal} = useModal();

	return (
		<View style={{flex: 1}}>
			<TouchableOpacity style={styles.closeButton} onPress={hideModal}>
				<MaterialIcons name="close" size={32} color={Colors.primary} />
			</TouchableOpacity>
			<Text style={styles.modalTitle}>Selecione um veículo</Text>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={vehicles}
				keyExtractor={(item) => item.long_id}
				renderItem={({item}) => (
					<VehicleListItem
						plate={item.plate}
						renavam={item.renavam}
						createdAt={item.created_at}
						updatedAt={item.updated_at}
						onSelect={() => {
							console.log('SETVEHICLE => ', item);
							setVehicle(item);
							hideModal();
						}}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	closeButton: {
		position: 'absolute',
		top: 0,
		right: 20,
		zIndex: 1
	},
	modalTitle: {
		fontSize: 20,
		marginBottom: 15,
		textAlign: 'center',
		marginTop: 10
	}
});

export default VehicleList;
