import { Platform, Text, View } from "react-native";
import LogoutButton from "./LogoutButton";

export default function TabHeader() {
    return(
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingTop: Platform.OS === 'ios' ? 50 : 30, // Adjust for iOS notch
                paddingBottom: 20,
                backgroundColor: 'white'
            }}
        >
            <Text className = "text-primary font-righteous text-4xl ml-1">Teamo</Text>
            <LogoutButton />
        </View>
    )
}
