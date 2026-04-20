import { Pressable, StyleSheet, View } from 'react-native';

import { ThemeText } from '@/components/theme-text';
import { type ActivityFilter, useActivityTabState } from '@/features/activity/tab-state';
import { Radius, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

const FILTER_OPTIONS: { label: string; value: ActivityFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Posted', value: 'posted' },
  { label: 'Pending', value: 'pending' },
  { label: 'Settled', value: 'settled' },
];

export function ActivityFilterChips() {
  const theme = useAppTheme();
  const { filter, setFilter } = useActivityTabState();

  return (
    <View style={styles.row}>
      {FILTER_OPTIONS.map((option) => {
        const selected = option.value === filter;

        return (
          <Pressable
            key={option.value}
            onPress={() => setFilter(option.value)}
            style={[
              styles.chip,
              {
                backgroundColor: selected ? theme.accent : theme.surface,
                borderColor: selected ? theme.accent : theme.border,
              },
            ]}
          >
            <ThemeText
              variant={'badge'}
              style={{
                color: selected ? theme.onAccent : theme.text,
              }}
            >
              {option.label}
            </ThemeText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  chip: {
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xxs,
    minHeight: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
