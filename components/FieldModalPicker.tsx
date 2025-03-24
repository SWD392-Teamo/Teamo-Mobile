import { useEffect, useState } from "react";
 import {
   View,
   Text,
   TextInput,
   Modal,
   FlatList,
   TouchableOpacity,
 } from "react-native";
 import { Controller } from "react-hook-form";
 import { AntDesign } from "@expo/vector-icons";
 import { Field } from "@/types";
 
 interface Props {
   control: any
   fields: Field[]
   requiredInput: boolean
 }
 
 export default function FieldModalPicker({ control, fields, requiredInput }: Props) {
   const [modalVisible, setModalVisible] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredFields, setFilteredFields] = useState(fields);
 
   useEffect(() => {
    setFilteredFields(fields);
  }, [fields]);
   
   const handleSearch = (query: string) => {
     setSearchQuery(query);
     setFilteredFields(
       fields.filter((field) =>
         field.name.toLowerCase().includes(query.toLowerCase())
       )
     );
   };
 
   return (
     <Controller
       control={control}
       name="fieldId"
       rules={requiredInput ? { required: "Please select a field" } : {}}
       render={({ field: { onChange, value } }) => {
         const selectedField = fields.find((field) => field.id === value);
 
         return (
           <View>
             {/* Display selected field */}
             <TouchableOpacity
               onPress={() => setModalVisible(true)}
               className="border-2 border-primaryLight p-3 rounded-md flex flex-row justify-between items-center"
               style={{ height: 55, paddingHorizontal: 10 }}
             >
               <Text className="text-secondary text-bsm">
                 {selectedField ? `${selectedField.name}` : "Select a field"}
               </Text>
               <AntDesign name="caretdown" size={10} color="gray" style={{ marginLeft: 8, marginRight: 5 }} />
             </TouchableOpacity>
 
             {/* Modal for field selection */}
             <Modal visible={modalVisible} animationType="slide">
               <View className="flex-1 bg-white p-5">
                 {/* Close button */}
                 <TouchableOpacity onPress={() => setModalVisible(false)}>
                   <AntDesign name="close" size={24} color="black" />
                 </TouchableOpacity>
 
                 {/* Search Bar */}
                 <TextInput
                   placeholder="Search field..."
                   value={searchQuery}
                   onChangeText={handleSearch}
                   className="border-2 border-primaryLight p-3 rounded-md my-3"
                 />
 
                 {/* Field List */}
                 <FlatList
                   data={filteredFields}
                   keyExtractor={(item) => item.id.toString()}
                   renderItem={({ item }) => (
                     <TouchableOpacity
                       onPress={() => {
                         onChange(item.id);
                         setModalVisible(false);
                       }}
                       className="p-4 border-b border-gray-300"
                     >
                       <Text className="text-secondary">{item.name}</Text>
                     </TouchableOpacity>
                   )}
                 />
               </View>
             </Modal>
           </View>
         );
       }}
     />
   );
 }