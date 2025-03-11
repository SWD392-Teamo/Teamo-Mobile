import { useState } from "react";
import { deleteApplication } from "@/actions/applicationAction";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { colors } from "@/constants/colors";
import { Application } from "@/types";
import dateTimeFormatter from "@/utils/dateTimeFormatter";
import { Text, View } from "react-native";
import { downloadFileAndroid } from "@/utils/FileDownloader";

interface Props{
  application: Application
  action: () => Promise<void>
}

export default function ApplicationCard({application, action}: Props) {
  const handleDownload = (documentUrl: string) => {
    // Get file name from document URL or a default name
    const fileName = documentUrl.split("/").pop() || "document.pdf";
    // Assuming it's a PDF file, adjust the MIME type if necessary
    const mimeType = "application/pdf";

    downloadFileAndroid(documentUrl, fileName, mimeType);
  };

  return (

    <View
      className="flex flex-row items-center justify-between w-full p-3 bg-primary rounded-lg mb-3"
    >
      <View className="flex-1 ml-2">
        <Text className="font-bregular text-bsm text-tertiary">
          {application.groupName}
        </Text>
        <Text className="font-bregular text-bsm text-tertiary mt-1">
          {application.groupPositionName}
        </Text>
        <View className="mt-1 flex-row mb-5">
          <Text className="font-bregular text-bsm text-tertiary mr-4">
            {dateTimeFormatter(application.requestTime)}
          </Text>
          <Text className="font-bbold text-tertiary">
            {application.status}
          </Text>
        </View>
        <View className="max-w-[200px]">
          {application.documentUrl && (
            <View>
              <CustomButton
                title="Download CV"
                variant="secondary"
                icon={icons.download}
                iconColor={colors.dark.icon}
                handlePress={() => handleDownload(application.documentUrl)}
                containerStyles="w-full"
              />
            </View>
          )}
        </View>
      </View>
          
      {application.status === "Requested" && (
        <View className="w-10 mr-5">
          <CustomButton
            title=""
            variant="default"
            icon={icons.trashCan}
            iconColor={colors.dark.icon}
            handlePress={action}
            containerStyles="w-full"
          />
        </View>
      )}
      
      
      
      
      </View>
  );
}
