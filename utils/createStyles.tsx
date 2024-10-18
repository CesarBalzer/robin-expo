import darkTheme from '@app/app/themes/darkTheme';
import lightTheme from '@app/app/themes/lightTheme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const createStyles = (theme = lightTheme) => {
	return StyleSheet.create({
		text: {
			color: theme.text,
			fontSize: 18
		},

		container: {
			padding: 20,
			backgroundColor: theme.background
		},

		header: {
			flexDirection: 'row',
			alignItems: 'center',
			marginVertical: 10
		},
		headerText: {
			fontSize: 14,
			fontWeight: '700',
			marginLeft: 5,
			color: theme.text
		},
		headerIcon: {
			color: theme.primary
		},
		vehicleInfoContainer: {
			backgroundColor: theme.surface,
			borderRadius: 15,
			padding: 10,
			marginBottom: 20,
			alignItems: 'center'
		},
		vehicleName: {
			color: theme.text,
			fontSize: 28,
			fontWeight: '700',
			lineHeight: 28,
			paddingVertical: 5
		},


		updateText: {
			color: theme.textSecondary,
			fontSize: 12,
			fontWeight: '500',
			paddingVertical: 10
		},
		bannerContainer: {
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
			marginVertical: 10
		},
		banner: {
			width: width * 0.9,
			height: width * 0.9 * (210 / 390),
			resizeMode: 'contain'
		},
		logoutButtonContainer: {
			marginTop: 20,
			marginBottom: 30,
			alignItems: 'center'
		},


		// ...theme
	});
};
