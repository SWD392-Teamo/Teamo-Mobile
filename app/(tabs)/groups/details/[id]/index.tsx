import React, { useState } from "react";
import { View, Text, ScrollView, Image, SafeAreaView, Pressable, ToastAndroid, TouchableOpacity } from "react-native";
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
import { Link, useRouter } from "expo-router";
import { useGlobalContext } from "@/providers/AuthProvider";
import { deleteGroup, getGroupById, uploadGroupImage } from "@/actions/groupAction";
import { DocumentPickerResponse } from "@react-native-documents/picker";
import convertDocument from "@/utils/DocumentConverter";
import ConfirmModal from "@/components/ConfirmModal";
import { useLoading } from "@/providers/LoadingProvider";
import ProfileModalForView from "@/components/profile/ProfileModalForView";

const GroupDetail: React.FC = () => {
  const {showLoading, hideLoading} = useLoading();
  const {currentUser} = useGlobalContext();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);
  const { selectedGroup } = useGroupStore(
    useShallow((state) => ({
      selectedGroup: state.selectedGroup,
    }))
  );

  const handleOpenProfile = (memberUserId: number) => {
    setUserId(memberUserId);
    setProfileModalVisible(true);
  };

  const handleCloseProfile = () => {
    setProfileModalVisible(false);
    // Reset userId to null after closing the modal
    setUserId(null);
  };

  // Get group members list and positions list
  const groupMembers = selectedGroup?.groupMembers;
  const groupPositions = selectedGroup?.groupPositions;

  // Check if the current user is the leader
  const isLeader = groupMembers?.some(
    (member: GroupMember) => member.studentId === currentUser?.id && member.role === "Leader"
  );

  const isMember = groupMembers?.some(
    (member: GroupMember) => member.studentId === currentUser?.id && member.role === "Member"
  );

  async function onDelete() {
    try {
      showLoading();
      if(selectedGroup) {
        const res = await deleteGroup(selectedGroup.id);
        if(res.statusCode == 200) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
          router.push('/groups');
        } else {
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
      }       
    } catch (error: any) {
      ToastAndroid.show('Error occured: ' + error.message, ToastAndroid.SHORT);
    } finally {
      hideLoading();
    }
  }

  async function handleImageUpload(image: DocumentPickerResponse) {
    const formData = new FormData();
    
    // Convert to File
    const imageToUpload = convertDocument(image);
  
    // Create formdata payload with image
    formData.append('image', imageToUpload);
    
    const groupId = selectedGroup?.id!;
    
    const res = await uploadGroupImage(groupId, formData);
    
    if (res.statusCode == 200) {
      ToastAndroid.show("Image uploaded successfully!", ToastAndroid.SHORT);
      // Refresh to show new image
      getGroupById(groupId).then(setSelectedGroup);
    } else {
      ToastAndroid.show("Image upload failed!", ToastAndroid.SHORT);
    }
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
          <View className="justify-center items-center mt-2 w-15 h-15 gap-4 my-3">
            {selectedGroup?.imgUrl ? (
              <MedGroupImage 
                imgUrl={selectedGroup?.imgUrl}
                isLeader={isLeader}
                isArchived={selectedGroup.status === 'Archived' ? true : false}
                onImageSelect={handleImageUpload} 
              />
            ) : (
              <MedGroupImage 
                imgUrl={defaultGroup}
                isLeader={isLeader}
                isArchived={selectedGroup?.status === 'Archived' ? true : false}
                onImageSelect={handleImageUpload} 
              />
            )}
          </View>

          {/* Group title and Status */}
          <View className="w-full flex justify-between items-center">
            <View className="my-3">
              <Text className="text-center w-full font-bbold text-primary text-2xl">
                {selectedGroup?.name}
              </Text>
            </View>
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

            {(isLeader || isMember) &&
              <Pressable className="btn btn--primary justify-self-end">  
                <CustomButton
                  title='View Posts'
                  handlePress={() => {
                    router.push(`/(tabs)/groups/details/${selectedGroup?.id}/posts`);
                  }}
                  variant='secondary'
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
            {selectedGroup && selectedGroup.status!=="Archived" && isLeader &&
              <Link 
                href={{
                  pathname: '/(tabs)/groups/details/[id]/EditGroupForm', 
                  params: {id: selectedGroup.id}
                }}
                onPress={() => {}}
              >
                <Image
                  source={icons.edit}
                  className="w-7 h-7"
                />
              </Link>
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
          <View className="flex flex-row justify-between items-center w-full m-5">
            <Text className="font-bsemibold text-2xl text-grey">
              Positions
            </Text>
            {selectedGroup && selectedGroup.status!=="Archived" && isLeader &&
              <Link 
                href={{
                  pathname: '/(tabs)/groups/details/[id]/EditGroupPositions', 
                  params: {id: selectedGroup.id}
                }}
                onPress={() => {}}
              >
                <Image
                  source={icons.edit}
                  className="w-7 h-7"
                />
              </Link>
            }
          </View>
          <View className="container">
            {groupPositions && groupMembers && (
              <GroupPositionCard
                positions={groupPositions}
                members={groupMembers}
                owned={true}
              />
            )}
          </View>

          <Divider />

          {/*Member */}
          <View className="flex flex-row justify-between items-center w-full m-5">
            <Text className="font-bsemibold text-2xl text-grey">
              Members
            </Text>
            {selectedGroup && selectedGroup.status!=="Archived" && isLeader &&
              <Link 
                href={{
                  pathname: '/(tabs)/groups/details/[id]/EditGroupMembers', 
                  params: {id: selectedGroup.id}
                }}
                onPress={() => {}}
              >
                <Image
                  source={icons.edit}
                  className="w-7 h-7"
                />
              </Link>
            }
          </View>
          <View className="container">
            <View className="text-left w-full font-bregular text-lg">
              <View className="grid grid-cols-2 gap-4 mt-4">
                {selectedGroup?.groupMembers.map((member: GroupMember, index: number) => (
                  <TouchableOpacity 
                    onPress={() => handleOpenProfile(member.studentId)}
                    key={index}
                  >
                    <View className="bg-gray-100 p-4 rounded-lg shadow-md">
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
                      <View className="flex flex-row flex-wrap items-center justify-center mt-2 gap-2">
                      {member.positions.map((position) => (
                        <Text 
                          key={position}
                          className="mt-1 px-2 py-1 bg-gray-200 rounded-lg text-grey font-bregular text-sm">{position}</Text>
                      ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {selectedGroup && selectedGroup.status==="Archived" && isLeader &&
          <View className='m-5'>
            <CustomButton
              title='Delete'
              handlePress={() => setConfirmModalVisible(true)}
              variant='delete'
              containerStyles='default'
            />
          </View>
        }
      </ScrollView>
      <ConfirmModal
        isVisible={confirmModalVisible}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${selectedGroup?.name || 'this group'} ?`}
        onConfirm={() => {
          setConfirmModalVisible(false);
          onDelete();
        }}
        onCancel={() => setConfirmModalVisible(false)}
      />
      {userId !== null && (
        <ProfileModalForView
          isVisible={profileModalVisible}
          userId={userId}
          onClose={handleCloseProfile}
        />
      )}
    </SafeAreaView>
  );
};

export default GroupDetail;