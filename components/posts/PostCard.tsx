import Divider from "@/components/Divider";
import UserAvatar from "@/components/UserAvatar";
import { usePostStore } from "@/hooks/usePostStore";
import { Post } from "@/types";
import { defaultAvatar } from "@/utils/defaultImage";
import { Link, router } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import CustomButton from "@/components/CustomButton";
import icons from "@/constants/icons";
import { downloadFileAndroid } from "@/utils/FileDownloader";
import { colors } from "@/constants/colors";
import { useGroupStore } from "@/hooks/useGroupStore";
import { useShallow } from "zustand/shallow";
import { useGlobalContext } from "@/providers/AuthProvider";

type Props = {
  post: Post;
  onViewProfile: () => void;
}


export default function PostCard({post, onViewProfile}: Props) {
  const { currentUser } = useGlobalContext();
  const { setSelectedPost } = usePostStore();

  const { selectedGroup } = useGroupStore(
      useShallow((state) => ({
          selectedGroup: state.selectedGroup,
      }))
  );

  const handleDetailsClick = () => {
    setSelectedPost(post);
  };

  const handleDownload = (documentUrl: string) => {
    // Get file name from document URL or a default name
    const fileName = documentUrl.split("/").pop() || "document.pdf";
    // Assuming it's a PDF file, adjust the MIME type if necessary
    const mimeType = "application/pdf";

    downloadFileAndroid(documentUrl, fileName, mimeType);
  };

  // Format the date to a relative time (like "5 minutes ago")
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  // Check if the document URL is an image
  const isImage = post.documentUrl?.match(/\.(jpeg|jpg|gif|png)(\?.*)?$/i);

  return (
    <View className="w-full border-2 border-primary p-4 rounded-xl bg-white mb-4 shadow-sm">
      <View>
        {/* Header: User info and post time */}
        <View className="flex flex-row items-center justify-between mb-3">
          <TouchableOpacity 
            onPress={onViewProfile}
            className="flex flex-row items-center gap-3"
          >
            <UserAvatar 
              imgUrl={post?.groupMemberImgUrl || defaultAvatar}  
            />
            <View>
              <Text className="font-bold text-primary text-lg">
                {post?.groupMemberName}
              </Text>
              <Text className="text-gray-500 text-xs">{formattedDate}</Text>
            </View>
          </TouchableOpacity>
          {currentUser?.id == post.studentId &&
            <TouchableOpacity onPress={() => {router.push(`/groups/details/${selectedGroup?.id}/posts/update/${post.id}`)}}>
              <MaterialCommunityIcons name="dots-horizontal" size={24} color="gray" />
            </TouchableOpacity>
          }
        </View>

        {/* Post content */}
        <View className="mb-3 w-full">
          <View className="min-w-[370px] flex flex-row flex-wrap">
              <Text className="text-base leading-5 mb-2">{post?.content}</Text>
          </View>
          
          {/* Display post group info (if needed) */}
          <Link className="bg-gray-100 rounded-lg p-2 mt-2"
            href={{
              pathname: '/(tabs)/groups/details/[id]', 
              params: {id: post.groupId}
            }}>
              <View className="flex flex-row items-center">
                <Ionicons name="people" size={16} color="#666" />
                <Text className="text-sm text-gray-700 ml-2">Group: {post?.groupName}</Text>
              </View>
          </Link>
        </View>

        {/* Image content - only shown if documentUrl is an image */}
        {isImage && post.documentUrl && (
          <View className="mb-3 rounded-lg overflow-hidden">
            <Image 
              source={{ uri: post.documentUrl }} 
              className="w-full h-64"
              resizeMode="cover"
            />
          </View>
        )}

        {/* Document download section - only shown if documentUrl exists and is NOT an image */}
          {post.documentUrl && !isImage && (
              <View className="mt-3 pt-3">
              <View className="flex flex-row items-center bg-gray-100 p-3 rounded-lg mb-2">
                  <Ionicons name="document-text-outline" size={24} color="#666" className="mr-2" />
                  <Text className="flex-1 text-gray-700 ml-2">
                  {post.documentUrl.split("/").pop() || "Attached document"}
                  </Text>
              </View>
              <CustomButton
                  title="Download Document"
                  variant="secondary-outline"
                  icon={icons.download}
                  iconColor={colors.light.icon}
                  handlePress={() => handleDownload(post.documentUrl!)}
                  containerStyles="w-full mt-1"
              />
              </View>
          )}  
      </View>
    </View>
  );
};