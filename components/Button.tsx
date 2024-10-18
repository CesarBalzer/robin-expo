import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons'; // Importe seu ícone aqui

interface ButtonProps extends TouchableOpacityProps {
	label?: string;
	outline?: boolean;
	loading?: boolean;
	rounded?: boolean;
	size?: 'small' | 'medium' | 'large';
	icon?: React.ReactNode; // Adicionando suporte para ícone
}

export const Button: React.FC<ButtonProps> = ({
	label,
	outline,
	loading,
	rounded,
	size = 'medium',
	icon, // Certifique-se de que o ícone está sendo desestruturado aqui
	...props
}) => {
	const textSize = getTextSize(size);
	const buttonSize = getButtonSize(size); // Para definir a altura do botão

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			{...props}
			style={[
				styles.button,
				outline && styles.outline,
				rounded && styles.rounded,
				{height: buttonSize.height, width: buttonSize.width}, // Define a altura e largura do botão
				props.style
			]}
		>
			{loading ? (
				<ActivityIndicator color={Colors.primarySurface} />
			) : (
				<View style={styles.content}>
					{/* {icon && <View style={styles.icon}>{icon}</View>} */}
					<Text
						style={[
							styles.text,
							{fontSize: textSize},
							outline && styles.outlineText,
							icon ? styles.textWithIcon : styles.textWithoutIcon // Aplica estilo com base na presença do ícone
						]}
					>
						{label}
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

// Função para determinar o tamanho do texto
const getTextSize = (size: 'small' | 'medium' | 'large'): number => {
	switch (size) {
		case 'small':
			return 12;
		case 'medium':
			return 14;
		case 'large':
			return 18;
		default:
			return 16;
	}
};

// Função para determinar o tamanho do botão
const getButtonSize = (size: 'small' | 'medium' | 'large') => {
	switch (size) {
		case 'small':
			return {height: 36, width: 100}; // Tamanho para botão pequeno
		case 'medium':
			return {height: 48, width: 150}; // Tamanho para botão médio
		case 'large':
			return {height: 56, width: 200}; // Tamanho para botão grande
		default:
			return {height: 48, width: 150}; // Tamanho padrão
	}
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
		borderWidth: 1,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3, // Sombra para Android
		shadowColor: Colors.primary, // Sombra para iOS
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.3,
		shadowRadius: 4
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center' // Alinha o texto e o ícone no centro verticalmente
	},
	text: {
		color: Colors.primarySurface,
		fontWeight: '500'
	},
	outline: {
		backgroundColor: 'transparent'
	},
	rounded: {
		borderRadius: 50
	},
	outlineText: {
		color: Colors.primary
	},
	icon: {
		marginRight: 8 // Espaçamento à direita do ícone
	},
	textWithIcon: {
		marginLeft: 8 // Espaçamento fixo entre o ícone e o texto
	},
	textWithoutIcon: {
		marginLeft: 0 // Sem espaçamento se não houver ícone
	}
});
