import { useState } from "react";
import { deleteApplication } from "@/actions/applicationAction";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { colors } from "@/constants/colors";
import { Application } from "@/types";
import dateTimeFormatter from "@/utils/dateTimeFormatter";
import { Text, View } from "react-native";

interface Props {
  applications: Application[] | undefined;
}

export default function ApplicationsCard({ applications: initialApps }: Props) {
  const [apps, setApps] = useState<Application[] | undefined>(initialApps);

  async function onDeleteApplication(groupId: number, appId: number) {
    await deleteApplication(groupId, appId);
    setApps((prevApps) => prevApps?.filter((app) => app.id !== appId));
  }

  return (
    <View className="flex-1 px-4 w-full">
      {apps?.map((app) => (
        <View
          key={app.id}
          className="flex flex-row items-center justify-between w-full p-3 bg-primary rounded-lg shadow-sm mb-3"
        >
          <View className="flex-1 ml-2">
            <Text className="font-bregular text-bsm text-tertiary">
              {app.groupName}
            </Text>
            <Text className="font-bregular text-bsm text-tertiary mt-1">
              {app.groupPositionName}
            </Text>
            <View className="mt-1 flex-row">
              <Text className="font-bregular text-bsm text-tertiary mr-4">
                {dateTimeFormatter(app.requestTime)}
              </Text>
              <Text className="font-bbold text-tertiary">
                {app.status}
              </Text>
            </View>
          </View>
          
          {app.status === "Requested" && (
            <View className="w-10 mr-5">
              <CustomButton
                title=""
                variant="default"
                icon={icons.trashCan}
                iconColor={colors.dark.icon}
                handlePress={() => onDeleteApplication(app.groupId, app.id)}
                containerStyles="w-full"
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
