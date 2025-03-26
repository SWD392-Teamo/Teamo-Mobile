import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default async function configureGoogleSignIn() {
    // Configure Google Sign In
    GoogleSignin.configure({
        offlineAccess: true,
        webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    });

    // Sign in with Google and get idToken
    await GoogleSignin.hasPlayServices();
}