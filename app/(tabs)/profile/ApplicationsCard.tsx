import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { colors } from "@/constants/colors";
import { Application } from "@/types";
import dateTimeFormatter from "@/utils/dateTimeFormatter";
import { Text, View } from "react-native";

interface Props{
    applications: Application[] | undefined
}

export default function ApplicationsCard({applications}: Props) {
    return (
        <View className="px-3">
            {applications?.map((app) => (
                <View key={app.id} className="flex flex-row justify-center align-middle max-w-sm p-6 bg-primary border-0 rounded-lg shadow-sm mb-2">
                    <Text className="p-1 m-1 text-bsemibold text-bsm text-tertiary">
                        {app.groupName} - {app.groupPositionName} | {dateTimeFormatter(app.requestTime)} | {app.status}
                    </Text>
                    <CustomButton 
                        title={''}
                        variant={'default'}
                        icon={icons.trashCan}
                        iconColor={colors.dark.icon}
                        handlePress={() => {}}
                        containerStyles="w-7"
                    />
                </View>
            ))}
        </View>
    )
}