import {StyleSheet, Text, View} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

type HeaderProps = {
	title: string;
	icon?: any;
	iconColor?: string;
	iconSize?: number;
	align?: 'left' | 'center' | 'right';
};

const TitleHeader: React.FC<HeaderProps> = ({title, icon, iconColor, iconSize = 20, align = 'left'}) => {
	const alignmentStyle = {
		justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'
	};

	return (
		<View style={[styles.container]}>
			{icon && <Icon name={icon} size={iconSize} color={iconColor} />}
			<Text style={[styles.text]}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	text: {
		fontSize: 20,
		fontWeight: 700,
		lineHeight: 28,
		fontFamily:'WorkSans',
	}
});

export default TitleHeader;
