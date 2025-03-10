import { useSubjectStore } from "@/hooks/useSubjectStore";
import { Subject } from "@/types";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

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
                <View className="border-2 border-primary p-5 rounded-lg flex flex-col items-start justify-between text-center transition">
                    <Text className="font-bbold text-primary text-bm">{subject.code}</Text>
                    <Text className="mb-2 font-bregular text-primary text-bm text-wrap">{subject.name}</Text>
                </View>
            </View>
        </Pressable>
    )
}