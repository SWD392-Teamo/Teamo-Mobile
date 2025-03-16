import { useState } from "react";
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
import { Skill } from "@/types";

interface Props {
  control: any
  skills: Skill[]
}

export default function SkillModalPicker({ control, skills }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSkills, setFilteredSkills] = useState(skills);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredSkills(
      skills.filter((skill) =>
        skill.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <Controller
      control={control}
      name="skillId"
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => {
        const selectedSkill = skills.find((skill) => skill.id === value);

        return (
          <View>
            {/* Display selected skill */}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="border-2 border-primaryLight p-3 rounded-md flex flex-row justify-between items-center"
              style={{ height: 55, paddingHorizontal: 10 }}
            >
              <Text className="text-secondary text-bsm">
                {selectedSkill ? `${selectedSkill.name} | ${selectedSkill.type}` : "Select a skill"}
              </Text>
              <AntDesign name="caretdown" size={10} color="gray" style={{ marginLeft: 8, marginRight: 5 }} />
            </TouchableOpacity>

            {/* Modal for skill selection */}
            <Modal visible={modalVisible} animationType="slide">
              <View className="flex-1 bg-white p-5">
                {/* Close button */}
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>

                {/* Search Bar */}
                <TextInput
                  placeholder="Search skill..."
                  value={searchQuery}
                  onChangeText={handleSearch}
                  className="border-2 border-primaryLight p-3 rounded-md my-3"
                />

                {/* Skill List */}
                <FlatList
                  data={filteredSkills}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        onChange(item.id);
                        setModalVisible(false);
                      }}
                      className="p-4 border-b border-gray-300"
                    >
                      <Text className="text-secondary">{item.name} | {item.type}</Text>
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
