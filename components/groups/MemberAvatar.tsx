import { imgProps } from '@/interfaces';
import { Image, Text, View } from "react-native";

const MemberAvatar: React.FC<imgProps> = ({ imgUrl }) => {
   return (
     <View>
       {imgUrl ? (
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 48,
              borderWidth: 2,
              borderColor: "#A0A0A0",
              resizeMode: "cover"
            }}
            source={{uri: imgUrl}}
            alt="Member Avatar"
         />
       ) : (
         <Text>Loading image...</Text>
       )}
     </View>
   );
 };
 
 export default MemberAvatar;