import SearchBar from "@/components/SearchBar";
import { Text, View } from "react-native";

export default function OwnedGroupHeader({ setSearch }: { setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <View className="m-2 ml-5">
        <View className="mt-3 mb-3 flex flex-row justify-content-center">
            <Text className="m-2 mr-5 text-bl text-secondary font-bsemibold">Groups</Text>
            <SearchBar 
                setSearch = {setSearch}
            />
        </View>
    </View>
  );
};