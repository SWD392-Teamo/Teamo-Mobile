import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import { useShallow } from "zustand/shallow";
import queryString from "query-string";
import { useLoading } from "@/providers/LoadingProvider";
import { useGroupStore } from "@/hooks/useGroupStore";
import { useCallback, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import { Controller, FieldValues, useForm } from "react-hook-form";
import MultiSelectCheckbox from "@/components/MultiSelectCheckbox";
import { addGroupPosition, getGroupById } from "@/actions/groupAction";
import { router } from "expo-router";
import InputField from "@/components/InputField";
import NumberPicker from "@/components/NumberPicker";
import { useSkillStore } from "@/hooks/useSkillStore";
import { getSkills } from "@/actions/skillAction";


export default function AddPositionForm() {
  const { showLoading, hideLoading } = useLoading();
  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);
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

  const skillIds = watch('skillIds', []);

  async function onSave(data: FieldValues) {
    if(selectedGroup) {
      showLoading();
      await addGroupPosition(selectedGroup.id, data);
      const updatedGroup = await getGroupById(selectedGroup.id);
      hideLoading();
      setSelectedGroup(updatedGroup);
      router.push({
        pathname: "/(tabs)/groups/details/[id]/EditGroupPositions",
        params: { id: selectedGroup.id }
      });
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
        reset({
          name: "",
          count: 1,
          skillIds: []
        });
  }, [reset]);

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
              <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Add position</Text>
            </View>
          }

            <View className="m-5 mt-1">
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
                      required: "Position name is required.",
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Invalid position name."
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
                      requiredInput={true}
                      defaultValue={1}
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
                </View>
            </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}