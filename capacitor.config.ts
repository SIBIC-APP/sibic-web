import type { CapacitorConfig } from '@capacitor/cli';

const serverUrl = process.env.CAPACITOR_SERVER_URL;

const config: CapacitorConfig = {
  appId: 'com.sibic.app',
  appName: 'SIBIC',
  webDir: 'public',
  server: serverUrl
    ? {
        url: serverUrl,
        cleartext: true,
      }
    : undefined,
  android: {
    allowMixedContent: true,
  },
};

export default config;
