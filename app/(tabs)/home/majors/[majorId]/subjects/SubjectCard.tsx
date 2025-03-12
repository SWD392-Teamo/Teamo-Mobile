import { useSubjectStore } from "@/hooks/useSubjectStore";
import { Subject } from "@/types";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface Props{
    subject: Subject
}

export default function SubjectCard({subject} : Props) {
    const router = useRouter()
    const { setSelectedSubject } = useSubjectStore()

    function onSelectedSubject() {
        setSelectedSubject(subject)
        router.push('/(tabs)/home/majors/[majorId]/subjects/[subjectId]/groups');
    }

    return (
        <Pressable onPress={onSelectedSubject}>
            <View className="m-3">
                <View className="w-full border-2 border-primary rounded-lg overflow-hidden">
                    <Image
                        className="w-full h-40" 
                        source={{ uri: subject.imgUrl }}
                        resizeMode="cover"
                    />
                    <View className="px-1 py-2">
                        <Text className="font-bbold text-primary text-bm">{subject.code}</Text>
                        <Text className="font-bregular text-primary text-bm text-wrap">{subject.name}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}