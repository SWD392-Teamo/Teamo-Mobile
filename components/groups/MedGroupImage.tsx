import { imgProps } from "@/interfaces";
import { DocumentPickerResponse } from "@react-native-documents/picker";
import { Image, Text, View } from "react-native";
import FilePicker from "../FilePicker";

interface Props {
  isLeader: boolean | undefined
  imgUrl: string | undefined
  onImageSelect: (file: DocumentPickerResponse) => void;
}

const MedGroupImage = ({isLeader, imgUrl, onImageSelect} : Props) => { 
   return (
    <View className="relative self-start">
      {imgUrl ? (
        <Image
          source={{ uri: imgUrl }}
          style={{
            width: 192,
            height: 192,
            borderRadius: 48,
            borderWidth: 2,
            borderColor: "#A0A0A0",
            resizeMode: "cover"
          }}
          alt="Medium Group Logo"
        />
      ) : (
        <Text>Loading image...</Text>
      )}
      {isLeader && 
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
      }
     </View>
   );
 };
 
 export default MedGroupImage;