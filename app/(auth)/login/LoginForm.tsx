import { googleLogin, login } from '@/actions/authActions';
import { useRouter } from 'expo-router';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import InputField from '@/components/InputField';
import { ToastAndroid, View } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/hooks/useAuthStore';
import { User } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDevice } from '@/actions/deviceAction';
import { getMessaging } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { getAuth, signInWithCredential } from '@react-native-firebase/auth';
import GoogleAuthProvider  from '@react-native-firebase/auth';
import configureGoogleSignIn from '@/lib/configureGoogleSignIn';

export default function LoginForm() {
  // Next navigation
  const router = useRouter();

  // Set up form state
  const {control, handleSubmit,
        formState: {isSubmitting, isValid}} = useForm({
            mode: 'onTouched'
        });

// Set up auth state
const handleGoogleSignIn = async () => {
    try {
        // Configure Google Sign In
        const idToken = await signInWithGoogle();

        if (idToken) {
            // Call your backend endpoint with the token
            const res = await googleLogin(idToken);
            
            // Set authentication status
            await authenticateUser(res);
        }
    } catch (error: any) {
        // More detailed error logging
        console.error('Error Message:', error.message);
    }
};

  // Use auth store to set state
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)
  const setCurrentUser = useAuthStore(state => state.setCurrentUser)

  // Get device tokens
  const getToken = async () => {
    const token = await getMessaging(getApp()).getToken();
    return token;
  }

async function signInWithGoogle() {
    // Configure Google Sign In
    await configureGoogleSignIn();

    // Sign in and get token
    const signInResult = await GoogleSignin.signIn();
    const signInToken = signInResult.data?.idToken ?? null;

    // Get firebase authentication instance
    const auth = getAuth(getApp());

    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.GoogleAuthProvider.credential(signInToken);

    // Sign in to Firebase with the Google credential
    const userCredential = await signInWithCredential(auth, googleCredential);

    // Get the Firebase ID token
    const idToken = await userCredential.user.getIdToken();
    return idToken;
}

async function authenticateUser(res: any) {
    // Check for incorrect email or password
    if (res?.error && res?.error.status == 401) {
        ToastAndroid.show(res.error.message.message, ToastAndroid.SHORT);
        return;
    }

    // Set authentication status to true
    setIsAuthenticated(true);

    // Set current user
    setCurrentUser({
        id: res.userId,
        email: res.email,
        role: res.role
    } as User);

    // Persist token using AsyncStorage
    await AsyncStorage.setItem("authToken", res.token);

    // Add device
    await addDevice(await getToken());

    router.push(`/home`);
}

  // On submit logic
  async function onSubmit(data: FieldValues) {
    try {
        const res = await login(data);

        // Set authentication status
        await authenticateUser(res);
    } catch (error: any) {
        console.log(error.message)
    }
}

  return (
    <View>
        <InputField 
            title='Email' 
            name='email' control={control}
            showlabel='true'
            multiline={false}
            rules={{
                required: 'Email is required',
                pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address'
                }
            }}/>

        <InputField 
            title='Password' 
            name='password' 
            control={control}
            multiline={false}
            showlabel='true'
            rules={{required: 'Password is required'}}/>

        <View className='mt-5'>
            <CustomButton
                title='Submit'
                handlePress={handleSubmit(onSubmit)}
                variant='primary-outline'
                containerStyles='w-full mt-7'
                isLoading={isSubmitting}
                isNotValid={!isValid}
                spinnerColor={colors.light.tint}
            />
            <CustomButton
                title='Login with'
                handlePress={handleGoogleSignIn}
                variant='primary'
                containerStyles='w-full mt-5'
                icon={icons.google}
                iconColor={colors.dark.icon}
            />
        </View>
    </View>
  )
}