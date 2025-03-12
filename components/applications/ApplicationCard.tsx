import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { colors } from "@/constants/colors";
import { useParamsStore } from "@/hooks/useParamsStore";
import { Application } from "@/types";
import dateTimeFormatter from "@/utils/dateTimeFormatter";
import { downloadFileAndroid } from "@/utils/FileDownloader";
import { Text, View } from "react-native";
import { useShallow } from "zustand/shallow";

interface Props{
  application: Application
  approveAction: () => Promise<void>
  rejectAction: () => Promise<void>
  deleteAction: () => Promise<void>
  isForUser: boolean
}

export default function ApplicationCard({application, approveAction, rejectAction, deleteAction, isForUser}: Props) {
  const handleDownload = (documentUrl: string) => {
    // Get file name from document URL or a default name
    const fileName = documentUrl.split("/").pop() || "document.pdf";
    // Assuming it's a PDF file, adjust the MIME type if necessary
    const mimeType = "application/pdf";

    downloadFileAndroid(documentUrl, fileName, mimeType);
  };

  const params = useParamsStore(
    useShallow((state) => ({
      status: state.status
    }))
  );

  return (

    <View
      className="flex flex-row items-center justify-between w-full p-3 bg-primary rounded-lg mb-3"
    >
      <View className="flex-1 ml-2">
        <View className='flex flex-row items-center justify-between'>
          <Text className="font-bbold text-lg text-tertiary">
            {application.groupName}
          </Text>
          {application.documentUrl && (
            <CustomButton
              title="Download CV"
              variant="secondary-outline"
              icon={icons.download}
              iconColor={colors.light.icon}
              handlePress={() => handleDownload(application.documentUrl)}
              containerStyles="w-50"
            />
          )}
        </View>
        <Text className="font-bregular text-bsm text-tertiary mt-1">
          {application.groupPositionName}
        </Text>
        <View className="flex flex-row flex-wrap">
          <Text className="font-bregular text-bsm text-tertiary mt-1">
            {application.requestContent}
          </Text>
        </View>
        <View className="mt-1 flex-row mb-5">
          <Text className="font-bregular text-bsm text-tertiary mr-4">
            {dateTimeFormatter(application.requestTime)}
          </Text>
          <Text className="font-bbold text-tertiary">
            {application.status}
          </Text>
        </View>
        

        {(!isForUser && params.status !== 'Approved' && params.status !== 'Rejected') && 
          <View className="flex flex-row gap-2 mt-3">
            <CustomButton
              title="Approve"
              variant="primary-outline"
              handlePress={approveAction}
              containerStyles="min-w-[150px]"
            />
            <CustomButton
              title="Reject"
              variant="secondary"
              handlePress={rejectAction}
              containerStyles="min-w-[150px]"
            />
          </View>
        }
      </View>
          
      {application.status === "Requested" && isForUser && (
        <View className="w-10 mr-5">
          <CustomButton
            title=""
            variant="default"
            icon={icons.trashCan}
            iconColor={colors.dark.icon}
            handlePress={deleteAction}
            containerStyles="w-full"
          />
        </View>
      )}  
    </View>
  );
}
