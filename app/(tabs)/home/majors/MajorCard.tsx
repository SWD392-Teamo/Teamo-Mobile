import { useMajorStore } from "@/hooks/useMajorStore";
import { Major } from "@/types";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

interface Props{
    major: Major
}

export default function MajorCard({major} : Props) {
    const { setSelectedMajor } = useMajorStore()

    function onSelectedMajor() {
        setSelectedMajor(major)
    }

    return (
      <View className="m-3">
        <Link
            href={{
                pathname: '/(tabs)/home/majors/[majorId]/subjects',
                params: { majorId: major.id },
            }}
            onPress={onSelectedMajor}
        >
          <View className="w-full border-2 border-primary rounded-lg overflow-hidden">
            <Image
                className="w-full h-40" 
                source={{ uri: major.imgUrl }}
                resizeMode="cover"
            />
            <View className="px-1 py-2">
                <Text className="font-bbold text-primary text-bm">{major.code}</Text>
                <Text className="font-bregular text-primary text-bm text-wrap">{major.name}</Text>
            </View>
          </View>
        </Link>
    </View>
    )
}