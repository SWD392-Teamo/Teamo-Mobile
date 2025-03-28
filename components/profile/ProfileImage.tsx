import FilePicker from "@/components/FilePicker";
import { DocumentPickerResponse } from "@react-native-documents/picker";
import { Image, View } from "react-native";

interface ProfileImageProps{
    id: number | undefined
    imgUrl: string | undefined
    allowEdit: boolean
    onImageSelect: (file: DocumentPickerResponse) => void;
}

const ProfileImage = ({id, imgUrl, allowEdit, onImageSelect} : ProfileImageProps) => {
    return(
        <View className="relative self-start">
            <Image
                style={{
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    borderWidth: 2,
                    borderColor: "#A0A0A0",
                    resizeMode: "cover"
                }}
                source={{ uri: imgUrl }}
                alt="Profile"
            />
            {allowEdit && (
                <View className="absolute bottom-0 right-0">
                    <FilePicker
                        onFileSelect={onImageSelect}
                        accept={['image/*']}
                        multiple={false}
                        showLabel={false}
                        placeholder="Change Photo"
                        showFileName={false}
                    />
                </View>
            )}
        </View>
    )
}

export default ProfileImage