import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function SecureScreen() {
	return (
		<View style={styles.container}>
			<Header />
		</View>
	);
}

const Header: React.FC = () => (
	<View style={styles.header}>
		<Text style={styles.headerText}>Seguro</Text>
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
		fontWeight: '700'
	},
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0'
	}
});
