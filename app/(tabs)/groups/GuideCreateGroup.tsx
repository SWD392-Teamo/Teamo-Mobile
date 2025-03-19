import { icons } from "@/constants";
import { colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function GuideCreateGroup() {
    const router = useRouter()

    function onGuideCreategroup() {
        router.push('/groups/SelectSubjectForCreateGroup');
    }

    return (
        <Pressable onPress={onGuideCreategroup}>
            <View className="m-3">
                <View className="border-2 border-primaryLight p-3 rounded-lg flex flex-row items-center justify-between text-center transition"
                    style={{ shadowOpacity: 0, elevation: 0 }}
                >
                    <View>
                      <Text className="font-bold font-bmedium text-primary text-bm">Create new group</Text>
                      <Text className="mb-2 font-blight text-primary text-bsm text-wrap">Start your own team!</Text>
                    </View>
                    <View className="ml-auto"><Image
                      source={icons.plusCircle}
                      className="w-8 h-8"
                      tintColor={colors.light.tint}
                    /></View>
                </View>
            </View>
        </Pressable>
    )
}