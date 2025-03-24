import { createPost, deletePost, updatePost } from '@/actions/postAction';
import BackButton from '@/components/BackButton';
import ConfirmModal from '@/components/ConfirmModal';
import CustomButton from '@/components/CustomButton';
import FilePicker from '@/components/FilePicker';
import InputField from '@/components/InputField';
import { colors } from '@/constants/colors';
import { useGroupStore } from '@/hooks/useGroupStore';
import { useLoading } from '@/providers/LoadingProvider';
import { Post } from '@/types';
import convertDocument from '@/utils/DocumentConverter';
import { Ionicons } from '@expo/vector-icons';
import { DocumentPickerResponse } from '@react-native-documents/picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Image, SafeAreaView, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { useShallow } from 'zustand/shallow';

type PostProps = {
    post?: Post;
}

export default function PostForm({post}: PostProps) {
    const{ showLoading, hideLoading } = useLoading();
    const[confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [hasPost, setHasPost] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<File>();

    const { selectedGroup } = useGroupStore(
        useShallow((state) => ({
            selectedGroup: state.selectedGroup,
        }))
    );

    // Next navigation
    const router = useRouter();
    
    // Check if the document URL is an image
    const isImage = post?.documentUrl?.match(/\.(jpeg|jpg|gif|png)(\?.*)?$/i);

    // Set up form state
    const {control, handleSubmit, reset,
            formState: {isSubmitting, isValid}} = useForm({
                mode: 'onTouched'
            });

    // initialize form fields
    useEffect(() => {
        if (post) {
            setHasPost(true);
            const {content} = post
            reset({content});
        }
    }, [post, reset])

    async function handleDocumentUpload(document: DocumentPickerResponse) {
        setSelectedDocument(convertDocument(document))   
    }

    // On submit logic
    async function onSubmit(data: FieldValues) {
        try {
            showLoading();
            const formData = new FormData();

            formData.append('content', data.content);
            console.log(data.content)

            if (selectedDocument) {
                formData.append('document', selectedDocument);
            }

            let res;

            if (hasPost) {
                res = await updatePost(selectedGroup?.id!, post?.id!,formData);
              }
              else {
                res = await createPost(selectedGroup?.id!, formData);
              }

            if (res.error == undefined) {
                ToastAndroid.show((hasPost ? "Update" : "Create") + ' post succeeded', ToastAndroid.SHORT)
                router.push(`/groups/details/${selectedGroup?.id}/posts`);
            }
            else if (res.error.message.statusCode == 400){
                ToastAndroid.show(res.error.message.message, ToastAndroid.SHORT)
            }
        } catch (error: any) {
            ToastAndroid.show('Error occured: ' + error.message, ToastAndroid.SHORT)
        } finally {
            hideLoading();
        }
    }

    // On delete logic
    async function onDelete() {
        try {
            showLoading();
            if (post && selectedGroup) {
                await deletePost(selectedGroup?.id, post?.id)
            }
            ToastAndroid.show('Delete post succeeded', ToastAndroid.SHORT)
            router.push(`/groups/details/${selectedGroup?.id}/posts`);
        } catch (error: any) {
            ToastAndroid.show('Error occured: ' + error.message, ToastAndroid.SHORT)
        } finally {
            hideLoading();
        }
    }

  return (
    <SafeAreaView>
        <ScrollView>
            <View className='w-full flex justify-content-center'>  
                <View className="m-5 ml-5">
                    <View className="flex flex-row justify-content-start mt-2">
                        <BackButton url={`/groups/details/${selectedGroup?.id}/posts`}/>
                        <Text className="ml-5 text-bsm font-blight">Posts</Text>
                    </View >
                    <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Upload Post</Text>
                </View>
                <View className="m-5">
                    <InputField 
                        title='Content' 
                        name='content' control={control}
                        showlabel='true'
                        multiline={true}
                        rows={5}
                        rules={{
                            required: 'Please provide your post content'
                        }} 
                    />

                    {isImage && post?.documentUrl && (
                        <View className="mb-3 rounded-lg overflow-hidden">
                            <Image 
                                source={{ uri: post.documentUrl }} 
                                className="w-full h-64"
                                resizeMode="cover"
                            />
                        </View>
                    )}

                    <View className="mt-3 pt-3">
                        {post?.documentUrl && !isImage && (
                            <View className="flex flex-row items-center bg-gray-100 p-3 rounded-lg mb-2">
                                <Ionicons name="document-text-outline" size={24} color="#666" className="mr-2" />
                                <Text className="flex-1 text-gray-700 ml-2">
                                {post?.documentUrl.split("/").pop() || "Attached document"}
                                </Text>
                            </View>
                        )}
                        <View className="mt-5">
                            <Text className="text-base text-grey font-bmedium mb-3">Upload Document</Text>
                            <FilePicker
                                onFileSelect={handleDocumentUpload}
                                accept={["*/*"]}
                                placeholder="Upload Document"
                                showLabel={true}
                                multiple={false}
                                showFileName={true}
                            />
                        </View>
                    </View>
                    <View className='mt-5'>
                        <CustomButton
                            title='Submit'
                            handlePress={handleSubmit(onSubmit)}
                            variant='primary-outline'
                            containerStyles='w-full mt-7'
                            isLoading={isSubmitting}
                            isNotValid={!isValid || isLoading}
                            spinnerColor={colors.light.tint}
                        />
                    </View>
                    {hasPost &&
                        <View className='mt-5'>
                            <CustomButton
                                title='Delete'
                                handlePress={() => setConfirmModalVisible(true)}
                                variant='secondary'
                                containerStyles='w-full mt-7'
                            />
                        </View>
                    }
                </View>
            </View>
        </ScrollView>
        {/*Confirm modal for post deletion */}
        <ConfirmModal
            isVisible={confirmModalVisible}
            title="Confirm Removal"
            message={`Are you sure you want to delete this post ?`}
            onConfirm={() => {
                setConfirmModalVisible(false);
                onDelete();
            }}
            onCancel={() => setConfirmModalVisible(false)}
      />
    </SafeAreaView>
  )
}