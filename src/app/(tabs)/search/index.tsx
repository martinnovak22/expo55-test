import { useMemo } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';

import { DemoCard } from '@/components/demo-card';
import { Screen } from '@/components/screen';
import { ThemeText } from '@/components/theme-text';
import { ActivityFilterChips } from '@/features/activity/components/filter-chips';
import { ACTIVITY_ITEMS, matchesSearch } from '@/features/activity/data';
import { useActivityTabState } from '@/features/activity/tab-state';
import { IS_IOS } from '@/theme/platform';
import { Border, Radius, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

export default function SearchScreen() {
  const theme = useAppTheme();
  const { filter, searchQuery, setSearchQuery } = useActivityTabState();

  const results = useMemo(
    () =>
      ACTIVITY_ITEMS.filter((item) => {
        const matchesFilter = filter === 'all' ? true : item.status === filter;
        return matchesFilter && matchesSearch(item, searchQuery);
      }),
    [filter, searchQuery]
  );

  return (
    <Screen
      title={'Search'}
      subtitle={'Search transactions with shared filtering used by Activity.'}
      showTitle={!IS_IOS}
      useNativeHeader={IS_IOS}
    >
      {IS_IOS ? (
        <Stack.Screen
          options={{
            headerSearchBarOptions: {
              placeholder: 'Search activity',
              hideWhenScrolling: false,
              onChangeText: (event) => setSearchQuery(event.nativeEvent.text),
              onCancelButtonPress: () => setSearchQuery(''),
            },
          }}
        />
      ) : null}
      <DemoCard
        title={'Search Activity'}
        subtitle={'This input updates Activity list results immediately across tabs.'}
      >
        {!IS_IOS ? (
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={'Search by merchant, category, or status'}
            placeholderTextColor={String(theme.mutedText)}
            style={[
              styles.searchInput,
              {
                borderColor: theme.border,
                color: theme.text,
                backgroundColor: theme.surface,
              },
            ]}
          />
        ) : null}
        <ActivityFilterChips />
      </DemoCard>

      <DemoCard
        title={'Live Query'}
        subtitle={'Preview of the current query state shared with the Activity tab.'}
      >
        <ThemeText variant={'muted'}>{`Query: ${searchQuery.trim() ? searchQuery : 'none'}`}</ThemeText>
      </DemoCard>

      <DemoCard title={'Matching Activity Rows'} subtitle={'Preview of transactions matching the active search query.'}>
        <View style={styles.results}>
          {results.map((item) => (
            <View key={`${item.merchant}-${item.amount}`} style={[styles.resultRow, { borderColor: theme.border }]}>
              <ThemeText>{item.merchant}</ThemeText>
              <ThemeText variant={'muted'}>{`${item.category} • ${item.status} • ${item.amount}`}</ThemeText>
            </View>
          ))}
          {results.length === 0 ? <ThemeText variant={'muted'}>{'No results found.'}</ThemeText> : null}
        </View>
      </DemoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    minHeight: Spacing.xl + Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  results: {
    gap: Spacing.xs,
  },
  resultRow: {
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    gap: Spacing.xxs,
  },
});
