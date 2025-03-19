import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { icons } from "@/constants";

type Props = {
    title: string
    showlabel?: string
    multiline: boolean
    rows?: number
    placeholder?: string
    customStyles?: {
        container?: string
        label?: string
        input?: string
    }
} & UseControllerProps

export default function InputField(props: Props) {
    // Manage individual form field
    const {fieldState, field} = useController({...props, defaultValue: ''})
    
    // Secure password text state
    const [showPassword, setShowPassword] = useState(false);

  return (
    <View className='my-1'>
        {props.showlabel=='true' && (
            <Text className="text-base text-grey font-bmedium mt-5 mb-2">{props.title}</Text>
        )}
        <View className={`w-full px-4 bg-tertiary rounded-2xl border-2 flex flex-row ${props.customStyles?.container || 'border-darkgrey'}`}
            style={{ height: props.multiline ? props.rows! * 20 + 30 : 64 }}>
            <TextInput 
                {...props}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                editable
                multiline={props.multiline}
                numberOfLines={props.rows}
                placeholder={props.placeholder ? props.placeholder : props.title}
                secureTextEntry={props.title === "Password" && !showPassword}
                className={`flex-1 font-bsemibold text-base ${props.customStyles?.input || 'text-secondary'}`}
                style={{
                    height: '100%',
                    textAlignVertical: props.multiline ? 'top' : 'center',
                }}
            />

            {props.title === "Password" && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        className="w-6 h-6"
                        resizeMode="contain"
                        style={{
                            height: '100%',
                            alignContent: 'center',
                        }}
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