import { GroupPosition } from "@/types";
import { Text, View } from "react-native";

const PositionCard: React.FC<{ position: GroupPosition }> = ({ position }) => {
  return (
    <View className="flex flex-row items-center p-2 bg-primary rounded-full min-w-[170px]">
      <View className="bg-tertiary rounded-full w-6 h-6 justify-center items-center mr-2">
        <Text className="text-primary font-bbold">
          {position.count}
        </Text>
      </View>
      <Text className="text-sm font-bsemibold text-tertiary">
        {position.name}
      </Text>
    </View>
  );
};

 
 export default PositionCard;