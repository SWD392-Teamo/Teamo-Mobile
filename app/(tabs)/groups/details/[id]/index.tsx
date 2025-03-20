import React from "react";
import { View, Text, ScrollView, Image, SafeAreaView, Pressable } from "react-native";
import BackButton from "@/components/BackButton";
import DateConverter from "@/components/DateConvert";
import GroupStatusBadge from "@/components/groups/GroupStatus";
import MedGroupImage from "@/components/groups/MedGroupImage";
import MemberAvatar from "@/components/groups/MemberAvatar";
import { useGroupStore } from "@/hooks/useGroupStore";
import { useShallow } from "zustand/shallow";
import GroupPositionCard from "@/components/groups/GroupPosition";
import { defaultAvatar, defaultGroup } from "@/utils/defaultImage";
import { icons } from "@/constants";
import { GroupMember } from "@/types";
import { colors } from "@/constants/colors";
import Divider from "@/components/Divider";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/providers/AuthProvider";

const GroupDetail: React.FC = () => {
  const {currentUser} = useGlobalContext();
  const router = useRouter()
  const { selectedGroup } = useGroupStore(
    useShallow((state) => ({
      selectedGroup: state.selectedGroup,
    }))
  );

  // Get group members list and positions list
  const groupMembers = selectedGroup?.groupMembers;
  const groupPositions = selectedGroup?.groupPositions;

  // Check if the current user is the leader
  const isLeader = groupMembers?.some(
    (member: GroupMember) => member.studentId === currentUser?.id && member.role === "Leader"
  );

  function onEditGroup() {
    router.push('/');
  }

  function onEditPositions() {
    router.push('/');
  }

  function onEditMembers() {
    router.push('/');
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Header */}
        <View className="m-2 ml-5">
            <View className="flex flex-row justify-content-start">
              <BackButton url={`groups`} />
              <Text className="ml-5 text-bsm font-blight">{selectedGroup?.name}</Text>
            </View >
        </View>

        {/* Group Image */}
        <View className="rounded-lg flex flex-col items-center px-3 transition flex-1 mb-16">
          <View className="flex flex-col items-center mt-2 w-15 h-15 gap-4 my-3">
            {selectedGroup?.imgUrl ? (
              <MedGroupImage imgUrl={selectedGroup?.imgUrl} />
            ) : (
              <MedGroupImage imgUrl={defaultGroup} />
            )}
            <Text className="text-center w-full font-bbold text-primary text-2xl my-2">
              {selectedGroup?.name}
            </Text>
          </View>

          {/* Group title and Status */}
          <View className="w-full flex justify-between items-center">
            <View className="flex flex-col gap-2 items-center">
              <Text className="text-2xl font-bbold text-secondary">
                {selectedGroup?.title}
              </Text>
              {selectedGroup?.status && (
                <GroupStatusBadge status={selectedGroup?.status} />
              )}
            </View>

            <Text className="font-bsemibold text-lg text-grey mt-2">
              {selectedGroup?.createdAt && (
                <DateConverter isoDate={selectedGroup?.createdAt} />
              )}
            </Text>

            {isLeader && 
              <Pressable className="btn btn--primary justify-self-end">  
                <CustomButton
                  title='View Applications'
                  handlePress={() => {
                    router.push(`/(tabs)/groups/details/${selectedGroup?.id}/applications`);
                  }}
                  variant='primary'
                  containerStyles='w-full mt-5'
                  icon={icons.application}
                  iconColor={colors.dark.icon}
                />
              </Pressable>
            }
          </View>

          <Divider />

          {/* Information */}
          <View className="flex flex-row justify-between items-center w-full m-5">
            <Text className="font-bsemibold text-2xl text-grey">
                  Information
            </Text>
            {isLeader &&
              <Pressable 
                className="mr-3"
                onPress={onEditGroup}
              >
                <Image
                  source={icons.edit}
                  className="w-7 h-7"
                />
              </Pressable>
            }
          </View>

          <View className="w-full flex flex-col items-start">
            {/* Semester name */}
            <Text className="text-left w-full font-normal text-lg font-bbold text-primary mt-1">
              {selectedGroup?.semesterName}
            </Text>

            {/*Field name */}
            <View className="mt-4 flex flex-row justify-start gap-2 items-start">
              <Text className="font-bsemibold text-xl">Field:</Text>
              <Text className="font-bregular text-lg">{selectedGroup?.fieldName}</Text>
            </View>

            {/*Max member */}
            <View className="mt-2 flex flex-row justify-start gap-2 items-center">
              <Text className="font-bsemibold text-xl">Max member:</Text>
              <Text className="font-bregular text-lg">{selectedGroup?.maxMember}</Text>
            </View>

            {/*Total member */}
            <View className="mt-2 flex flex-row justify-start gap-2 items-center">
              <Text className="font-bsemibold text-xl">Total member:</Text>
              <Text className="font-bregular text-lg">{selectedGroup?.totalMembers}</Text>
            </View>
          </View>

          <Divider />

          {/*description */}
          <View className="container mt-5">
            <Text className="text-left w-full font-bsemibold text-2xl text-grey my-5">
              Description
            </Text>

            <Text className="text-left w-full font-bregular text-lg">
              {selectedGroup?.description}
            </Text>
          </View>

          <Divider />

          {/*position */}
          <View className="container">
            <View className="flex flex-row justify-between items-center w-full m-5">
              <Text className="text-left w-full font-bsemibold text-2xl text-grey">
                Position
              </Text>
              {isLeader &&
                <Pressable 
                className="mr-5"
                onPress={onEditPositions}
                style={{ position: "absolute", right: 10, top: 0 }}
              >
                <Image
                  source={icons.edit}
                  className="w-7 h-7"
                />
              </Pressable>
              }
            </View>
            {groupPositions && groupMembers && (
              <GroupPositionCard
                positions={groupPositions}
                members={groupMembers}
                owned={true}
              />
            )}
          </View>

          <View className="w-full h-[1px] bg-gray-300 my-8"></View>
          <View className="container">
            <View className="flex flex-row justify-between items-center w-full m-5">
              <Text className="text-left w-full font-bsemibold text-2xl text-grey">
                Member
              </Text>
              {isLeader &&
                <Pressable 
                className="mr-5"
                onPress={onEditMembers}
                style={{ position: "absolute", right: 10, top: 0 }}
              >
                <Image
                  source={icons.edit}
                  className="w-7 h-7"
                />
              </Pressable>
              }
            </View>
            
            {/*Member */}
            <View className="text-left w-full font-bregular text-lg">
              <View className="grid grid-cols-2 gap-4 mt-4">
                {selectedGroup?.groupMembers.map((member: GroupMember, index: number) => (
                  <View key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <View className="flex items-center gap-4">
                      <View key={member.studentId}>
                        {member?.imgUrl ? (
                          <MemberAvatar imgUrl={member?.imgUrl} />
                        ) : (
                          <MemberAvatar imgUrl={defaultAvatar} />
                        )}
                      </View>
                      <View className="mb-3">
                        <View className="flex flex-row items-center gap-2">
                          <Text className="font-bbold">{member.studentName}</Text>
                          {member?.role === "Leader" && (
                            <Image
                                  source={icons.star}
                                  resizeMode="contain"
                                  className="w-6 h-6"
                                  tintColor={colors.light.yellowIcon}
                              />
                          )}
                        </View>
                        <Text className="text-primary text-sm text-center">{member.role}</Text>
                      </View>
                    </View>
                    <Text className="mt-2 text-grey font-bregular text-center">{member.positions}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupDetail;