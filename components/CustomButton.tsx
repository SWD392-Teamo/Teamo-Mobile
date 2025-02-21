import { ActivityIndicator, ColorValue, GestureResponderEvent, Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { colors } from '@/constants/colors';

type Props = {
    title: string;
    handlePress: (event: GestureResponderEvent) => void,
    isLoading?: boolean,
    variant: 'default' | 'primary' | 'primary-outline' | 'secondary' | 'secondary-outline' | 'inactive' | 'active',
    containerStyles: string,
    isNotValid?: boolean,
    icon?: ImageSourcePropType
    iconColor?: ColorValue
    spinnerColor?: ColorValue
}

const textStyles = {
    'default': 'text-lg font-bmedium',
    'primary': 'text-tertiary',
    'primary-outline': 'text-primary',
    'secondary': 'text-tertiary',
    'secondary-outline': 'text-secondary',
    'inactive': 'text-primary',
    'active': 'text-tertiary'
}

const buttonStyles = {
    'default': 'py-1 px-6 min-h-[50px] rounded-full w-full flex-row items-center justify-center',
    'primary': 'bg-primary',
    'primary-outline': 'bg-tertiary border-primary border-2',
    'secondary': 'bg-secondary',
    'secondary-outline': 'bg-tertiary border-secondary border-2',
    'small': 'py-0.5 px-2 min-h-[25px] text-sm border-1',
    'inactive': 'bg-tertiary',
    'active': 'bg-primary'
};

export default function CustomButton(props: Props) {
  return (
    <View>
        <TouchableOpacity
            onPress={props.handlePress}
            activeOpacity={0.7}
            className={`
                ${buttonStyles.default} 
                ${buttonStyles[props.variant]} 
                ${props.containerStyles} 
                ${props.isLoading ? "opacity-50" : ""}`
            }
            disabled={props.isLoading || props.isNotValid}
            >

            <Text className={`
                ${textStyles.default} 
                ${textStyles[props.variant]}
            `}>
                {props.title}
            </Text>

            {props.icon && (
                <Image
                    source={props.icon}
                    resizeMode="contain"
                    className="w-6 h-6 ml-2"
                    tintColor={props.iconColor} />
            )}

            {props.isLoading && (
                <ActivityIndicator
                    animating={props.isLoading}
                    color={props.spinnerColor}
                    size="small"
                    className="ml-2" />
            )}
        </TouchableOpacity>
    </View>
  );
};