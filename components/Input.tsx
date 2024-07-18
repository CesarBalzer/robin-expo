import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native"
import Colors from "../constants/Colors";

interface InputProps extends TextInputProps {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {Boolean(label) &&
        <Text style={styles.label}>{label}</Text>
      }
      <TextInput {...props} style={[styles.input, props.style]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4
  },
  label: {
    color: Colors.text
  },
  input: {
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48
  }
})