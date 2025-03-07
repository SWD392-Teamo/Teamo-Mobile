import { useParamsStore } from "@/hooks/useParamsStore";
import { useSkillStore } from "@/hooks/useSkillStore";
import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import queryString from 'query-string';
import { getSkills } from "@/actions/skillAction";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "@/components/Spinner";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";

export default function EditProfileSkills() {
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>("");

  const {currentUser} = useGlobalContext();

  const { setParams } = useParamsStore();
  const setData = useSkillStore((state) => state.setData);
  
  const params = useParamsStore(
    useShallow((state) => ({
      search: state.search
    }))
  );

  const data = useSkillStore(
    useShallow((state) => state.skills)
  );

  const getUrl = () => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        ...params,
        ...(search.trim() ? { search } : {}),
        studentId: currentUser?.id
      },
    });
  };

  useEffect(() => {
    // Reset when search changes
    setLoading(true);
    
    getSkills(getUrl()).then((response) => {
      setData(response);
      setLoading(false);
    });
  }, [search, params]);

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />
      <ScrollView>
        <View className='w-full flex justify-content-center'>  
          <View className="flex flex-row justify-content-start">
            <BackButton
                url="(tabs)/profile"
            />
            <Text className="ml-5 text-bsm font-blight">Profile</Text>
            
          </View >
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}