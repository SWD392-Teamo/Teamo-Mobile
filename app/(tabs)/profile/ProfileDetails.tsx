import { Text, View } from 'react-native'
import ProfileInformation from './ProfileInformation'
import { format } from 'date-fns';
import { Profile } from '@/types';
import Divider from '@/components/Divider';
import ProfileLinks from './ProfileLinks';
import ProfileSkills from './ProfileSkills';
import dateFormatter from '@/utils/dateFormatter';

interface ProfileDetailsProps {
    profile: Profile | null;
}

const ProfileDetails = ({profile} : ProfileDetailsProps) => {
    const formattedDob = profile?.dob? format(profile.dob, 'dd-MM-yyyy') : '';

    return(
        <View>
            {/* Profile information section */}
            { profile ? (
                <View className='ml-20'>
                    <ProfileInformation name='Code' description={profile?.code}/>
                    <ProfileInformation name='Major' description={profile?.majorCode}/>
                    <ProfileInformation name='Email' description={profile?.email}/>
                    <ProfileInformation name='Gender' description={profile?.gender}/> 
                    <ProfileInformation name='D.O.B' description={
                        dateFormatter(profile.dob)
                    }/>
                </View>
            ) : (
                <View>
                    <Text className="text-center text-primary font-pmedium text-pxl">
                        Cannot Retrieve User Profile
                    </Text>
                </View>
            )} 

            <Divider />
            
            {/* Profile skills section */}
            <View className='flex flex-row mt-10 ml-20 justify-content-start'>
                <Text className="mb-1 text-pl font-psemibold text-black">Skills</Text>
                <View className='ml-10'>
                    <ProfileSkills skills={profile?.studentSkills}/>
                </View>
            </View>

            <Divider />

            {/* Profile links section */}
            <View className='flex flex-row mt-10 ml-20 justify-content-start'>
                <Text className="mb-1 text-pl font-psemibold text-black">Links</Text>
                <View className='ml-10'>
                    <ProfileLinks links={profile?.links}/>
                </View>
            </View>
        </View>
    )
}

export default ProfileDetails