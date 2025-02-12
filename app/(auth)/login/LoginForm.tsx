import { login } from '@/actions/authActions';
import { useRouter } from 'expo-router';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import InputField from '@/components/InputField';
import { View } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';
import { colors } from '@/constants/colors';

export default function LoginForm() {
  // Next navigation
  const router = useRouter();

  // Set up form state
  const {control, handleSubmit,
        formState: {isSubmitting, isValid}} = useForm({
            mode: 'onTouched'
        });

  // On submit logic
  async function onSubmit(data: FieldValues) {
        try {
            const res = await login(data);

            if(res?.error) {
                throw res.error;
            }

            router.push(`/`)
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
            />
            <CustomButton
                title='Login with'
                handlePress={handleSubmit(onSubmit)}
                variant='primary'
                containerStyles='w-full mt-5'
                isLoading={isSubmitting}
                isNotValid={!isValid}
                icon={icons.google}
                iconColor={colors['dark'].icon}
            />
        </View>
    </View>
  )
}