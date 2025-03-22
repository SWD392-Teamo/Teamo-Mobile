import { useGlobalContext } from "@/providers/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image } from "react-native";
import BackButton from "@/components/BackButton";
import { useShallow } from "zustand/shallow";
import queryString from "query-string";
import { useLoading } from "@/providers/LoadingProvider";
import { useGroupStore } from "@/hooks/useGroupStore";
import { GroupMember } from "@/types";
import { defaultAvatar } from "@/utils/defaultImage";
import { icons } from "@/constants";
import { colors } from "@/constants/colors";
import { useEffect } from "react";
import LeaderAvatar from "@/components/UserAvatar";
import { Link } from "expo-router";


export default function EditGroupMembers() {
  const { showLoading, hideLoading } = useLoading();
  const setSelectedGroupMember = useGroupStore((state) => state.setSelectedGroupMember);
  const { selectedGroup } = useGroupStore(
    useShallow((state) => ({
        selectedGroup: state.selectedGroup
    }))
  );

  useEffect(() => {
    hideLoading();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='w-full flex justify-content-center'>  
            
          {selectedGroup &&
            <View className="m-5 ml-5">
              <View className="flex flex-row justify-content-start mt-2">
                <BackButton url={`(tabs)/groups/details/${selectedGroup.id}`}/>
                <Text className="ml-5 text-bsm font-blight">{selectedGroup.name}</Text>
              </View >
              <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Members</Text>
            </View>
          }

          <View className="m-5 mt-1">
            {selectedGroup?.groupMembers.map((member: GroupMember, index: number) => (
              <Link 
                key={index} 
                className="bg-gray-100 p-4 rounded-lg border-2 border-gray-400 shadow-md m-2"
                href={{
                  pathname: '/(tabs)/groups/details/[id]/EditMemberForm', 
                  params: {id: selectedGroup.id}
                }}
                onPress={() => setSelectedGroupMember(member)}
              >
                <View className="flex flex-row items-center gap-4 w-full">
                  <View key={member.studentId}>
                    {member?.imgUrl ? (
                      <LeaderAvatar imgUrl={member?.imgUrl} />
                    ) : (
                      <LeaderAvatar imgUrl={defaultAvatar} />
                    )}
                  </View>
                  <View className="mb-3">
                    <View className="flex flex-row gap-2">
                      <Text className="text-left text-bsm font-bbold">{member.studentName}</Text>
                      {member?.role === "Leader" && (
                        <Image
                          source={icons.star}
                          resizeMode="contain"
                          className="w-6 h-6"
                          tintColor={colors.light.yellowIcon}
                        />
                      )}
                    </View>
                    <Text className="text-primary font-bregular text-bsm text-left">{member.role}</Text>
                  </View>
                  <Image
                    className="w-7 h-7 ml-auto"
                    source={icons.edit}
                  />
                </View>
              </Link>
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}