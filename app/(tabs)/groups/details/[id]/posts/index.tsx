import BackButton from '@/components/BackButton';
import CustomButton from '@/components/CustomButton';
import PostsListing from '@/components/posts/PostsListing';
import { icons } from '@/constants';
import { colors } from '@/constants/colors';
import { useGroupStore } from '@/hooks/useGroupStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useShallow } from 'zustand/shallow';

export default function GroupsPost() {
    const router = useRouter();

    const { selectedGroup } = useGroupStore(
        useShallow((state) => ({
            selectedGroup: state.selectedGroup,
        }))
    );

    return (
      <SafeAreaView>
        <ScrollView>
          <View className="m-2 ml-5">
            <View className="flex flex-row justify-content-start align-middle">
                <BackButton url={`groups/details/${selectedGroup?.id}`} />
                <Text className="ml-5 text-bsm font-blight">{selectedGroup?.name}</Text>
            </View >
            <CustomButton
                title="Upload Post"
                handlePress={() => router.push(`/groups/details/${selectedGroup?.id}/posts/create`)}
                icon={icons.plus}
                iconColor={colors.dark.icon}
                variant="secondary"
                containerStyles='w-full'
            />
          </View>
          <PostsListing />
        </ScrollView>
      </SafeAreaView>
    )
}
