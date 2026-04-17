import { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { DemoCard } from '@/components/demo-card';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { Border, ControlSize, Elevation, Radius, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

const placeholderItems = [
  'Personalized dashboard card',
  'Weekly activity insight',
  'Suggested task automation',
  'Trend comparison module',
] as const;

export function HomePlaceholderShowcase() {
  const theme = useAppTheme();
  const isAndroid = Platform.OS === 'android';
  const [projectName, setProjectName] = useState('Expo Router v55 Playground');
  const [ownerEmail, setOwnerEmail] = useState('owner@example.dev');
  const [lastAction, setLastAction] = useState<'none' | 'cancel' | 'create'>('none');

  return (
    <View style={styles.container}>
      <ThemeText variant={'title'}>Expo Router v55 Demo</ThemeText>
      <ThemeText variant={'muted'}>
        This example highlights native tabs on iOS and dynamic Material colors on Android.
      </ThemeText>

      <DemoCard
        title={'Native Router Tabs'}
        subtitle={'Using expo-router/unstable-native-tabs with system icons and native behavior.'}
      />

      <DemoCard
        title={'Dynamic Theme Loading'}
        subtitle={
          'Colors are read from Expo Router Color API and update when system theme changes.'
        }
      >
        <Pressable
          onPress={() => setLastAction('none')}
          style={({ pressed }) => [
            styles.primaryButton,
            styles.pill,
            { backgroundColor: theme.accent },
            pressed && styles.pressedButton,
          ]}
        >
          <ThemeText style={{ color: theme.onAccent }}> Accent from platform palette</ThemeText>
        </Pressable>
      </DemoCard>

      <View style={styles.colorStripRow}>
        <View style={[styles.colorStrip, { backgroundColor: theme.accent }]}>
          <ThemeText variant={'badge'} style={{ color: theme.onAccent }}>
            Primary
          </ThemeText>
        </View>
        <View style={[styles.colorStrip, { backgroundColor: theme.secondary }]}>
          <ThemeText variant={'badge'} style={{ color: theme.onSecondary }}>
            Secondary
          </ThemeText>
        </View>
        <View style={[styles.colorStrip, { backgroundColor: theme.tertiary }]}>
          <ThemeText variant={'badge'} style={{ color: theme.onTertiary }}>
            Tertiary
          </ThemeText>
        </View>
      </View>

      <ThemeText variant={'subtitle'}>Placeholder Showcase</ThemeText>
      <ThemeText variant={'muted'}>
        Scroll through these blocks to test blur, depth, and color separation under native tabs.
      </ThemeText>

      <ThemeSurface
        variant={'surface'}
        style={[styles.glassProbe, isAndroid && styles.androidPanel, { borderColor: theme.border }]}
      >
        <View
          pointerEvents={'none'}
          style={[styles.colorOrb, styles.orbTopRight, { backgroundColor: theme.accent }]}
        />
        <View
          pointerEvents={'none'}
          style={[styles.colorOrb, styles.orbBottomLeft, { backgroundColor: theme.secondary }]}
        />
        <ThemeText variant={'badge'} style={styles.sectionLabel}>
          Glass Probe Rail
        </ThemeText>
        <View style={styles.probeRow}>
          <View style={[styles.probeBlock, { backgroundColor: theme.accent }]} />
          <View style={[styles.probeBlock, { backgroundColor: theme.danger }]} />
          <View style={[styles.probeBlock, { backgroundColor: theme.mutedSurface }]} />
        </View>
      </ThemeSurface>

      {placeholderItems.map((item, index) => (
        <Pressable
          key={item}
          style={({ pressed }) => [
            styles.cardPressable,
            { shadowColor: theme.text },
            pressed && styles.pressedCard,
          ]}
          onPress={() => setLastAction('none')}
        >
          <ThemeSurface
            variant={index % 2 === 0 ? 'surface' : 'muted'}
            style={[
              styles.itemCard,
              isAndroid && styles.androidPanel,
              { borderColor: theme.border },
            ]}
          >
            <View style={styles.itemRow}>
              <View style={styles.itemTextWrap}>
                <ThemeText variant={'subtitle'}>{item}</ThemeText>
                <ThemeText variant={'muted'}>
                  Example module {index + 1}. This is intentionally placeholder content for
                  scrolling.
                </ThemeText>
              </View>

              <View style={[styles.itemBadge, { backgroundColor: theme.accent }]}>
                <ThemeText variant={'badge'} style={{ color: theme.onAccent }}>
                  {index + 1}
                </ThemeText>
              </View>
            </View>
          </ThemeSurface>
        </Pressable>
      ))}

      <ThemeSurface
        variant={'surface'}
        style={[
          styles.formSection,
          isAndroid && styles.androidPanel,
          { borderColor: theme.border },
        ]}
      >
        <View
          pointerEvents={'none'}
          style={[styles.colorOrb, styles.formOrb, { backgroundColor: theme.tertiary }]}
        />
        <ThemeText variant={'subtitle'}>Form UI Showcase</ThemeText>
        <ThemeText variant={'muted'}>
          Static UI only. Use this section to preview inputs, button styles, and spacing.
        </ThemeText>

        <View style={styles.fieldGroup}>
          <ThemeText variant={'muted'} style={styles.fieldLabel}>
            Project Name
          </ThemeText>
          <TextInput
            value={projectName}
            placeholder={'Project Name'}
            placeholderTextColor={theme.mutedText}
            onChangeText={setProjectName}
            autoCorrect={false}
            autoCapitalize={'none'}
            style={[
              styles.input,
              isAndroid && styles.inputAndroid,
              {
                backgroundColor: theme.mutedSurface,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />
        </View>

        <View style={styles.fieldGroup}>
          <ThemeText variant={'muted'} style={styles.fieldLabel}>
            Owner Email
          </ThemeText>
          <TextInput
            value={ownerEmail}
            placeholder={'Owner Email'}
            placeholderTextColor={theme.mutedText}
            onChangeText={setOwnerEmail}
            autoCorrect={false}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            style={[
              styles.input,
              isAndroid && styles.inputAndroid,
              {
                backgroundColor: theme.mutedSurface,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            onPress={() => {
              setProjectName('');
              setOwnerEmail('');
              setLastAction('cancel');
            }}
            style={({ pressed }) => [
              styles.secondaryButton,
              isAndroid && styles.secondaryButtonAndroid,
              { borderColor: theme.border },
              pressed && styles.pressedButton,
            ]}
          >
            <ThemeText>Cancel</ThemeText>
          </Pressable>
          <Pressable
            onPress={() => setLastAction('create')}
            style={({ pressed }) => [
              styles.primaryButton,
              isAndroid && styles.primaryButtonAndroid,
              { backgroundColor: theme.accent },
              pressed && styles.pressedButton,
            ]}
          >
            <ThemeText style={{ color: theme.onAccent }}>Create</ThemeText>
          </Pressable>
        </View>
        <ThemeText variant={'muted'} style={styles.actionHint}>
          {lastAction === 'none'
            ? 'Try typing and pressing buttons.'
            : lastAction === 'create'
              ? 'Create pressed.'
              : 'Cancel pressed and fields cleared.'}
        </ThemeText>
      </ThemeSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  sectionLabel: {
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  glassProbe: {
    borderWidth: Border.regular,
    borderRadius: Radius.md,
    gap: Spacing.sm,
    padding: Spacing.md,
    overflow: 'hidden',
  },
  probeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  probeBlock: {
    flex: 1,
    height: ControlSize.probe,
    borderRadius: Radius.sm,
  },
  itemCard: {
    borderWidth: Border.regular,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  cardPressable: {
    borderRadius: Radius.md,
    shadowOpacity: 0.08,
    shadowRadius: Spacing.xs,
    shadowOffset: { width: 0, height: 2 },
    elevation: Elevation.low,
  },
  itemRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.md,
  },
  itemTextWrap: {
    flex: 1,
    gap: Spacing.xs,
  },
  itemBadge: {
    alignItems: 'center',
    borderRadius: Radius.pill,
    height: ControlSize.badge,
    justifyContent: 'center',
    width: ControlSize.badge,
  },
  pressedCard: {
    transform: [{ scale: 0.992 }, { translateY: -1 }],
    shadowOpacity: 0.14,
    shadowRadius: Spacing.sm,
    shadowOffset: { width: 0, height: 4 },
    elevation: Elevation.mid,
  },
  formSection: {
    borderWidth: Border.regular,
    borderRadius: Radius.md,
    gap: Spacing.sm,
    padding: Spacing.md,
    overflow: 'hidden',
  },
  fieldGroup: {
    gap: Spacing.xs,
  },
  fieldLabel: {
    fontSize: Spacing.sm,
  },
  input: {
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    minHeight: ControlSize.input,
    fontSize: Spacing.sm + Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: ControlSize.button,
  },
  primaryButton: {
    flex: 1,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: ControlSize.button,
  },
  pill: {
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  pressedButton: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  actionHint: {
    marginTop: Spacing.xs,
  },
  androidPanel: {
    borderWidth: Border.thin,
    elevation: Elevation.low,
  },
  inputAndroid: {
    borderWidth: Border.thin,
  },
  secondaryButtonAndroid: {
    borderWidth: Border.thin,
  },
  primaryButtonAndroid: {
    elevation: Elevation.mid,
  },
  colorStripRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  colorStrip: {
    flex: 1,
    minHeight: ControlSize.button,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorOrb: {
    position: 'absolute',
    opacity: 0.2,
    borderRadius: Radius.pill,
    height: ControlSize.probe + ControlSize.badge,
    width: ControlSize.probe + ControlSize.badge,
  },
  orbTopRight: {
    top: -Spacing.md,
    right: -Spacing.md,
  },
  orbBottomLeft: {
    bottom: -Spacing.md,
    left: -Spacing.md,
  },
  formOrb: {
    top: -Spacing.lg,
    right: Spacing.sm,
  },
});
