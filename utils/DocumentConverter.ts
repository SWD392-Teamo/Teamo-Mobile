import { DocumentPickerResponse } from "@react-native-documents/picker";
import { Platform } from "react-native";

export default function convertDocument(file: DocumentPickerResponse) {
    // Create a blob-like object that FormData can handle
    const convertedFile = {
        uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
        type: file.type || 'image/jpeg',
        name: file.name || 'image.jpg',
        size: file.size,
    } as any;

    return convertedFile;
}