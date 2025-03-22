import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { FieldValues, useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { useLoading } from "@/providers/LoadingProvider";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { router } from "expo-router";
import { useParamsStore } from "@/hooks/useParamsStore";
import { Field, Semster } from "@/types";
import { getFields } from "@/actions/fieldAction";
import { getCurrentSemester } from "@/actions/semesterAction";
import { useFieldStore } from "@/hooks/useFieldStore";

export default function CreateGroupForm() {
  const {showLoading, hideLoading} = useLoading();
  const {currentUser} = useGlobalContext();
  const [search, setSearch] = useState<string>("");
  const [currentSemester, setCurrentSemester] = useState<Semster>();

  const { selectedSubject } = useSubjectStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject
    }))
  );

  const setFields = useFieldStore((state) => state.setFields);
  const { selectedField } = useFieldStore(
    useShallow((state) => ({
      selectedField: state.selectedField
    }))
  )

  const {control, handleSubmit,
    formState: {isSubmitting, isValid}} = useForm({
        mode: 'onTouched'
    });

  async function onCreate(data: FieldValues) {

  }

  async function onCancel() {
    router.push('/(tabs)/groups');
  }

  //Search params for getting fields
  const params = useParamsStore(
    useShallow((state) => ({
        search: state.search
    }))
  );
  
  const getFieldsUrl = () => {
    return queryString.stringifyUrl({
      url: "",
        query: {
          ...params,
          ...(selectedSubject? {subjectId: selectedSubject.id} : {}),
          ...(search.trim() ? { search } : {}),
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
  }, [currentUser, search, getFields]);


  //Get current semester
  useEffect(() => {
    showLoading();
    getCurrentSemester().then((response) => {
        setCurrentSemester(response);
        hideLoading();
    })
  }); 

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='w-full flex justify-content-center'>  
          <View className="m-5 ml-5">
            <View className="flex flex-row justify-content-start mt-2">
              <BackButton url="../SelectSubjectForCreateGroup"/>
              <Text className="ml-5 text-bsm font-blight">Back</Text>
            </View >
            <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Enter group information</Text>
          </View>

            <View className="m-5 mt-1">
                {selectedSubject ? (
                  <>

                  <InputField 
                    title='Name' 
                    name='name' 
                    control={control}
                    multiline={false}
                    placeholder='Group name'
                    showlabel='true'
                    rules={{
                      required: 'Name is required.',
                      pattern: {
                        value: /^[\w\s\W]+$/,
                        message: 'Invalid group name.'
                      }}}
                  />
                  <InputField 
                    title='Title' 
                    name='title' 
                    control={control}
                    multiline={false}
                    placeholder='Group title or project title'
                    showlabel='true'
                    rules={{
                      required: 'Title is required',
                      pattern: {
                        value: /^[\w\s\W]+$/,
                        message: 'Invalid group title.'
                    }}}
                  />
                  <InputField 
                    title='Description' 
                    name='description' 
                    control={control}
                    multiline={true}
                    rows={15}
                    placeholder='Describe your group and/or your group project.'
                    showlabel='true'
                    rules={{
                      pattern: {
                        value: /^[\w\s\W]+$/,
                        message: 'Invalid group description.'
                    }}}
                  />

                  <View className="flex flex-row items-center justify-center px-4 m-5 gap-3">
                    <View className='w-[120px]'>
                      <CustomButton
                        title='Create'
                        handlePress={handleSubmit(onCreate)}
                        isLoading={isSubmitting}
                        isNotValid={!isValid}
                        variant='active'
                        containerStyles='small'
                      />
                    </View>
                    <View className='w-[120px]'>
                      <CustomButton
                        title='Cancel'
                        handlePress={onCancel}
                        variant='delete'
                        containerStyles='small'
                      />
                    </View>
                  </View>
                  </>
                ) : (
                    <Text className="text-gray-600 text-center font-bmedium">No subject selected</Text>
                )}
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}