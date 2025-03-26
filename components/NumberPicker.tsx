import { Controller } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface Props {
  control: any;
  name: string;
  title?: string;
  showlabel?: boolean; 
  defaultValue: number;
  requiredInput?: boolean; 
}

export default function NumberPicker(props: Props) {
  // Set default values for optional props
  const { 
    control,
    name,
    title = "Value",
    showlabel = false,
    defaultValue = 1,
    requiredInput = false
  } = props;

  return (
    <>
      {showlabel && (
        <Text className="text-base text-grey font-bmedium mt-5 mb-2">{title}</Text>
      )}
      
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{
          ...(requiredInput && {required: "Please input a number."}),
          min: { value: 1, message: "Minimum value is 1" },
          max: { value: 100, message: "Maximum value is 100" },
          pattern: {
            value: /^[0-9]+$/,
            message: "Only numbers allowed",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="border-2 border-primaryLight rounded-md p-2 w-40">
            <View className="flex flex-row items-center justify-between border border-gray-300 rounded-md">
              {/* Decrease Button with text */}
              <TouchableOpacity
                className="px-2 py-1 bg-gray-200 rounded-l-md"
                onPress={() => onChange(Math.max(1, Number(value) - 1))}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>

              {/* Number Input */}
              <TextInput
                className="text-center flex-1 py-2"
                keyboardType="numeric"
                value={value !== undefined ? value.toString() : defaultValue.toString()}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                  const newValue = numericValue ? Math.min(100, Math.max(1, Number(numericValue))) : 1;
                  onChange(newValue);
                }}
              />

              {/* Increase Button with text */}
              <TouchableOpacity
                className="px-2 py-1 bg-gray-200 rounded-r-md"
                onPress={() => onChange(Math.min(100, Number(value) + 1))}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Validation Error Message */}
            {error && <Text className="text-red-500">{error.message}</Text>}
          </View>
        )}
      />
    </>
  );
}