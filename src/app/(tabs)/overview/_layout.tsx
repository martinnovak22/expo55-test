import { Stack } from 'expo-router';
import { IS_IOS } from '@/theme/platform';

export default function OverviewLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={'index'}
        options={
          IS_IOS
            ? {
                headerShown: true,
                title: 'Overview',
                headerLargeTitle: true,
              }
            : { headerShown: false }
        }
      />
    </Stack>
  );
}
