if (__DEV__) {
  require("../ReactotronConfig");
}
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { UserProvider } from "@app/context";
import * as StatusBar from "expo-status-bar";

export default function Layout() {
  useEffect(() => {
    StatusBar.setStatusBarStyle('dark');
    if (Platform.OS === 'android') {
      StatusBar.setStatusBarBackgroundColor('transparent', false);
    }
  }, []);

  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="registration/form" />
        <Stack.Screen name="registration/code" />
      </Stack>
    </UserProvider>
  )
}