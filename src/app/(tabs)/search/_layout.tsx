import { Stack } from 'expo-router';
import { IS_IOS } from '@/theme/platform';

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={'index'}
        options={
          IS_IOS
            ? {
                headerShown: true,
                title: 'Search',
                headerLargeTitle: true,
              }
            : { headerShown: false }
        }
      />
    </Stack>
  );
}
