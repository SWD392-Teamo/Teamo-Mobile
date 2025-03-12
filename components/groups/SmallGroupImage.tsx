import { imgProps } from "@/interfaces";
import { Image, Text, View } from "react-native";

const SmallGroupImage: React.FC<imgProps> = ({ imgUrl }) => { 
   return (
     <View>
       {imgUrl ? (
         <Image        
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              borderWidth: 2,
              borderColor: "#A0A0A0",
              resizeMode: "cover"
            }}
            source={{uri: imgUrl}}
            alt="Small Group Logo"
          />
       ) : (
         <Text>Loading image...</Text>
       )}
     </View>
   );
 };
 
 export default SmallGroupImage;