import { ActivityIndicator, ColorValue, GestureResponderEvent, Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { colors } from '@/constants/colors';

type Props = {
    title: string;
    handlePress: (event: GestureResponderEvent) => void,
    isLoading?: boolean,
    variant: 'default' | 'primary' | 'primary-outline' | 'secondary' | 'secondary-outline',
    containerStyles: string,
    isNotValid?: boolean,
    icon?: ImageSourcePropType
    iconColor?: ColorValue
}

const textStyles = {
    'default': 'text-lg font-pmedium',
    'primary': 'text-tertiary',
    'primary-outline': 'text-primary',
    'secondary': 'text-tertiary',
    'secondary-outline': 'text-secondary',
}

const buttonStyles = {
    'default': 'py-1 px-6 min-h-[50px] rounded-full w-full flex-row items-center justify-center',
    'primary': 'bg-primary',
    'primary-outline': 'bg-tertiary border-primary border-2',
    'secondary': 'bg-secondary',
    'secondary-outline': 'bg-tertiary border-secondary border-2'
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
                color="#fff"
                size="small"
                className="ml-2"
                />
            )}
        </TouchableOpacity>
    </View>
  );
};