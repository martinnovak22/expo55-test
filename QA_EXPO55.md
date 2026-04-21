# Expo SDK 55 QA Script And Evidence

## Scope
- App: `expo55-test`
- Goal: reproducible validation of Expo SDK 55 showcase capabilities
- Evidence rule: each check requires `before` and `after` screenshot references

## Run Setup
1. Start app with clean cache: `npx expo start -c`
2. Run on iOS Simulator and Android Emulator (latest available)
3. Use this file as the single source of truth for pass/fail and evidence

## Fast Workflow (Simple)
1. Run automatable QA checks:
   - `yarn qa`
2. Capture evidence (auto file naming):
   - iOS: `yarn qa:capture:ios --check=05 --state=before`
   - iOS: `yarn qa:capture:ios --check=05 --state=after`
   - Android: `yarn qa:capture:android --check=02 --state=before`
   - Android: `yarn qa:capture:android --check=02 --state=after`
3. Optional custom date folder:
   - `yarn qa:capture:ios --check=05 --state=before --date=2026-04-21`
4. Copy generated file paths from command output into the table below and mark Pass/Fail.

## What Each Command Does
- `yarn qa`
  - Runs `yarn check` (Biome format validation, no file writes)
  - Runs `yarn typecheck` (`tsc --noEmit`)
- `yarn qa:capture:ios --check=NN --state=before|after [--date=YYYY-MM-DD]`
  - Captures screenshot from currently booted iOS simulator
  - Saves to `qa-evidence/<date>/check-NN-ios-before|after.png`
- `yarn qa:capture:android --check=NN --state=before|after [--date=YYYY-MM-DD]`
  - Captures screenshot from connected Android emulator/device (`adb`)
  - Saves to `qa-evidence/<date>/check-NN-android-before|after.png`

## Evidence Naming
- Suggested folder: `./qa-evidence/2026-04-21/`
- Suggested pattern:
  - `check-01-ios-before.png`
  - `check-01-ios-after.png`
  - `check-01-android-before.png`
  - `check-01-android-after.png`

## Results Matrix
| Check | Capability | Platform | Steps | Expected Result | Pass/Fail | Before Screenshot | After Screenshot | Notes |
|---|---|---|---|---|---|---|---|---|
| 01 | Native tabs labels/icons active state | iOS + Android | Switch across all tabs and return to Diagnostics | Active tab icon/label state updates correctly; inactive tabs remain legible | ⬜ |  |  |  |
| 02 | Android tab label visibility mode (`labeled`) | Android | Open all tabs, verify labels remain visible including selected tab | Selected and unselected labels are visible and readable | ⬜ |  |  |  |
| 03 | Android selected icon contrast | Android | Select each tab and inspect icon contrast | Selected tab icon remains clearly visible (white/onAccent) | ⬜ |  |  |  |
| 04 | iOS search role tab behavior | iOS | Open `Search` tab (`role="search"`), then back to other tabs | Search tab behavior remains native and stable with navigation | ⬜ |  |  |  |
| 05 | iOS tab bar scroll-edge transparency toggle | iOS | In Diagnostics, toggle `Disable transparent scroll edge` off/on while near bottom | Visual delta appears in tab bar transparency behavior | PASS | qa-evidence/2026-04-21/check-05-ios-before.png | qa-evidence/2026-04-21/check-05-ios-after.png | Visible delta confirmed |
| 06 | Scroll Edge Visual Probe visibility gate | iOS + Android | Open Diagnostics on both platforms | Probe card appears only on iOS and is absent on Android | ⬜ |  |  |  |
| 07 | Platform probe availability messaging | iOS + Android | Inspect `Android Material You` and `iOS Tab Bar Scroll Edge` cards | Unsupported platform shows `unavailable` chip and dimmed toggle area | ⬜ |  |  |  |
| 08 | Dynamic color toggle behavior | Android | Toggle `Use dynamic color roles` on/off and inspect theme tokens | Theme palette changes between Material dynamic and fallback roles | ⬜ |  |  |  |
| 09 | Environment details correctness | iOS + Android | Verify Diagnostics `Environment Details` rows | Platform-only rows show `not applicable` on unsupported platform | ⬜ |  |  |  |
| 10 | Shared activity filter state | iOS + Android | Change filter via activity accessory/chips, switch tabs, return | Filter state is preserved across tabs | ⬜ |  |  |  |
| 11 | Shared search query state | iOS + Android | Enter search query in Search tab, switch to Activity and back | Query and filtered results stay synchronized | ⬜ |  |  |  |
| 12 | Status bar + header stability | iOS + Android | Navigate between Overview/Activity/Search/Diagnostics repeatedly | No visual regressions from status bar/header integration | ⬜ |  |  |  |

## Summary
- Total checks: `12`
- Passed: ``
- Failed: ``
- Blocked: ``

## Findings
- Add defects or behavior notes here with check id references.
- Example: `Check 05 (iOS): transparency delta too subtle on light background.`

## Session Log
- `Study - Expo v55 - reproducible QA checklist and evidence`
