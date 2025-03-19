import FilePicker from "@/components/FilePicker";
import { useGlobalContext } from "@/providers/AuthProvider";
import { DocumentPickerResponse } from "@react-native-documents/picker";
import { Image, View } from "react-native";

interface ProfileImageProps{
    id: number | undefined
    imgUrl: string | undefined
    onImageSelect: (file: DocumentPickerResponse) => void;
}

const ProfileImage = ({id, imgUrl, onImageSelect} : ProfileImageProps) => {
    const {currentUser} = useGlobalContext();

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
            {currentUser?.id == id && (
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