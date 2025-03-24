import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, ToastAndroid } from "react-native";
import BackButton from "@/components/BackButton";
import { useShallow } from "zustand/shallow";
import queryString from "query-string";
import { useLoading } from "@/providers/LoadingProvider";
import { useGroupStore } from "@/hooks/useGroupStore";
import { useCallback, useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Controller, FieldValues, useForm } from "react-hook-form";
import MultiSelectCheckbox from "@/components/MultiSelectCheckbox";
import ConfirmModal from "@/components/ConfirmModal";
import { deleteGroupPosition, getGroupById, updateGroupPosition } from "@/actions/groupAction";
import { router } from "expo-router";
import InputField from "@/components/InputField";
import NumberPicker from "@/components/NumberPicker";
import { useSkillStore } from "@/hooks/useSkillStore";
import { getSkills } from "@/actions/skillAction";
import { Picker } from "@react-native-picker/picker";


export default function EditPositionForm() {
  const { showLoading, hideLoading } = useLoading();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);
  const { selectedGroupPosition } = useGroupStore(
    useShallow((state) => ({
        selectedGroupPosition: state.selectedGroupPosition
    }))
  );
  const { selectedGroup } = useGroupStore(
    useShallow((state) => ({
        selectedGroup: state.selectedGroup
    }))
  );
  const setSkillOptions = useSkillStore((state) => state.setData);
  const { skillOptions } = useSkillStore(
    useShallow((state) => ({
      skillOptions: state.skills
    }))
  )

  const {handleSubmit, control, watch, reset,
    formState: {isSubmitting, isValid}} = useForm({
      mode: 'onTouched'
  });

  //Get skill ids from selectedGroupPosition (if any)
  const posSkillIds = selectedGroupPosition?.skills.map((skill) => {
    return skill.id;
  })

  const skillIds = watch('skillIds', []);

  async function onSave(data: FieldValues) {
    try {
      showLoading();
      if(selectedGroup && selectedGroupPosition) {
        const res = await updateGroupPosition(selectedGroup.id, selectedGroupPosition.id, data);
        if(res.error == undefined) {
          const updatedGroup = await getGroupById(selectedGroup.id);
          hideLoading();
          ToastAndroid.show('Updated position successfully.', ToastAndroid.SHORT);
          setSelectedGroup(updatedGroup);
          router.push({
            pathname: "/(tabs)/groups/details/[id]/EditGroupPositions",
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

  async function onDelete() {
    try {
      showLoading();
      if(selectedGroup && selectedGroupPosition) {
        const res = await deleteGroupPosition(selectedGroup.id, selectedGroupPosition.id);
        if(res.statusCode == 200)  {
          const updatedGroup = await getGroupById(selectedGroup.id);
          hideLoading();
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
          setSelectedGroup(updatedGroup);
          router.push({
            pathname: "/(tabs)/groups/details/[id]/EditGroupPositions",
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

  const getSkillsUrl = useCallback(() => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        ...{ isPaginated: false }
      },
    });
  }, []);
        
  useEffect(() => {
    showLoading();
    getSkills(getSkillsUrl()).then((response) => {
      setSkillOptions(response);
      hideLoading();
    });
  }, [getSkillsUrl, setSkillOptions]);

  useEffect(() => {
    if (selectedGroupPosition) {
      reset({
        name: selectedGroupPosition.name,
        count: selectedGroupPosition.count,
        skillIds: posSkillIds || [],
        status: selectedGroupPosition.status
      });
    }
  }, [selectedGroupPosition, reset]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='w-full flex justify-content-center'>  
            
          {selectedGroup &&
            <View className="m-5 ml-5">
              <View className="flex flex-row justify-content-start mt-2">
                <BackButton url={`(tabs)/groups/details/${selectedGroup.id}/EditGroupPositions`}/>
                <Text className="ml-5 text-bsm font-blight">Positions</Text>
              </View >
              <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Update position</Text>
            </View>
          }

            <View className="m-5 mt-1">
              {selectedGroupPosition ? (
                <>
                <View className="w-full bg-white border-2 border-primary p-4 my-2 rounded-lg shadow shadow-primaryLight/10 elevation-2">
                  <Text className="text-primary font-bregular font-bold text-bsm mb-1">Name</Text>
                  <InputField 
                    title='Name' 
                    name='name'
                    control={control}
                    multiline={false}
                    showlabel='false'
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      validate: (value) => value.trim() !== "" || "Invalid position name.",
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Invalid position name.",
                      }
                    }}
                  />
      
                  <View className="mt-3">
                    <Text className="text-primary font-bregular font-bold text-bsm mb-1">Count</Text>
                    <NumberPicker 
                      control={control}
                      name='count'
                      title="Count"
                      showlabel={false}
                      requiredInput={false}
                      defaultValue={selectedGroupPosition.count}
                    />
                  </View>

                  <View className="mt-3">
                  <Controller
                    control={control}
                    name='skillIds'
                    render={({ field: { onChange, value } }) => (
                      <MultiSelectCheckbox
                        label="Skills"
                        options={skillOptions || []}
                        selectedValues={value}
                        onSelectionChange={onChange}
                        placeholder="Select skills"
                      />
                    )}
                  />
                  </View>

                  <View className="mt-3">
                    <Text className="text-primary font-bregular text-bsm mb-1">Status</Text>
                    <Controller
                      control={control}
                      name="status"
                      render={({ field: { onChange, value } }) => (
                        <View className="border-2 border-primaryLight rounded-md overflow-hidden">
                          <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            style={{ height: 55, width: '100%' }}
                            mode="dropdown"
                          >
                            <Picker.Item label="Open" value="Open" />
                            <Picker.Item label="Close" value="Closed" />
                          </Picker>
                        </View>
                      )}
                    />
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
                    {selectedGroupPosition &&
                      <View className='w-[120px]'>
                        <CustomButton
                            title='Delete'
                            handlePress={() => setConfirmModalVisible(true)}
                            variant='delete'
                            containerStyles='small'
                        />
                      </View>
                    } 
                </View>
                </>
              ) : (
                <Text className="text-gray-600 text-center font-bmedium">No position selected</Text>              
              )}
            </View>

        </View>
      </ScrollView>
      {/* Confirmation Modal for Remove action */}
      <ConfirmModal
        isVisible={confirmModalVisible}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${selectedGroupPosition?.name || 'this position'} ?`}
        onConfirm={() => {
          setConfirmModalVisible(false);
          onDelete();
        }}
        onCancel={() => setConfirmModalVisible(false)}
      />
    </SafeAreaView>
  )
}