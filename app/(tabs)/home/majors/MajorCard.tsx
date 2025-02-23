import { useMajorStore } from "@/hooks/useMajorStore";
import { Major } from "@/types";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface Props{
    major: Major
}

export default function MajorCard({major} : Props) {
    const router = useRouter()
    const { setSelectedMajor } = useMajorStore()

    function onSelectedMajor() {
        setSelectedMajor(major)
        router.push('/home/majors/subjects')
    }

    return (
        <Pressable onPress={onSelectedMajor}>
            <View className="m-3">
                <View className="border-2 border-primary p-5 rounded-lg flex flex-col items-start justify-between text-center transition">
                    <Text className="font-bbold text-primary text-bm">{major.code}</Text>
                    <Text className="mb-2 font-bregular text-primary text-bm text-wrap">{major.name}</Text>
                </View>
            </View>
        </Pressable>
    )
}