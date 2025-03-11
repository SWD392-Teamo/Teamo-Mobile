import { icons } from "@/constants";
import { colors } from "@/constants/colors";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { DocumentPickerResponse, pick } from '@react-native-documents/picker';

interface FilePickerProps {
    onFileSelect: (file: DocumentPickerResponse) => void;
    accept?: Array<string>;
    multiple?: boolean;
    hasIcon?: boolean;
    placeholder?: string;
    showFileName?: boolean;
}

const FilePicker: React.FC<FilePickerProps> = ({
    onFileSelect,
    accept = ['*/*'],
    multiple = false,
    hasIcon = false,
    placeholder = 'Choose file',
    showFileName = true
}) => {
    const noFileText = 'No file chosen';
    const [fileName, setFileName] = useState<string>(noFileText);

    const handleFilePick = async () => {
        try {
            const result = await pick({
                type: accept,
                allowMultiSelection: multiple,
            });

            if (result.length > 0) {
                const selectedFile = result[0];
                setFileName(selectedFile.name ?? '');
                onFileSelect(selectedFile);
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };

    return (
        <View className="flex-row items-center gap-3">
            <Pressable
                onPress={handleFilePick}
                className="bg-secondary rounded-full p-3"
            >
                {hasIcon ? (
                    <View className="flex flex-row gap-2">
                        <Text className="text-tertiary">{placeholder}</Text>
                        <Image
                            source={icons.edit}
                            resizeMode="contain"
                            className="w-6 h-6"
                            tintColor={colors.dark.icon}
                        />
                    </View>
                ) : (
                    <Text className="text-tertiary">{placeholder}</Text>
                )}
            </Pressable>

            {showFileName && (
                <Text className="text-sm text-grey">{fileName}</Text>
            )}
        </View>
    );
};

export default FilePicker;