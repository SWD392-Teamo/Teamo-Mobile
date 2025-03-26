import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, ToastAndroid } from "react-native";
import BackButton from "@/components/BackButton";
import { useShallow } from "zustand/shallow";
import { useLoading } from "@/providers/LoadingProvider";
import { useGroupStore } from "@/hooks/useGroupStore";
import { defaultAvatar } from "@/utils/defaultImage";
import { icons } from "@/constants";
import { colors } from "@/constants/colors";
import { useEffect, useState } from "react";
import LeaderAvatar from "@/components/UserAvatar";
import CustomButton from "@/components/CustomButton";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import MultiSelectCheckbox from "@/components/MultiSelectCheckbox";
import ConfirmModal from "@/components/ConfirmModal";
import { getGroupById, removeMemberFromGroup, updateMember } from "@/actions/groupAction";
import { router } from "expo-router";
import { useGlobalContext } from "@/providers/AuthProvider";


export default function EditMemberForm() {
  const {showLoading, hideLoading} = useLoading();
  const { currentUser } = useGlobalContext();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);
  const { selectedGroupMember } = useGroupStore(
    useShallow((state) => ({
        selectedGroupMember: state.selectedGroupMember
    }))
  );
  const { selectedGroup } = useGroupStore(
    useShallow((state) => ({
        selectedGroup: state.selectedGroup
    }))
  );

  const {handleSubmit, control, watch, reset,
    formState: {isSubmitting, isValid}} = useForm({
      mode: 'onTouched'
  });

  const groupPositionIds = watch('groupPositionIds', []);

  async function onSave(data: FieldValues) {
    try {
      showLoading();
      if(selectedGroup && selectedGroupMember) {
        const res = await updateMember(selectedGroup.id, selectedGroupMember.studentId, data);
        if(res.error == undefined) {
          const updatedGroup = await getGroupById(selectedGroup.id);
          hideLoading();
          ToastAndroid.show('Updated member successfully', ToastAndroid.SHORT);
          setSelectedGroup(updatedGroup);
          router.push({
            pathname: "/(tabs)/groups/details/[id]/EditGroupMembers",
            params: { id: selectedGroup.id }
          });
        } else if(res.statusCode) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
      }
    } catch (error: any) {
      ToastAndroid.show('Error occured: ' + error.message, ToastAndroid.SHORT);
    } finally {
      hideLoading();
    }
  }

  async function onRemove() {
    try {
      showLoading();
      if(selectedGroup && selectedGroupMember) {
        const res = await removeMemberFromGroup(selectedGroup.id, selectedGroupMember.studentId);
        if(res.statusCode == 200) {
          const updatedGroup = await getGroupById(selectedGroup.id);
          hideLoading();
          ToastAndroid.show('Removed member successfully', ToastAndroid.SHORT);
          setSelectedGroup(updatedGroup);
          router.push({
            pathname: "/(tabs)/groups/details/[id]/EditGroupMembers",
            params: { id: selectedGroup.id }
          });
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

  useEffect(() => {
    if (selectedGroupMember) {
      reset({
        role: selectedGroupMember.role,
        groupPositionIds: selectedGroupMember.positionIds || []
      });
    }
  }, [selectedGroupMember, reset]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='w-full flex justify-content-center'>  
            
          {selectedGroup &&
            <View className="m-5 ml-5">
              <View className="flex flex-row justify-content-start mt-2">
                <BackButton url={`(tabs)/groups/details/${selectedGroup.id}/EditGroupMembers`}/>
                <Text className="ml-5 text-bsm font-blight">Members</Text>
              </View >
              <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Update member</Text>
            </View>
          }

            <View className="m-5 mt-1">
              {selectedGroupMember ? (
                <>
                <View className="w-full bg-white border-2 border-primary p-4 my-2 rounded-lg shadow shadow-primaryLight/10 elevation-2">
                  <View className="">
                    <View className="m-2 items-center">
                      {selectedGroupMember?.imgUrl ? (
                        <LeaderAvatar imgUrl={selectedGroupMember?.imgUrl} />
                      ) : (
                        <LeaderAvatar imgUrl={defaultAvatar} />
                      )}
                      <Text className="text-center text-bsm font-bbold">{selectedGroupMember.studentName}</Text>
                      {selectedGroupMember?.role === "Leader" && (
                        <Image
                          source={icons.star}
                          resizeMode="contain"
                          className="w-6 h-6"
                          tintColor={colors.light.yellowIcon}
                        />
                      )}
                    </View>
                    <View className="m-3 flex flex-1">
                      <Text className="text-primary font-bregular font-bold text-bsm mb-1">Role</Text>
                      <Controller
                        control={control}
                        name="role"
                        defaultValue={selectedGroupMember.role}
                        render={({ field: { onChange, value } }) => (
                          <View className="border-2 border-primaryLight rounded-md overflow-hidden">
                            <Picker
                              selectedValue={value}
                              onValueChange={onChange}
                              style={{ height: 55, width: '100%' }}
                              mode="dropdown"
                            >
                              <Picker.Item label="Member" value="Member" />
                              <Picker.Item label="Leader" value="Leader" />
                            </Picker>
                          </View>
                        )}
                      />
                    </View>

                    {/* Position Selection */}
                    {selectedGroup && selectedGroup.groupPositions && 
                      <View className="flex flex-1 m-3">
                        <Controller
                          control={control}
                          defaultValue={selectedGroupMember.positionIds}
                          name="groupPositionIds"
                          render={({ field: { onChange, value } }) => (
                            <MultiSelectCheckbox
                              label="Positions"
                              options={selectedGroup.groupPositions || []}
                              selectedValues={value}
                              onSelectionChange={onChange}
                              placeholder="Update positions"
                            />
                          )}
                        />
                      </View>
                    }
                  </View>
                </View>

                <View className="flex flex-row items-center justify-center px-4 m-5 gap-4">
                    <View className='w-[120px]'>
                        <CustomButton
                            title='Save'
                            handlePress={handleSubmit(onSave)}
                            isLoading={isSubmitting}
                            isNotValid={!isValid}
                            variant='active'
                            containerStyles='small'
                        />
                    </View>
                    {currentUser && selectedGroupMember.studentId !== currentUser?.id &&
                      <View className='w-[120px]'>
                        <CustomButton
                            title='Remove'
                            handlePress={() => setConfirmModalVisible(true)}
                            variant='delete'
                            containerStyles='small'
                        />
                      </View>
                    } 
                </View>
                </>
              ) : (
                <Text className="text-gray-600 text-center font-bmedium">No member selected</Text>              
              )}
            </View>

        </View>
      </ScrollView>
      {/* Confirmation Modal for Remove action */}
      <ConfirmModal
        isVisible={confirmModalVisible}
        title="Confirm Removal"
        message={`Are you sure you want to remove ${selectedGroupMember?.studentName || 'this member'} from the group?`}
        onConfirm={() => {
          setConfirmModalVisible(false);
          onRemove();
        }}
        onCancel={() => setConfirmModalVisible(false)}
      />
    </SafeAreaView>
  )
}