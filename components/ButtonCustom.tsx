import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import Colors from '../constants/Colors';

interface ButtonCustomProps extends TouchableOpacityProps {
    label?: string;
    outline?: boolean;
    loading?: boolean;
    rounded?: boolean;
    size?: 'small' | 'medium' | 'large';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right' | 'center';
    fullWidth?: boolean; // Novo parâmetro para definir largura total
}

export const ButtonCustom: React.FC<ButtonCustomProps> = ({
    label,
    outline,
    loading,
    rounded,
    size = 'medium',
    icon,
    iconPosition = 'left',
    fullWidth = false, // Valor padrão como false
    ...props
}) => {
    const textSize = getTextSize(size);
    const buttonStyle = [
        styles.button,
        outline && styles.outline,
        rounded && styles.rounded,
        fullWidth && styles.fullWidth, // Aplica estilo de largura total
        props.style,
    ];
    const contentStyle = loading ? styles.loadingContent : styles.content;

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            {...props}
            style={buttonStyle}
        >
            {loading ? (
                <ActivityIndicator color={Colors.primarySurface} />
            ) : (
                <View style={contentStyle}>
                    {icon && iconPosition === 'left' && <View style={styles.iconContainer}>{icon}</View>}
                    {label && <Text style={[styles.text, { fontSize: textSize }, outline && styles.outlineText]}>{label}</Text>}
                    {icon && iconPosition === 'right' && <View style={styles.iconContainer}>{icon}</View>}
                </View>
            )}
        </TouchableOpacity>
    );
};

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

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    fullWidth: {
        width: '100%', // Define a largura total do botão
    },
    text: {
        color: Colors.primarySurface,
        fontWeight: '500',
    },
    outline: {
        backgroundColor: 'transparent',
    },
    rounded: {
        borderRadius: 50,
    },
    outlineText: {
        color: Colors.primary,
    },
    loadingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        marginHorizontal: 8, // Espaçamento entre o ícone e o texto
    },
});
