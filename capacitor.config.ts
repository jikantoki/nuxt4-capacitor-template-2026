import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.nuxt4capacitortemplate2026',
  appName: 'Nuxt4-Capacitor-Template-2026',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    CapacitorHttp: {
      enabled: true,
    },
  },
  server: {
    androidScheme: 'https',
  },
  android: {
    // useLegacyBridge: true,
  },
}

export default config
