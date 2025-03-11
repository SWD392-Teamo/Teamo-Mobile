import { sendApplication, uploadApplicationDocument } from '@/actions/applicationAction';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { colors } from '@/constants/colors';
import { useLoading } from '@/providers/LoadingProvider';
import convertDocument from '@/utils/DocumentConverter';
import { DocumentPickerResponse } from '@react-native-documents/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Text, ToastAndroid, View } from 'react-native';
import FilePicker from '../FilePicker';

interface ApplicationFormProps {
    groupPositionId: number;
    groupId: number;
    majorId: number;
    subjectId: number
  }

export default function ApplicationForm({
    groupPositionId,
    groupId,
    majorId,
    subjectId
}: ApplicationFormProps) {
    const{ showLoading, hideLoading } = useLoading();
    const [isLoading, setLoading] = useState(false);
    const [documentUrl, setDocumentUrl] = useState<string>('');

    // Next navigation
    const router = useRouter();

    // Set up form state
    const {control, handleSubmit,
            formState: {isSubmitting, isValid}} = useForm({
                mode: 'onTouched'
            });

    async function handleDocumentUpload(document: DocumentPickerResponse) {
        const formData = new FormData();
        formData.append('document', convertDocument(document));
        setLoading(true);
        const res = await uploadApplicationDocument(formData);
        
        if (res.statusCode == 200) {
            const url = res.details;
            setDocumentUrl(url);
            ToastAndroid.show("Document uploaded successfully!", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("Document upload failed!", ToastAndroid.SHORT);
        }

        setLoading(false)
    }

    // On submit logic
    async function onSubmit(data: FieldValues) {
        try {
            showLoading();
            const res = await sendApplication(groupId, {
                ...data,
            documentUrl
            })
            if (res.statusCode == 200) {
                ToastAndroid.show('Send application succeeded', ToastAndroid.SHORT)
                router.push(`home/majors/${majorId}/subjects/${subjectId}/groups/details/${groupId}` as `/?${string}`);
            }
            else {
                ToastAndroid.show('Send application failed', ToastAndroid.SHORT)
            }
        } catch (error: any) {
            ToastAndroid.show('Send application failed: ' + error.message, ToastAndroid.SHORT)
        } finally {
            hideLoading();
        }
    }

  return (
    <View>
        <InputField 
            title='Request' 
            name='requestContent' control={control}
            showlabel='true'
            multiline={true}
            rows={4}
            rules={{
                required: 'Please provide your request content',
                minLength: {
                    value: 10,
                    message: 'Content must be at least 10 characters'
                }
            }} 
        />

        <Controller
            name="groupPositionId"
            control={control}
            defaultValue={groupPositionId}
            render={() => (<></>)}
        />

        <View className="mt-5">
          <Text className="text-base text-grey font-bmedium mb-3">Add Your CV (.PDF only)</Text>
          <FilePicker
            onFileSelect={handleDocumentUpload}
            accept={["application/pdf"]}
            placeholder="Upload CV"
            hasIcon={true}
            multiple={false}
            showFileName={true}
          />
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
    </View>
  )
}