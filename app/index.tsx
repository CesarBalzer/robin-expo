import 'expo-router/entry';
import {
  Image,
  Text,
  View
} from "react-native";
import { useNavigation } from 'expo-router';
import { logo } from "@app/assets";
import { Button, ContainerImage } from "@app/components";

export default function StartPage () {
  const navigation: any = useNavigation();

  return (
    <ContainerImage style={{ padding: 20 }} scrollable>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 20 }}>
        <Image source={logo} />
        
        <Text style={{ fontSize: 28, fontWeight: '700', textAlign: 'center' }}>
          Consulte IPVA 2024, licenciamento e multas
        </Text>

        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          Descubra todos os débitos do seu veículo sem pagar nada por isso e resolva parcelando tudo em até 12x!
        </Text>
      </View>

      <View style={{ flex: 1, gap: 20, justifyContent: 'flex-end' }}>
        <Button
          label="Criar minha conta"
          onPress={() => navigation.navigate('registration/form')}
        />
        <Button
          label="Acessar minha conta"
          outline
        />
      </View>
    </ContainerImage>
  )
}