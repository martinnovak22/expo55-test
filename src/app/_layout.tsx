import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { ThemeProvider } from '@/theme/theme-provider';
import { useAppTheme } from '@/theme/use-app-theme';

function ThemedStatusBar() {
  const theme = useAppTheme();
  const statusBarStyle =
    Platform.OS === 'android' ? 'light' : theme.scheme === 'dark' ? 'light' : 'dark';

  return <StatusBar style={statusBarStyle} />;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <Stack>
        <Stack.Screen name={'(tabs)'} options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
