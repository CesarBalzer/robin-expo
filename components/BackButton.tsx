import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@app/constants/Colors';
import { useRouter } from 'expo-router';

interface BackButtonProps {
  path?: string;
  onPress?: () => void; // Função callback opcional
}

const BackButton: React.FC<BackButtonProps> = ({ path, onPress }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Se a função for fornecida, executa a função
    } else {
      router.replace(path || '/'); // Caso contrário, navega para a URL fornecida
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress} 
    >
      <MaterialIcons name="chevron-left" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackButton;
