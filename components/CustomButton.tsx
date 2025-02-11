import { ActivityIndicator, GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";

type Props = {
    title: string;
    handlePress: (event: GestureResponderEvent) => void;
    isLoading?: boolean;
    hasIcon?: false;
    variant: 'primary';
}

const textStyles = {
    'default': 'text-sm font-pmedium',
    'primary': 'text-tertiary',
    'primary-outline': 'text-primary',
    'secondary': 'text-tertiary',
    'secondary-outline': 'text-secondary',
}

const buttonStyles = {
    'default': 'uppercase py-1 px-6 w-max rounded-full text-sm font-pmedium text-tertiary',
    'primary': 'bg-primary',
    'primary-outline': 'bg-tertiary text-primary outline outline-2 outline-primary',
    'secondary': 'bg-secondary',
    'secondary-outline': 'bg-tertiary text-secondary outline outline-2 outline-secondary',
    'icon': 'flex items-center justify-center gap-2',
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
                ${props.hasIcon ? buttonStyles.icon : ""} 
                ${props.isLoading ? "opacity-50" : ""}`
            }
            disabled={props.isLoading}
            >
            <Text className={`
                ${textStyles.default} 
                ${textStyles[props.variant]} 
            `}>
                {props.title}
            </Text>

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