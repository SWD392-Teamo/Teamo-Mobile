import { getMessaging, requestPermission, AuthorizationStatus } from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";

export default async function requestUserPermissionAndListen() {
  try {
    const messaging = getMessaging(getApp());
    const authStatus = await requestPermission(messaging);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);

      // Create an array to store all unsubscribe functions
      const unsubscribeFunctions: (() => void)[] = [];

      // Handle foreground messages
      const unsubscribeForeground = messaging.onMessage(async remoteMessage => {
        console.log('Received foreground message:', remoteMessage);
        // Handle foreground notification here (e.g., show an in-app notification)
      });

      unsubscribeFunctions.push(unsubscribeForeground);

      // Handle background messages
      messaging.setBackgroundMessageHandler(async remoteMessage => {
        console.log('Received background message:', remoteMessage);
        // Handle background notification here
      });

      // Handle notification open events
      const unsubscribeOpenedApp = messaging.onNotificationOpenedApp(remoteMessage => {
        console.log('Notification opened app:', remoteMessage);
        // Navigate to appropriate screen based on notification
      });

      unsubscribeFunctions.push(unsubscribeOpenedApp);

      // Return a function that will unsubscribe from all listeners
      return () => {
        unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
      };
    }
     // Return empty cleanup function if not enabled
    return () => {};
  } catch (error) {
    console.error('Failed to request permission:', error);
    return null;
  }
}
