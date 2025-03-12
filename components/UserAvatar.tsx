import { imgProps } from "@/interfaces";
import { Image, Text, View } from "react-native";

const LeaderAvatar: React.FC<imgProps> = ({ imgUrl }) => { 
   return (
    <View>
       {imgUrl ? (
         <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 48,
            borderWidth: 2,
            borderColor: "#A0A0A0",
            resizeMode: "cover"
          }}
          source={{uri: imgUrl}}
          alt="Leader Avatar"
         />
       ) : (
         <Text>Loading image...</Text>
       )}
     </View>
   );
 };
 
 export default LeaderAvatar;