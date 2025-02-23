import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function GuideMajor() {
    const router = useRouter()

    function onGuideMajor() {
        router.push('/home/majors');
    }

    return (
        <Pressable onPress={onGuideMajor}>
            <View className="m-5">
                <View className="border-2 border-primary p-5 rounded-lg flex flex-col items-start justify-between text-center transition"
                      style={{ shadowOpacity: 0, elevation: 0 }}
                >
                    <Text className="font-bbold text-primary text-bl">Choose Major</Text>
                    <Text className="mb-2 font-blight text-primary text-bm text-wrap">Start finding the perfect group</Text>
                </View>
            </View>
        </Pressable>
    )
}