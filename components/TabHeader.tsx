import { Platform, Text, View } from "react-native";
import LogoutButton from "./LogoutButton";

export default function TabHeader() {
    return(
        <View className="bg-tertiary flex flex-row justify-between align-middle px-5 py-5">
            <Text className = "text-primary font-righteous text-4xl ml-1">Teamo</Text>
        </View>
    )
}
