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

      // Handle foreground messages
      const unsubscribeForeground = messaging.onMessage(async remoteMessage => {
        console.log('Received foreground message:', remoteMessage);
        // Handle foreground notification here (e.g., show an in-app notification)
      });

      // Handle background messages
      messaging.setBackgroundMessageHandler(async remoteMessage => {
        console.log('Received background message:', remoteMessage);
        // Handle background notification here
      });

      // Handle notification open events
      messaging.onNotificationOpenedApp(remoteMessage => {
        console.log('Notification opened app:', remoteMessage);
        // Navigate to appropriate screen based on notification
      });

      // Check if app was opened from a notification
      messaging
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log('App opened from quit state:', remoteMessage);
            // Handle initial notification (e.g., navigate to specific screen)
          }
        });

      // Return unsubscribe function for cleanup
      return unsubscribeForeground; 
    } else {
      console.log('Permission not granted.');
      return null;
    }
  } catch (error) {
    console.error('Failed to request permission:', error);
    return null;
  }
}
