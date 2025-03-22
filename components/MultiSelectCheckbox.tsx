import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import { Checkbox } from 'react-native-paper';

type MultiSelectCheckboxProps = {
  label: string;
  options: any[];
  selectedValues: number[];
  onSelectionChange: (selectedIds: number[]) => void;
  placeholder?: string;
};

const MultiSelectCheckbox = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
  placeholder = 'Select options...',
}: MultiSelectCheckboxProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSelectedValues, setTempSelectedValues] = useState<number[]>([...selectedValues]);

  const toggleOption = (id: number) => {
    setTempSelectedValues(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleSave = () => {
    onSelectionChange(tempSelectedValues);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setTempSelectedValues([...selectedValues]);
    setModalVisible(false);
  };

  // Get names of selected options for display
  const getSelectedLabels = () => {
    if (selectedValues.length === 0) return placeholder;
    
    return options
      .filter(option => selectedValues.includes(option.id))
      .map(option => option.name)
      .join(', ');
  };

  return (
    <View className="mb-4">
      <Text className="text-primary font-bregular font-bold text-bsm mb-1">{label}</Text>
      
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="border-2 border-primaryLight rounded-md p-3 min-h-12 flex justify-center"
      >
        <Text className="text-gray-800 text-bsm">{getSelectedLabels()}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-lg p-4 h-2/3">
            <Text className="text-lg font-bsemibold mb-3">Select {label}</Text>
            
            <FlatList
              data={options}
              keyExtractor={(item) => item.id.toString()}
              className="flex-1 mb-4"
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => toggleOption(item.id)}
                  className="flex-row items-center py-3 border-b border-gray-200"
                >
                  <Checkbox
                    status={tempSelectedValues.includes(item.id) ? 'checked' : 'unchecked'}
                    onPress={() => toggleOption(item.id)}
                    color="#4CA4CD" 
                  />
                  <Text className="ml-2 text-gray-800 text-bsm">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            
            <View className="flex-row justify-center gap-3">
              <TouchableOpacity 
                onPress={handleSave}
                className="px-5 py-2 rounded-full bg-primary"
              >
                <Text className="text-white text-bsm">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleCancel}
                className="px-5 py-2 rounded-full bg-softgrey"
              >
                <Text className='text-red text-bsm'>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MultiSelectCheckbox;