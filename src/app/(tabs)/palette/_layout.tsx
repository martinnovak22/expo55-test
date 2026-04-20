import { Stack } from 'expo-router';
import { IS_IOS } from '@/theme/platform';

export default function ActivityLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={'index'}
        options={
          IS_IOS
            ? {
                headerShown: true,
                title: 'Activity',
                headerLargeTitle: true,
              }
            : { headerShown: false }
        }
      />
      <Stack.Screen
        name={'[merchant]'}
        options={
          IS_IOS
            ? {
                headerShown: true,
              }
            : {
                headerShown: false,
              }
        }
      />
    </Stack>
  );
}
