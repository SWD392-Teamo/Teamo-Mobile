import { imgProps } from "@/interfaces";
import { Image, Text, View } from "react-native";

const MedGroupImage: React.FC<imgProps> = ({ imgUrl }) => { 
   return (
    <View>
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
     </View>
   );
 };
 
 export default MedGroupImage;