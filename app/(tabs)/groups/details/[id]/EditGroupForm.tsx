import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
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

export default function EditGroupForm() {
  const { showLoading, hideLoading } = useLoading();
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

  const { currentUser } = useGlobalContext();

  const {control, handleSubmit,
    formState: {isSubmitting, isValid}} = useForm({
        mode: 'onTouched'
    });

  async function onSave(data: FieldValues) {
    if(currentUser && selectedGroup) {
      await updateGroup(selectedGroup.id, data);
      const updatedGroup = await getGroupById(selectedGroup.id);
      setSelectedGroup(updatedGroup);
      router.push({
        pathname: "/(tabs)/groups/details/[id]",
        params: { id: selectedGroup.id },
      });
    }
  }

  async function onDelete() {
    if(currentUser && selectedGroup) {
      await deleteGroup(selectedGroup.id);
    }
    router.push('/groups');
  }
    
    const getFieldsUrl = () => {
      return queryString.stringifyUrl({
        url: "",
          query: {
            ...(selectedGroup?.subjectId? {subjectId: selectedGroup.subjectId} : {}),
            ...{isPaginated: false}
        },
      });
    };
      
    //Get list of fields for user to choose
    useEffect(() => {
      if(currentUser) {
            showLoading();
            getFields(getFieldsUrl()).then((response) => {
              setFields(response);
              hideLoading();
            });
          }
    }, [currentUser, getFields]);

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
                    placeholder={selectedGroup.name}
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      pattern: {
                        value: /^[a-zA-Z0-9\s\-_()]+$/,
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
                    placeholder={selectedGroup.title}
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      pattern: {
                        value: /^[a-zA-Z0-9\s\-_()]+$/,
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
                    placeholder={selectedGroup.description}
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      pattern: {
                        value: /^[a-zA-Z0-9\s\-_()]+$/,
                        message: 'Invalid text.'
                      }
                    }}
                  />
                  <NumberPicker 
                    control={control}
                    name="maxMeber"
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
                    defaultValue={selectedGroup.status}
                    render={({ field: { onChange, value } }) => (
                      <View className="border-2 border-primaryLight rounded-md overflow-hidden">
                        <Picker
                          selectedValue={value}
                          onValueChange={onChange}
                          style={{ height: 55, width: '100%' }}
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
                        handlePress={onDelete}
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
    </SafeAreaView>
  )
}