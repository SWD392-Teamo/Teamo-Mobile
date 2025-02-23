import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? 'teamo-mobile',
  slug: config.slug ?? 'teamo-mobile',
  version: config.version ?? '1.0.0',
  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
    package: 'com.teamomobile',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  ios: {
    supportsTablet: true,
    googleServicesFile: process.env.GOOGLE_SERVICES_PLIST ?? './GoogleService-Info.plist',
    bundleIdentifier: "com.teamomobile"
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
          modular: true,
          podModules: [
            'FirebaseCore',
            'FirebaseAuth',
            'FirebaseCoreInternal',
            'FirebaseCrashlytics',
            'FirebaseSessions',
            'GoogleUtilities',
            'FirebaseInstallations',
            'GoogleDataTransport',
            'nanopb'
          ]
        },
      },
    ],
  ]
});