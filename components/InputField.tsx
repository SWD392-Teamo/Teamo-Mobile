import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { icons } from "@/constants";

type Props = {
    title: string
    showlabel?: string
} & UseControllerProps

export default function InputField(props: Props) {
    // Manage individual form field
    const {fieldState, field} = useController({...props, defaultValue: ''})
    
    // Secure password text state
    const [showPassword, setShowPassword] = useState(false);

  return (
    <View className='space-y-2'>
        {props.showlabel=='true' && (
            <Text className="text-base text-grey font-pmedium mt-5">{props.title}</Text>
        )}
        <View className='w-full h-16 px-4 bg-tertiary rounded-2xl border-2 border-darkgrey flex flex-row items-center'>
            <TextInput 
                {...props}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder={props.title}
                secureTextEntry={props.title === "Password" && !showPassword}
                className='flex-1 text-secondary font-psemibold text-base'
            />

            {props.title === "Password" && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        className="w-6 h-6"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </View>
        {fieldState.error?.message && (
            <Text className='text-red-500 mt-2'>{fieldState.error?.message}</Text>
        )}
    </View>
  )
}