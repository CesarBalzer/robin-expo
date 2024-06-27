import 'expo-router/entry';
import { background_light, logo } from "@app/assets";
import { Button } from "@app/components";
import { Image, ImageBackground, SafeAreaView, Text, View } from "react-native";

export default function () {
  return (
    <ImageBackground source={background_light} resizeMode="stretch" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 20 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 20 }}>
            <Image source={logo} />
            <Text style={{ fontSize: 28, fontWeight: '700', textAlign: 'center' }}>
              Consulte IPVA 2024, licenciamento e multas
            </Text>

            <Text style={{ fontSize: 16, textAlign: 'center' }}>
              Descubra todos o s débitos do seu veículo sem pagar nada por isso e resolva parcelando tudo em até 12x!
            </Text>
          </View>

          <View style={{ flex: 1, gap: 20, justifyContent: 'flex-end' }}>
            <Button
              label="Criar minha conta"
            />
            <Button
              label="Acessar minha conta"
              outline
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}