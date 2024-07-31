import { Image, Text } from "react-native";
import { Button, ContainerImage, Input } from "@app/components";
import { logo } from "@app/assets";
import { useState } from "react";
import api from "@app/api";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  

  async function handleSubmit() {
    if (!email || !password) {
      return setError(true);
    }
    setLoading(true)
    try {
      await api.auth.login(email, password);
    } catch (error) {
      
    }
    setLoading(false);
  }

  return (
    <ContainerImage background="car" scrollable contentContainerStyle={{ justifyContent: 'center', gap: 20 }}>
      <Image
        source={logo}
        style={{ alignSelf: 'center' }}
      />

      <Text style={{ alignSelf: 'center', fontSize: 28, fontWeight: '600' }}>
        Acessar minha conta
      </Text>

      <Input
        autoCapitalize="none"
        label="Email"
        inputMode="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={error && !email}
        helperText={(error && !email) ? 'Campo obrigatório' : undefined}
      />

      <Input
        autoCapitalize="none"
        label="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        error={(error && !password)}
        helperText={(error && !password) ? 'Campo obrigatório' : undefined}
      />

      <Button
        label="Entrar"
        loading={loading}
        onPress={handleSubmit}
      />

    </ContainerImage>
  )
}