# Expo SDK 55 Native Router + Dynamic Color Demo

This project is an Expo SDK 55 TypeScript app focused on two Expo Router v55 capabilities:

- Native tabs router behavior with iOS 26+ glass accessory support.
- Dynamic platform color loading (Android Material dynamic + iOS system colors).

## Tech setup

- Expo SDK `~55.0.15`
- Expo Router `~55.0.12`
- TypeScript strict mode
- Yarn (node-modules linker)
- ESLint for RN/Expo linting
- Biome for formatting

## Run

Install dependencies:

```bash
yarn install
```

Start Metro:

```bash
yarn start
```

Run iOS development build:

```bash
yarn ios
```

Run Android development build:

```bash
yarn android
```

## Code quality commands

```bash
yarn lint
yarn format
yarn tsc --noEmit
```

## App structure

- `src/app/_layout.tsx` root stack layout
- `src/app/(tabs)/_layout.tsx` native tabs layout
- `src/app/(tabs)/index.tsx` home showcase
- `src/app/(tabs)/palette.tsx` platform palette showcase
- `src/app/(tabs)/settings.tsx` diagnostics and manual test steps
- `src/theme/use-app-theme.ts` dynamic color resolution + theme rerender hook

## Manual test checklist

1. Navigation
- Switch tabs and verify selected icon/label state updates.
- Confirm Home, Palette, and Settings routes render correctly.

2. Android dynamic color
- Toggle device light/dark mode.
- Confirm palette and surfaces update without app restart.

3. iOS native tabs glass behavior
- On iOS 26+, confirm bottom accessory is visible.
- On lower iOS versions, confirm fallback behavior without runtime errors.

4. Stability
- Verify safe area spacing in all tabs.
- Verify no redbox errors at runtime.

## References

- Expo Router v55 blog: https://expo.dev/blog/expo-router-v55-more-native-navigation-more-powerful-web
- Native tabs docs: https://docs.expo.dev/router/advanced/native-tabs/
- Color API docs: https://docs.expo.dev/router/reference/color/
