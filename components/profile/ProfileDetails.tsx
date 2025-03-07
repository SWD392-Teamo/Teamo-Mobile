import { Text, View } from 'react-native'
import ProfileInformation from './ProfileInformation'
import { Link, Profile, Skill, StudentSkill } from '@/types';
import Divider from '@/components/Divider';
import ProfileLinks from './ProfileLinks';
import ProfileSkills from './ProfileSkills';
import dateFormatter from '@/utils/dateFormatter';
import { useGlobalContext } from '@/providers/AuthProvider';
import CustomButton from '../CustomButton';
import { icons } from '@/constants';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { useState } from 'react';

interface ProfileDetailsProps {
    profile: Profile | null;
}

const {currentUser} = useGlobalContext()

const ProfileDetails = ({profile} : ProfileDetailsProps) => {
    const [skills, setSkills] = useState<StudentSkill[]>(profile?.studentSkills || []) 
    const [links, setLinks] = useState<Link[]>(profile?.links || [])

    async function onEditSkills() {
        setSkills(profile?.studentSkills || [])
        router.push('/EditProfileSkills')
    }

    async function onEditLinks() {
        setLinks(profile?.links || [])
        router.push('/EditProfileLinks')
    }

    return(
        <View>
            {/* Profile information section */}
            { profile ? (
                <View className='ml-10'>
                    <Text className="mb-2 text-bm font-bsemibold text-black">About</Text>
                    <ProfileInformation name='Code' description={profile?.code}/>
                    <ProfileInformation name='Major' description={profile?.majorCode}/>
                    <ProfileInformation name='Email' description={profile?.email}/>
                    {currentUser?.id == profile.id && (
                        <>
                            <ProfileInformation name='Gender' description={profile?.gender}/> 
                            <ProfileInformation name='D.O.B' description={dateFormatter(profile.dob)}/>
                        </>
                    )}
                </View>
            ) : (
                <View>
                    <Text className="text-center text-primary font-bmedium text-bxl">
                        Cannot Retrieve User Profile
                    </Text>
                </View>
            )} 

            <Divider />
            
            {/* Profile skills section */}
            <View className='mt-2 ml-10 justify-content-start'>
                <View className='flex flex-row flex-wrap'>
                    <Text className="mb-2 text-bm font-bsemibold text-black">Skills</Text>
                    {currentUser?.id == profile?.id && (
                        <View className="w-10 mr-5">
                                <CustomButton
                                    title=""
                                    variant="default"
                                    icon={icons.trashCan}
                                    iconColor={colors.light.icon}
                                    handlePress={onEditSkills}
                                    containerStyles="w-full"
                                />
                        </View>
                    )}
                </View>
                <View className='flex flex-row flex-wrap'>
                    <ProfileSkills skills={profile?.studentSkills}/>
                </View>
            </View>

            <Divider />

            {/* Profile links section */}
            <View className='mt-2 mb-2 ml-10 justify-content-start'>
                <View className='flex flex-row flex-wrap'>
                    <Text className="mb-2 text-bm font-bsemibold text-black">Links</Text>
                    {currentUser?.id == profile?.id && (
                        <View className="w-10 mr-5">
                            <CustomButton
                                title=""
                                variant="default"
                                icon={icons.trashCan}
                                iconColor={colors.light.icon}
                                handlePress={onEditLinks}
                                containerStyles="w-full"
                            />
                        </View>
                    )}
                </View>
                <View className='flex flex-row flex-wrap'>
                    <ProfileLinks links={profile?.links}/>
                </View>
            </View>
        </View>
    )
}

export default ProfileDetails