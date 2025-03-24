import { View, Text } from "react-native";
import React from 'react';
import InputField from '@/components/InputField';
import { Link } from "@/types";

type Props = {
  control: any;
  index?: number;
}

export default function LinkInput(props: Props) {
  return (
    <>
      <Text className="text-primary font-bold font-bregular text-bsm mb-1">Link</Text>
      
      <InputField 
        title='Name' 
        name={`links.${props.index}.name`} 
        control={props.control}
        multiline={false}
        showlabel='true'
        customStyles={{
          container: "border-2 border-primaryLight rounded-md",
          label: "text-secondary"
        }}
        rules={{
          required: "Link name is required.",
          pattern: {
            value: /^[a-zA-Z0-9\s\-_()]+$/,
            message: "Invalid link name.",
          }
        }}
      />
      
      <InputField 
        title='URL' 
        name={`links.${props.index}.url`} 
        control={props.control}
        multiline={false}
        showlabel='true'
        customStyles={{
          container: "border-2 border-primaryLight rounded-md",
          label: "text-secondary"
        }}
        rules={{
          required: 'URL is required',
          pattern: {
            value: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w@:%_\+.~#?&//=]*)?$/i,
            message: 'Invalid URL.'
          }
        }}
      />
    </>
  );
}