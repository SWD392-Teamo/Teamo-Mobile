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
    <View className="px-3">
      {apps?.map((app) => (
        <View
          key={app.id}
          className="flex flex-row justify-center align-middle max-w-sm p-2 bg-primary border-0 rounded-lg shadow-sm mb-2"
        >
          <Text className="m-1 font-bregular text-bsm text-tertiary">
            {app.groupName} | {app.groupPositionName}
            {"\n"}
            {dateTimeFormatter(app.requestTime)}
            {"\n"}
            <Text className="font-bbold">{app.status}</Text>
          </Text>
          {app.status === "Requested" && (
            <CustomButton
              title={""}
              variant={"default"}
              icon={icons.trashCan}
              iconColor={colors.dark.icon}
              handlePress={() => {
                onDeleteApplication(app.groupId, app.id);
              }}
              containerStyles="w-2"
            />
          )}
        </View>
      ))}
    </View>
  );
}
