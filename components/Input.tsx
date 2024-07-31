import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View
} from "react-native"
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import Colors from "../constants/Colors";
import { useState } from "react";

interface InputProps extends TextInputProps {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  ...props
}) => {
  const [secure, setSecure] = useState(props.secureTextEntry);
  const inputStyles: StyleProp<TextStyle>[] = [styles.input, props.style];
  const helperStyles: StyleProp<TextStyle>[] = [styles.helper];

  if (error) {
    inputStyles.push(styles.inputError);
    helperStyles.push(styles.helperError);
  }

  return (
    <View style={styles.container}>
      {Boolean(label) &&
        <Text style={styles.label}>{label}</Text>
      }

      <View style={inputStyles}>
        <TextInput
          {...props}
          secureTextEntry={secure}
          style={{ flex: 1, height: '100%' }}
        />
        {props.secureTextEntry &&
          <Pressable onPress={() => setSecure(!secure)}>
            <Icon
              color={Colors.textSecondary}
              name={secure ? "eye" : "eye-off"}
              size={20}
            />
          </Pressable>
        }
      </View>
      {helperText &&
        <Text style={helperStyles}>
          {helperText}
        </Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4
  },
  label: {
    color: Colors.text,
    fontSize: 14,
    marginLeft: 8
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    height: 48
  },
  inputError: {
    borderColor: Colors.danger
  },
  helper: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginLeft: 8
  },
  helperError: {
    color: Colors.danger
  }
})