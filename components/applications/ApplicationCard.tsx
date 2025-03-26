import CustomButton from "@/components/CustomButton";
import { Application } from "@/types";
import dateTimeFormatter from "@/utils/dateTimeFormatter";
import { downloadFileAndroid } from "@/utils/FileDownloader";
import { Text, TouchableOpacity, View } from "react-native";
import ApplicationStatusBadge from "./ApplicationStatus";
import { Ionicons } from "@expo/vector-icons";
import MemberAvatar from "../groups/MemberAvatar";
import { defaultAvatar } from "@/utils/defaultImage";

interface Props{
  application: Application
  approveAction: () => Promise<void>
  rejectAction: () => Promise<void>
  deleteAction: () => Promise<void>
  viewProfileAction: () => void
  isForUser: boolean
}

export default function ApplicationCard({application, approveAction, rejectAction, deleteAction, viewProfileAction, isForUser}: Props) {
  const handleDownload = (documentUrl: string) => {
    // Get file name from document URL or a default name
    const fileName = documentUrl.split("/").pop() || "document.pdf";
    // Assuming it's a PDF file, adjust the MIME type if necessary
    const mimeType = "application/pdf";

    downloadFileAndroid(documentUrl, fileName, mimeType);
  };

  return (
    <View
      className="flex flex-row items-center justify-between w-full p-3 bg-tertiary border-2 border-primary rounded-lg mb-3"
    >
      <View className="flex-1 m-2">
        {!isForUser &&
          <TouchableOpacity
            onPress={viewProfileAction}
          >
            <View className="flex flex-row">
              {application.imgUrl ? (
                <MemberAvatar imgUrl={application.imgUrl} />
              ) : (
                <MemberAvatar imgUrl={defaultAvatar} />
              )}
              <View className="ml-5 flex flex-col">
                <Text className="font-bmedium">{application.studentName}</Text>
                <Text className="font-bregular">{application.studentEmail}</Text>
              </View>
            </View>
            <View className="w-full h-[1px] bg-gray-300 my-4"></View>
          </TouchableOpacity>
        }

        <View className='flex flex-row items-center justify-between'>
          <Text className="font-bbold text-lg text-primary">
            {application.groupName}
          </Text>
        </View>
        <Text className="font-bmedium text-bsm text-primary">
          {application.groupPositionName}
        </Text>
        <View className="flex flex-col my-5 gap-2">
          <Text className="italic font-bregular text-bsm text-gray-500 mt-1">
            {application.requestContent}
          </Text>
          {application.documentUrl &&
            <TouchableOpacity 
              onPress={() => handleDownload(application.documentUrl)}
              className="flex flex-row items-center bg-gray-100 p-3 rounded-lg mb-2"
            >
              <Ionicons name="document-text-outline" size={24} color="#666" className="mr-2" />
              <Text className="flex-1 text-gray-700 ml-2">
                Download CV
              </Text>
            </TouchableOpacity>
          }
        </View>
        <View className="flex-row mb-3">
          <Text className="font-bregular text-bsm text-gray-500 mr-4">
            {dateTimeFormatter(application.requestTime)}
          </Text>
          <ApplicationStatusBadge status={application.status} />
        </View>
        

        {(!isForUser && application.status === 'Requested') && 
          <View className="flex flex-row items-center justify-center gap-2 mt-3 w-full">
            <View className="w-[120px]">
              <CustomButton
                title="Approve"
                variant="active"
                handlePress={approveAction}
                containerStyles=""
              />
            </View>
            <View className="w-[120px]">
              <CustomButton
                title="Reject"
                variant="secondary-outline"
                handlePress={rejectAction}
                containerStyles=""
              />
            </View>
          </View>
        }

        {application.status === "Requested" && isForUser && (
          <View className="flex flex-row items-center justify-center mt-3 w-full">
            <View className="w-[120px]">
              <CustomButton
                title="Delete"
                variant="delete"
                handlePress={deleteAction}
                containerStyles=""
              />
            </View>
          </View>
        )}
      </View>  
    </View>
  );
}
