import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { getProfile, removeProfileLink, updateProfileLink } from "@/actions/profileAction";
import InputField from "@/components/InputField";
import { FieldValues, useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { useShallow } from "zustand/shallow";
import { useLoading } from "@/providers/LoadingProvider";
import { useGroupStore } from "@/hooks/useGroupStore";
import { deleteGroup, getGroupById } from "@/actions/groupAction";

export default function EditGroupForm() {
  const { showLoading, hideLoading } = useLoading();
  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);
  const { selectedGroup } = useGroupStore(
    useShallow((state) => ({
        selectedGroup: state.selectedGroup
    }))
  );

  const { currentUser } = useGlobalContext();

  const {control, handleSubmit,
    formState: {isSubmitting, isValid}} = useForm({
        mode: 'onTouched'
    });

  async function onSave(data: FieldValues) {
    if(currentUser && selectedGroup) {
      await updateProfileLink(selectedGroup.id, data);
      const updatedGroup = await getGroupById(selectedGroup.id);
      setSelectedGroup(updatedGroup);
    }
  }

  async function onDelete() {
    if(currentUser && selectedGroup) {
      await deleteGroup(selectedGroup.id);
    }
    router.push('/groups');
  }

  useEffect(() => {    
    hideLoading();
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='w-full flex justify-content-center'>  
            
          <View className="m-5 ml-5">
            <View className="flex flex-row justify-content-start mt-2">
              <BackButton url="(tabs)/groups"/>
              <Text className="ml-5 text-bsm font-blight">Links</Text>
            </View >
            <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Update link</Text>
          </View>

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
                  <InputField 
                    title='Max Member' 
                    name='maxMember' 
                    control={control}
                    multiline={false}
                    showlabel='true'
                    placeholder={selectedGroup.maxMember.toString()}
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      pattern: {
                        value: /[^0-9]/g,
                        message: 'Input a number 1-100.'
                      }
                    }}
                  />

                  <View className="flex flex-row items-center justify-center px-4 m-5 gap-4">
                    <View className='w-[120px]'>
                      <Link 
                        href={{
                          pathname: '/(tabs)/groups/details/[id]', 
                          params: {id: selectedGroup.id}
                        }}
                        onPress={onSave}
                      >
                        <CustomButton
                            title='Save'
                            handlePress={handleSubmit(onSave)}
                            isLoading={isSubmitting}
                            isNotValid={!isValid}
                            variant='active'
                            containerStyles='small'
                        />
                      </Link>
                    </View>
                    <View className='w-[120px]'>
                      <CustomButton
                        title='Delete Group'
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