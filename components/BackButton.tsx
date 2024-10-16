import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import Colors from '@app/constants/Colors';
import {useRouter} from 'expo-router';

interface BackButtonProps {
  path?: string;
}

const BackButton: React.FC<BackButtonProps> = ({path}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.replace(path || '/')} 
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
