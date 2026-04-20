import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { DemoCard } from '@/components/demo-card';
import { Screen } from '@/components/screen';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { IS_ANDROID, IS_IOS } from '@/theme/platform';
import { Border, Radius, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

export default function MerchantDetailScreen() {
  const router = useRouter();
  const theme = useAppTheme();
  const params = useLocalSearchParams<{
    merchant?: string;
    category?: string;
    amount?: string;
    status?: string;
  }>();

  const merchant = params.merchant ?? 'Unknown merchant';
  const category = params.category ?? 'Unknown category';
  const amount = params.amount ?? 'n/a';
  const status = params.status ?? 'n/a';

  return (
    <>
      <Stack.Screen
        options={{
          title: merchant,
          headerBackTitle: 'Activity',
        }}
      />
      <Screen
        title={merchant}
        showTitle={IS_ANDROID}
        useNativeHeader={!IS_ANDROID}
        contentContainerStyle={IS_IOS ? styles.iosContentInset : undefined}
        androidHeaderLeft={
          IS_ANDROID ? (
            <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={Spacing.xs}>
              <MaterialIcons name={'arrow-back-ios-new'} size={22} color={String(theme.onAccent)} />
            </Pressable>
          ) : null
        }
      >
        <DemoCard
          title={'Typed Route Params'}
          subtitle={'This screen is navigated using a typed pathname and typed href params.'}
        >
          <View style={styles.row}>
            <ThemeText variant={'muted'}>{'Merchant'}</ThemeText>
            <ThemeText>{merchant}</ThemeText>
          </View>
          <View style={styles.row}>
            <ThemeText variant={'muted'}>{'Category'}</ThemeText>
            <ThemeText>{category}</ThemeText>
          </View>
          <View style={styles.row}>
            <ThemeText variant={'muted'}>{'Status'}</ThemeText>
            <ThemeText>{status}</ThemeText>
          </View>
          <View style={styles.row}>
            <ThemeText variant={'muted'}>{'Amount'}</ThemeText>
            <ThemeText>{amount}</ThemeText>
          </View>
        </DemoCard>

        <ThemeSurface variant={'muted'} style={[styles.note, { borderColor: theme.border }]}>
          <ThemeText variant={'muted'}>
            The Activity tab uses Expo Router v55 typed route params for compile-time safety.
          </ThemeText>
        </ThemeSurface>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    minHeight: Spacing.lg,
    minWidth: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iosContentInset: {
    paddingTop: Spacing.md,
  },
  row: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
    paddingBottom: Spacing.xs,
    gap: Spacing.sm,
  },
  note: {
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.md,
  },
});
