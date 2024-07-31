import React, {
  useMemo,
  useState
} from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { logo } from "@app/assets";
import {
  Button,
  ContainerImage,
  Input
} from "@app/components";
import { Colors } from "@app/constants";
import { useNavigation } from "expo-router";
import api from "@app/api";
import { getErrorMessage } from "@app/utils/text";

type FormKey = 'name' | 'email' | 'password' | 'password_confirmation';

export default function RegistrationPage() {
  const navigation: any = useNavigation();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<FormKey, string>>();
  const isFormValid = useMemo(validateFormData, [formData]);

  function handleForm(key: FormKey, value: string) {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }

  function validateFormData(): boolean {
    if (!formData || Object.keys(formData).length < 4) {
      return false;
    }

    let isValid = true;

    for (const key in formData) {
      if (key === 'name' && formData[key].length < 7) {
        isValid = false;
        break;
      }

      if (key === 'email' && !formData[key]) {
        isValid = false;
        break;
      }

      if (key === 'password' && formData[key].length < 6) {
        isValid = false;
        break;
      }

      if (formData.password !== formData.password_confirmation) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      await api.auth.register(formData as any);
      setFormData(undefined);
    } catch (error: any) {
      Alert.alert('Erro', getErrorMessage(error))
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === 'ios'}>
      <ContainerImage contentContainerStyle={{ justifyContent: 'center', gap: 20 }} scrollable ignoreSafeArea>
        <Image source={logo} style={{ alignSelf: 'center' }} />

        <Text style={{ fontSize: 28, fontWeight: '700', textAlign: 'center' }}>
          Informe seus dados
        </Text>

        {/* <Input
          autoCapitalize="characters"
          label="Placa do veículo"
          placeholder="OFU4B68"
          onChangeText={(value) => handleForm('plate', value)}
          maxLength={7}
          value={formData?.plate}
        /> */}

        <Input
          autoCapitalize="words"
          label="Nome completo"
          placeholder="Nome completo"
          onChangeText={(value) => handleForm('name', value)}
          value={formData?.name}
        />

        <Input
          autoComplete="email"
          autoCapitalize="none"
          label="Digite seu email"
          keyboardType="email-address"
          placeholder="exemplo@email.com"
          onChangeText={(value) => handleForm('email', value)}
          value={formData?.email}
        />

        <Input
          autoCapitalize="none"
          autoComplete="new-password"
          label="Crie uma senha"
          keyboardType="email-address"
          placeholder="••••••"
          secureTextEntry
          onChangeText={(value) => handleForm('password', value)}
          value={formData?.password}
        />

        <Input
          autoCapitalize="none"
          autoComplete="new-password"
          label="Confirme sua senha"
          keyboardType="email-address"
          placeholder="••••••"
          secureTextEntry
          onChangeText={(value) => handleForm('password_confirmation', value)}
          value={formData?.password_confirmation}
        />

        <Pressable onPress={() => setChecked(!checked)} style={styles.terms}>
          <View style={styles.checkbox}>
            {checked &&
              <View style={styles.box} />
            }
          </View>

          <Text style={{ flex: 1 }}>
            Li e concordo com os <Text style={{ color: Colors.primary }}>Termos de uso</Text> e a <Text style={{ color: Colors.primary }}>Política de privacidade</Text> do Robim
          </Text>
        </Pressable>

        <Button
          label="Continuar"
          outline={!(isFormValid && checked)}
          loading={loading}
          onPress={handleSubmit}
          disabled={!(isFormValid && checked)}
        />
      </ContainerImage>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  terms: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  box: {
    borderColor: Colors.primary,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderBottomRightRadius: 2,
    height: 14,
    width: 8,
    bottom: 2,
    transform: [{ rotate: '40deg' }]
  }
})