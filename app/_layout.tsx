import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerTransparent: true,
          headerBlurEffect: 'light',
          headerTintColor: colors.ink,
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'default',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ title: 'O nas' }} />
        <Stack.Screen name="contact" options={{ title: 'Kontakt' }} />
        <Stack.Screen name="psychologists/index" options={{ title: 'Psychologowie' }} />
        <Stack.Screen name="psychologists/[id]" options={{ title: '' }} />
      </Stack>
    </>
  );
}
