import { useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import {SafeAreaView, ScrollView } from 'react-native'
import LoginForm from './LoginForm';
import Title from '@/components/Title';
import BackButton from '@/components/BackButton';
import { useGlobalContext } from '@/providers/AuthProvider';

export default function Login() {
  const router = useRouter();
  
  const { isAuthenticated } = useGlobalContext();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, router]);

  return (
    <SafeAreaView className="bg-tertiary h-full p-4 flex flex-row items-center">
      <ScrollView>
        <BackButton url='/' />
        <Title title='Login' />
        <LoginForm />
      </ScrollView>
    </SafeAreaView>
  )
}
