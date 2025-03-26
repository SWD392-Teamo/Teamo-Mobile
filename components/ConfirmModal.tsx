import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

type ConfirmModalProps = {
  isVisible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  isVisible,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-lg p-5 w-4/5 max-w-md">
          <Text className="text-lg font-bsemibold mb-3">{title}</Text>
          <Text className="text-sm mb-5">{message}</Text>
          
          <View className="flex-row justify-center gap-3">
            <TouchableOpacity 
              onPress={onConfirm}
              className="px-5 py-2 rounded-full bg-primary"
            >
              <Text className="text-white text-bsm">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={onCancel}
              className="px-5 py-2 rounded-full bg-softgrey"
            >
              <Text className='text-red text-bsm'>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;