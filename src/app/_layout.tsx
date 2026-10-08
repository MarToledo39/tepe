// Estructura general de la app: carga la tipografía Inter y arma la navegación de "entrar y volver".
// No hay pestañas: todo parte de Inicio (src/app/index.tsx).

import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { colors, fonts } from '@/constants/tokens';

// La pantalla de carga queda visible hasta que Inter esté lista.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontFamily: fonts.semibold },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="index" options={{ title: 'Inicio' }} />
        <Stack.Screen name="tp/[id]/index" options={{ title: 'TP' }} />
        <Stack.Screen name="tp/[id]/tarea/[tareaId]" options={{ title: 'Tarea' }} />
        <Stack.Screen name="perfil" options={{ title: 'Perfil' }} />
        <Stack.Screen name="ayuda" options={{ title: 'Ayuda' }} />
        <Stack.Screen name="estilos" options={{ title: 'Muestra de estilos' }} />
      </Stack>
    </>
  );
}
