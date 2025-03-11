import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import MemberAvatar from "@/components/groups/MemberAvatar";
import { Group, GroupMember, GroupPosition } from "@/types";
import { useGroupStore } from "@/hooks/useGroupStore";
import { useShallow } from "zustand/shallow";
import PositionStatusBadge from '@/components/groups/PositionStatus';
import { defaultAvatar } from '@/utils/defaultImage';
import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';

const GroupPositionCard: React.FC<{
  positions: GroupPosition[];
  members: GroupMember[];
}> = ({ positions, members }) => {
  const router = useRouter();
  const setSelectedGroupPosition = useGroupStore(state => state.setSelectedGroupPosition);

  return (
    <View className="grid grid-cols-2 gap-6 shadow-md">
      {positions?.map((position) => (
        <View
          key={position.id}
          className="p-5 rounded-lg border-2 border-primary w-full bg-[linear-gradient(to_right,#F2F9FD_10%,#FFFFFF_90%)]"
        >
          <View className="flex flex-col gap-3">
            <Text className="text-lg font-bsemibold">
              {position.name}
              <Text className="font-normal"> ({position.count})</Text>
            </Text>
            {/* position status */}
            {position && (
              <View>
                <PositionStatusBadge status={position?.status} />
              </View>
            )}
          </View>

          <View className="flex justify-between items-center mt-4">
            <View className="flex flex-row items-center gap-5">
              {members
                .filter((member) => member.positions.includes(position.name))
                .map((member, index) => (
                  <View key={index} className="flex flex-col items-center gap-5">
                    {/* Member Avatar */}
                    <View key={member.studentId} className="">
                      {member?.imgUrl ? (
                        <MemberAvatar imgUrl={member?.imgUrl} />
                      ) : (
                        <MemberAvatar imgUrl={defaultAvatar} />
                      )}
                    </View>

                    <View className="flex flex-row items-center gap-1">
                      <Text className="font-bsemibold">{member.studentName}</Text>
                      {member?.role === "Leader" && (
                        <Image
                            source={icons.star}
                            resizeMode="contain"
                            className="w-6 h-6"
                            tintColor={colors.light.yellowIcon}
                        />
                      )}
                    </View>
                  </View>
                ))}
              {Array.from({
                length:
                  position.count -
                  members.filter((member) =>
                    member.positions.includes(position.name)
                  ).length,
              }).map((_, index) => (
                <View
                  key={`default-${index}`}
                  className="flex flex-col items-center gap-5"
                >
                  <View>
                    <MemberAvatar imgUrl={defaultAvatar}/>
                  </View>
                  <View className="flex items-center gap-2">
                    <Text className="font-bsemibold">Teamo</Text>
                  </View>
                </View>
              ))}
            </View>
            <Pressable className="btn btn--primary justify-self-end">  
                <CustomButton
                    title='Easy Apply'
                    handlePress={() => {
                      setSelectedGroupPosition(position);
                      router.push('/(tabs)/home/majors/[majorId]/subjects/[subjectId]/groups/details/[id]/apply');
                    }}
                    variant='primary'
                    containerStyles='w-full mt-5'
                    icon={icons.bolt}
                    iconColor={colors.dark.icon}
                />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default GroupPositionCard;