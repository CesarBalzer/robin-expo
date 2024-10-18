import {StyleSheet, Text, View} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

type HeaderProps = {
	title: string;
	icon?: any;
	iconColor?: string;
	iconSize?: number;
};

const TitleSection: React.FC<HeaderProps> = ({title, icon, iconColor, iconSize = 20}) => {
	return (
		<View style={styles.header}>
			{icon && <Icon name={icon} size={iconSize} color={iconColor} />}
			<Text style={styles.headerText}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 10
	},
    headerText: {
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 5,
    },
});

export default TitleSection;
