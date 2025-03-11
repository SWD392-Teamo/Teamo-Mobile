import LeaderAvatar from "@/components/UserAvatar";
import GroupStatusBadge from "@/components/groups/GroupStatus";
import MemberAvatar from "@/components/groups/MemberAvatar";
import SmallGroupImage from "@/components/groups/SmallGroupImage";
import { useGroupStore } from "@/hooks/useGroupStore";
import { useMajorStore } from "@/hooks/useMajorStore";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { Group } from "@/types";
import { defaultAvatar, defaultGroup } from "@/utils/defaultImage";
import { Text, View } from "react-native";
import { useShallow } from "zustand/shallow";
import PositionCard from "./PositionCard";
import { Link } from "expo-router";
import Divider from "@/components/Divider";

const GroupCard: React.FC<{ group: Group }> = ({ group }) => {
  const { selectedMajor } = useMajorStore(
    useShallow((state) => ({
      selectedMajor: state.selectedMajor,
    }))
  );

  const { selectedSubject } = useSubjectStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject,
    }))
  );

  const link = `/${selectedMajor?.code}/${selectedSubject?.code}/groups/details/${group.id}`;
  const { setSelectedGroup } = useGroupStore();

  const handleDetailsClick = () => {
    setSelectedGroup(group);
  };

  const leader = group.groupMembers.find((member) => member.role === "Leader");
  const groupMember = group.groupMembers.filter(
    (member) => member.role === "Member"
  );
  const groupPositions = group.groupPositions;

  return (
    <View className="w-full border-2 border-primary p-5 rounded-lg flex flex-row items-start justify-between text-center transition">
      <Link href={{
          pathname: '/(tabs)/home/majors/[majorId]/subjects/[subjectId]/groups/details/[id]',
          params: {majorId: selectedMajor?.id!, subjectId: selectedSubject?.id!, id: group.id}}}
          onPress={handleDetailsClick}
      >  
        <View className="flex flex-col">
          {/* Group logo and name */}
          <View className="flex flex-row items-center gap-4 mb-3">
            {group?.imgUrl ? (
              <View>
                <SmallGroupImage imgUrl={group?.imgUrl} />
              </View>
            ) : (
              <View>
                <SmallGroupImage imgUrl={defaultGroup} />
              </View>
            )}
            <Text className="text-left w-full font-bbold text-primary text-xl my-2">
              {group?.name}
            </Text>
          </View>

          <Divider />

          {/* Group title and status */}
          <View className="flex flex-row gap-4 items-center">
            <Text className="text-lg font-bbold text-black">{group?.title}</Text>
            {group?.status && <GroupStatusBadge status={group?.status} />}
          </View>

          {/* Group leader */}
          <View className="flex flex-row items-center space-x-2">
            <Text className="font-bregular text-grey me-2">Leader:</Text>
            <Text className="text-md font-bsemibold text-black font-beVietnam">
              {leader?.studentName}
            </Text>
          </View>

          {/* Group leader and member avatars */}
          <View className="flex flex-row items-center gap-4 mt-4 mb-3">
            <View className='flex flex-col'>
              {leader?.imgUrl ? (
                <LeaderAvatar imgUrl={leader?.imgUrl} />
              ) : (
                <LeaderAvatar imgUrl={defaultAvatar} />
              )}
              <Text className="text-sm font-bmedium text-primary text-center">{leader?.studentName}</Text>
            </View>

            {groupMember.map((member) => (
              <View key={member.studentId} className="items-center">
                <View className="flex flex-col items-center">
                  {member?.imgUrl ? (
                    <MemberAvatar imgUrl={member?.imgUrl} />
                  ) : (
                    <MemberAvatar imgUrl={defaultAvatar} />
                  )}
                  <Text className="text-xs font-blight text-grey text-center">
                    {member?.studentName}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Group positions */}
          <View className="flex flex-row flex-wrap gap-2 mt-5 max-w-[450px]">
            {groupPositions.map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </View>
        </View>
      </Link>
    </View>
  );
};

export default GroupCard;
