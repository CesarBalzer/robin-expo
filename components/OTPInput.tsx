import { Colors } from '@app/constants';
import React, {
  useState,
  useRef,
  useEffect
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  PixelRatio,
} from 'react-native';

export interface OtpInputProps {
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  containerStyle?: ViewStyle;
  length?: number;
  radius?: TextStyle['borderRadius'];
  size?: TextStyle['height'];
  style?: TextStyle;
  testID?: string;
}

export const OTPInput: React.FC<OtpInputProps> = ({
  length = 4,
  size = PixelRatio.roundToNearestPixel(48),
  testID = "otp",
  ...props
}) => {
  const [otp, setOtp] = useState<string[]>([]);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (otp.length > 0) {
      props.onChange?.(otp.join(''));
    }
  }, [otp]);

  function handleKeyPress(key: string, index: number) {
    if (key === ' ') {
      return;
    }

    if (key === 'Backspace') {
      return handleChange(index, '');
    }

    handleChange(index, key)
  }

  function handleChange(index: number, value: string) {
    if ((index === 0 && value === '' || value !== '') && value === otp[index]) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value === '' && index > 0) {
      return inputRefs.current[index - 1].focus();
    }

    if (value !== '' && index < (length - 1)) {
      return inputRefs.current[index + 1].focus();
    }
  }

  function handlePaste(value: string) {
    if (value.length > 1) {
      setOtp(() => value.split(''));
      inputRefs.current[value.length - 1].focus();
    }
  }

  return (
    <View style={[styles.container, props.style]} testID={testID}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          autoFocus={i === 0 && props.autoFocus}
          key={i}
          ref={(ref) => (inputRefs.current[i] = ref as TextInput)}
          style={[
            styles.input,
            {
              minHeight: size,
              minWidth: size
            },
            props.style
          ]}
          value={otp[i]}
          onFocus={({ target }) => target.state}
          onChangeText={(text) => i === 0 ? handlePaste(text) : undefined}
          onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, i)}
          keyboardType="numeric"
          maxLength={i === 0 ? length : 1}
          testID={`${testID}.input${i > 0 ? ('-' + i) : ''}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    margin: 5,
    textAlign: 'center',
    overflow: 'hidden'
  },
});