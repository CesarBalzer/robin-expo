import React, {useEffect, useRef, ReactNode} from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

interface ContainerMainProps {
	children: ReactNode;
}

const ContainerMain: React.FC<ContainerMainProps> = ({children}) => {
	const scrollViewRef = useRef<ScrollView>(null);



	return (
		<View style={{flex: 1, backgroundColor: '#ececec'}}>
			<View style={{alignItems: 'center', paddingVertical: 20}}>
				<Image source={{uri: 'https://via.placeholder.com/150'}} style={{width: 150, height: 50, resizeMode: 'contain'}} />
			</View>

			<ScrollView  style={{flex: 1}}>
				<View style={{height: height * 2, padding: 20}}>{children}</View>
			</ScrollView>
		</View>
	);
};

export default ContainerMain;
