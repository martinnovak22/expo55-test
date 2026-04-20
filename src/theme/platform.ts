import { Platform } from 'react-native';

// Platform.OS and Platform.Version are stable for the lifetime of the JS
// runtime, so we resolve them once at module load instead of re-deriving
// booleans inside every component render.

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const IS_WEB = Platform.OS === 'web';

function resolveIosMajor(): number {
  if (!IS_IOS) {
    return 0;
  }

  const version = Platform.Version;

  if (typeof version === 'string') {
    const major = Number.parseInt(version.split('.')[0] ?? '0', 10);
    return Number.isFinite(major) ? major : 0;
  }

  return Number(version);
}

export const IOS_MAJOR_VERSION = resolveIosMajor();
export const IS_IOS_26_OR_LATER = IS_IOS && IOS_MAJOR_VERSION >= 26;
export const HAS_NATIVE_BOTTOM_ACCESSORY = IS_IOS_26_OR_LATER;
