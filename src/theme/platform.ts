import { Platform } from 'react-native';

export function isIos26OrLater(): boolean {
  if (Platform.OS !== 'ios') {
    return false;
  }

  if (typeof Platform.Version === 'string') {
    const major = Number.parseInt(Platform.Version.split('.')[0] ?? '0', 10);
    return Number.isFinite(major) && major >= 26;
  }

  return Number(Platform.Version) >= 26;
}
