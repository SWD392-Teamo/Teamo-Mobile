import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import { Major, Subject } from "@/types";
import { View, Text } from "react-native";

export default function GroupHeader({ major, subject, setSearch }: { major: Major; subject: Subject; setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <View className="m-2 ml-5">
        <View className="flex flex-row justify-content-start">
          <BackButton url={`home/majors/${major.id}/subjects`} />
          <Text className="ml-5 text-bsm font-blight">{subject.code} - {subject.name}</Text>
        </View >
        <View className="mt-3 mb-3 flex flex-row justify-content-center">
            <Text className="m-2 mr-5 text-bl text-secondary font-bsemibold">Groups</Text>
            <SearchBar 
                setSearch = {setSearch}
            />
        </View>
    </View>
  );
};