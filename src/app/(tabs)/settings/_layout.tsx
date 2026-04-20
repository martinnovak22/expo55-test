import { Stack } from 'expo-router';
import { IS_IOS } from '@/theme/platform';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={'index'}
        options={
          IS_IOS
            ? {
                headerShown: true,
                title: 'Diagnostics',
                headerLargeTitle: true,
              }
            : { headerShown: false }
        }
      />
    </Stack>
  );
}
