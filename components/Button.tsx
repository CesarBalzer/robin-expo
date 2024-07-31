import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import Colors from "../constants/Colors";

interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  outline?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  outline,
  loading,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={.6}
      {...props}
      style={[styles.button, outline && styles.outline, props.style]}
    >
      {loading ?
        <ActivityIndicator
          color={Colors.primarySurface}
        />
        :
        <Text style={[styles.text, outline && styles.outlineText]}>
          {label}
        </Text>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: Colors.primarySurface,
    fontSize: 16,
    fontWeight: '500'
  },
  outline: {
    backgroundColor: 'transparent'
  },
  outlineText: {
    color: Colors.primary
  }
});