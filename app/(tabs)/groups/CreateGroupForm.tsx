import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { FieldValues, useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { useLoading } from "@/providers/LoadingProvider";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { router } from "expo-router";
import { GroupPositionToAdd, GroupToCreate, Semester } from "@/types";
import { getFields } from "@/actions/fieldAction";
import { getCurrentSemester } from "@/actions/semesterAction";
import { useFieldStore } from "@/hooks/useFieldStore";
import NumberPicker from "@/components/NumberPicker";
import FieldModalPicker from "@/components/FieldModalPicker";
import { AntDesign } from "@expo/vector-icons";
import PositionForGroupCreate from "./PositionForGroupCreate";
import { useSkillStore } from "@/hooks/useSkillStore";
import { getSkills } from "@/actions/skillAction";
import { createGroup, getGroupById } from "@/actions/groupAction";
import { useGroupStore } from "@/hooks/useGroupStore";

export default function CreateGroupForm() {
  const {showLoading, hideLoading} = useLoading();
  const [addedPositions, setAddedPositions] = useState<GroupPositionToAdd[]>([]);
  const [currentSemester, setCurrentSemester] = useState<Semester>();

  const { selectedSubject } = useSubjectStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject
    }))
  );

  const setFields = useFieldStore((state) => state.setFields);
  const { fieldOptions } = useFieldStore(
    useShallow((state) => ({
      fieldOptions: state.fields
    }))
  )

  const setSkillOptions = useSkillStore((state) => state.setData);
  const { skillOptions } = useSkillStore(
    useShallow((state) => ({
      skillOptions: state.skills
    }))
  )

  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);

  const {control, handleSubmit,
    formState: {isSubmitting, isValid}} = useForm({
        mode: 'onTouched'
    });

  async function onCreate(data: FieldValues) {
    try {
      showLoading();
      if(selectedSubject && currentSemester) {
        var newGroup: GroupToCreate = {
          name: data.name,
          title: data.title,
          description: data.description,
          semesterId: currentSemester.id,
          maxMember: data.maxMember,
          fieldId: data.fieldId,
          subjectId: selectedSubject.id,
          groupPositions: addedPositions.length > 0 ? data.groupPositions : addedPositions 
        }
        
        const res = await createGroup(newGroup);
    
        if (res.error == undefined) {
          const createdGroup = await getGroupById(res.id);
          hideLoading();
          ToastAndroid.show('Group created successfully', ToastAndroid.SHORT);
          setSelectedGroup(createdGroup);
          router.push({
            pathname: "/(tabs)/groups/details/[id]",
            params: { id: res.id }
          });
        }
        else if (res.statusCode){
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
      }
    } catch (error: any) {
      ToastAndroid.show('Error occured: ' + error.message, ToastAndroid.SHORT);
    } finally {
      hideLoading();
    }
  }

  async function onCancel() {
    router.push('/(tabs)/groups');
  }
  
  const getFieldsUrl = () => {
    return queryString.stringifyUrl({
      url: "",
        query: {
          ...(selectedSubject? {subjectId: selectedSubject.id} : {}),
          ...{isPaginated: false}
      },
    });
  };

  const getSkillsUrl = () => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        ...{isPaginated: false}
      },
    });
  };
    
  useEffect(() => {
    async function fetchData() {
      showLoading();
      try {
        const [fieldsResponse, skillsResponse, semesterResponse] = await Promise.all([
          getFields(getFieldsUrl()),
          getSkills(getSkillsUrl()),
          getCurrentSemester()
        ]);
        
        setFields(fieldsResponse);
        setSkillOptions(skillsResponse);
        setCurrentSemester(semesterResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        hideLoading();
      }
    }
  
    fetchData();
  }, [getFields, getSkills, getCurrentSemester, setFields, setSkillOptions, setCurrentSemester]); 

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
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      required: 'Name is required.',
                      validate: (value) => value.trim() !== "" || "Invalid group name.",
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
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      required: 'Title is required',
                      validate: (value) => value.trim() !== "" || "Invalid title.",
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
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      pattern: {
                        value: /^[\w\s\W]+$/,
                        message: 'Invalid description.'
                    }}}
                  />
                  <NumberPicker 
                    control={control}
                    name="maxMember"
                    title="Max Member"
                    showlabel={true}
                    requiredInput={true}
                    defaultValue={1}
                  />
                  <Text className="text-base text-grey font-bmedium mt-5 mb-2">Field</Text>
                  <FieldModalPicker control={control} fields={fieldOptions || []} requiredInput={true}/>

                  <Text className="text-base text-grey font-bmedium mt-5 mb-2">Positions</Text>
                  <View className="w-full">
                  {addedPositions.map((position, index) => (
                    <View
                      key={index}
                      className="w-full bg-white border-2 border-primaryLight p-4 my-2 rounded-lg shadow shadow-primaryLight/10 elevation-2"
                    >
                      <PositionForGroupCreate
                        control={control}
                        skills={skillOptions || []}
                        index={index}
                      />

                      {/* Remove Position Button */}
                      <TouchableOpacity
                        onPress={() => setAddedPositions(addedPositions.filter((_, i) => i !== index))}
                        className="mt-3 bg-softgrey p-2 rounded-md"
                      >
                        <Text className="text-red text-center">Remove</Text>
                      </TouchableOpacity>
                    </View>
                  ))}

                    {/* Add Position Button */}
                    <TouchableOpacity
                      onPress={() => setAddedPositions([...addedPositions, { name: "", count: 0, skillIds: [] }])}
                      className="bg-tertiary p-3 rounded-md flex flex-row justify-center items-center mt-3 border-2 border-primaryLight"
                    >
                      <AntDesign name="plus" size={20} color="#4CA4CD" />
                      <Text className="text-primary text-center">Add Position</Text>
                    </TouchableOpacity>
                  </View>

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