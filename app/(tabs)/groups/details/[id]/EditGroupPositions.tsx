import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image } from "react-native";
import BackButton from "@/components/BackButton";
import { useShallow } from "zustand/shallow";
import { useLoading } from "@/providers/LoadingProvider";
import { useGroupStore } from "@/hooks/useGroupStore";
import PositionStatusBadge from "@/components/groups/PositionStatus";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useEffect } from "react";
import { icons } from "@/constants";


export default function EditGroupPositions() {
  const { showLoading, hideLoading } = useLoading();
  const setSelectedGroupPosition = useGroupStore((state) => state.setSelectedGroupPosition);
  const { selectedGroup } = useGroupStore(
    useShallow((state) => ({
        selectedGroup: state.selectedGroup
    }))
  );

  async function onAddPositionForm() {
    if(selectedGroup) {
      router.push({
      pathname: "/(tabs)/groups/details/[id]/AddPositionForm",
      params: { id: selectedGroup.id }
      });
    }
  }

  useEffect(() => {
    hideLoading();
  }, [])

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
              <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Positions</Text>
            </View>
          }

            <View className="m-5 mt-1">
            {selectedGroup?.groupPositions.map((position) => (
              <Link
                key={position.id}
                href={{
                  pathname: '/(tabs)/groups/details/[id]/EditPositionForm', 
                  params: {id: selectedGroup.id}
                }}
                onPress={() => setSelectedGroupPosition(position)}
                className="my-3 p-5 rounded-lg border-2 border-primary w-full bg-[linear-gradient(to_right,#F2F9FD_10%,#FFFFFF_90%)]"
              >
                <View className="flex flex-row items-center justify-between w-full">
                  <View className="flex flex-col gap-3">
                    <Text className="text-lg font-bsemibold">
                      {position.name}
                      <Text className="font-normal"> ({position.count})</Text>
                    </Text>
                    {/* position status */}
                    {position && (
                      <View>
                        <PositionStatusBadge status={position.status} />
                      </View>
                    )}
                  </View>
                  <Image
                    className="w-7 h-7"
                    source={icons.edit}
                  />
                </View>
              </Link>
            ))}
            </View>
            <View className="items-center m-5">
              <View className='max-w-[500px]'>
                <CustomButton
                  title='Add position'
                  handlePress={() => onAddPositionForm()}
                  variant='active'
                  containerStyles='small'
                />
              </View>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}