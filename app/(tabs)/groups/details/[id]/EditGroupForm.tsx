import { useGlobalContext } from "@/providers/AuthProvider";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, ToastAndroid } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useShallow } from "zustand/shallow";
import queryString from "query-string";
import { useLoading } from "@/providers/LoadingProvider";
import { useGroupStore } from "@/hooks/useGroupStore";
import { deleteGroup, getGroupById, updateGroup } from "@/actions/groupAction";
import NumberPicker from "@/components/NumberPicker";
import { useFieldStore } from "@/hooks/useFieldStore";
import { getFields } from "@/actions/fieldAction";
import { Picker } from "@react-native-picker/picker";
import FieldModalPicker from "@/components/FieldModalPicker";
import ConfirmModal from "@/components/ConfirmModal";

export default function EditGroupForm() {
  const { showLoading, hideLoading } = useLoading();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);
  const { selectedGroup } = useGroupStore(
    useShallow((state) => ({
        selectedGroup: state.selectedGroup
    }))
  );

  const setFields = useFieldStore((state) => state.setFields);
  const {fields} = useFieldStore(
    useShallow((state) => ({
      fields: state.fields
    }))
  )

  const {control, handleSubmit, reset,
    formState: {isSubmitting, isValid}} = useForm({
        mode: 'onTouched'
    });

  useEffect(() => {
    if (selectedGroup) {
      reset({
        name: selectedGroup.name,
        title: selectedGroup.title,
        description: selectedGroup.description,
        maxMember: selectedGroup.maxMember,
        status: selectedGroup.status
      });
    }
  }, [selectedGroup, reset]);

  async function onSave(data: FieldValues) {
    try {
      showLoading();
      if(selectedGroup) {
        const res = await updateGroup(selectedGroup.id, data);
        if(res.error == undefined) {
          const updatedGroup = await getGroupById(selectedGroup.id);
          hideLoading();
          ToastAndroid.show('Updated group successfully', ToastAndroid.SHORT);
          setSelectedGroup(updatedGroup);
          router.push({
            pathname: "/(tabs)/groups/details/[id]",
            params: { id: selectedGroup.id },
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
    
  const getFieldsUrl = useCallback(() => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        ...(selectedGroup?.subjectId ? { subjectId: selectedGroup.subjectId } : {}),
        ...{ isPaginated: false }
      },
    });
  }, [selectedGroup]);
      
    //Get list of fields for user to choose
    useEffect(() => {
      showLoading();
      getFields(getFieldsUrl()).then((response) => {
        setFields(response);
        hideLoading();
      });
    }, [getFieldsUrl, setFields]);

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
              <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Update group</Text>
            </View>
          }

            <View className="m-5 mt-1">
                {selectedGroup ? (
                  <>
                  <InputField 
                    title='Name' 
                    name='name'
                    control={control}
                    multiline={false}
                    showlabel='true'
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      validate: (value) => value.trim() !== "" || "Invalid group name.",
                      pattern: {
                        value: /^[\w\s\W]+$/,
                        message: "Invalid group name.",
                      }
                    }}
                  />    
                  <InputField 
                    title='Title' 
                    name='title' 
                    control={control}
                    multiline={false}
                    showlabel='true'
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      validate: (value) => value.trim() !== "" || "Invalid title.",
                      pattern: {
                        value: /^[\w\s\W]+$/,
                        message: 'Invalid title.'
                      }
                    }}
                  />
                  <InputField 
                    title='Description' 
                    name='description' 
                    control={control}
                    multiline={true}
                    rows={15}
                    showlabel='true'
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      pattern: {
                        value: /^[\w\s\W]+$/,
                        message: 'Invalid description.'
                      }
                    }}
                  />
                  <NumberPicker 
                    control={control}
                    name="maxMember"
                    title="Max Member"
                    showlabel={true}
                    requiredInput={false}
                    defaultValue={selectedGroup.maxMember}
                  />

                  <Text className="text-base text-grey font-bmedium mt-5 mb-2">Field</Text>
                  <FieldModalPicker control={control} fields={fields} requiredInput={false}/>

                  <Text className="text-base text-grey font-bmedium mt-5 mb-2">Status</Text>
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
                          <Picker.Item label="Recruiting" value="Recruiting" />
                          <Picker.Item label="Full" value="Full" />
                          <Picker.Item label="Archive" value="Archived" />
                        </Picker>
                      </View>
                    )}
                  />

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
                    <View className='w-[120px]'>
                      <CustomButton
                        title='Delete'
                        handlePress={() => setConfirmModalVisible(true)}
                        variant='delete'
                        containerStyles='small'
                      />
                    </View>
                  </View>
                  </>
                ) : (
                    <Text className="text-gray-600 text-center font-bmedium">No group selected</Text>
                )}
            </View>
        </View>
      </ScrollView>
      {/* Confirmation Modal for Remove action */}
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
    </SafeAreaView>
  )
}