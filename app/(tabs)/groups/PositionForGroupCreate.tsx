import { View, Text } from "react-native";
import React from 'react';
import InputField from '@/components/InputField';
import { GroupPosition, Link, Skill } from "@/types";
import NumberPicker from "@/components/NumberPicker";
import { Controller } from "react-hook-form";
import MultiSelectCheckbox from "@/components/MultiSelectCheckbox";

type Props = {
  control: any;
  skills: Skill[];
  index?: number;
}

export default function PositionForGroupCreate(props: Props) {
  return (
    <>      
      <Text className="text-primary font-bregular font-bold text-bsm mb-1">Name</Text>
      <InputField 
        title='Name' 
        name={`groupPositions.${props.index}.name`} 
        control={props.control}
        multiline={false}
        showlabel='false'
        placeholder='Position name'
        customStyles={{
          container: "border-2 border-primaryLight rounded-md",
          label: "text-secondary"
        }}
        rules={{
          required: "Position name is required.",
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "Invalid position name.",
          }
        }}
      />
      
      <View className="mt-3">
        <Text className="text-primary font-bregular font-bold text-bsm mb-1">Count</Text>
        <NumberPicker 
          control={props.control}
          name={`groupPositions.${props.index}.count`}
          title="Count"
          showlabel={false}
          requiredInput={true}
          defaultValue={1}
        />
      </View>

      <View className="mt-3">
      <Controller
        control={props.control}
        name={`groupPositions.${props.index}.skillIds`}
        render={({ field: { onChange, value } }) => (
          <MultiSelectCheckbox
            label="Skills"
            options={props.skills || []}
            selectedValues={value}
            onSelectionChange={onChange}
            placeholder="Select skills"
          />
        )}
      />
      </View>
    </>
  );
}