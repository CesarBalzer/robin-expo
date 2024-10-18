import {useTheme} from '../context/ThemeContext';
import {createStyles} from '../utils/createStyles';

export const useThemedStyles = () => {
	const {theme} = useTheme();
	const styles = createStyles(theme);

	return styles;
};
