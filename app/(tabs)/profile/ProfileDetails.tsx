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
    return(
        <View>
            {/* Profile information section */}
            { profile ? (
                <View className='pl-5'>
                    <Text className="mb-2 text-bm font-bsemibold text-black">About</Text>
                    <ProfileInformation name='Code' description={profile?.code}/>
                    <ProfileInformation name='Major' description={profile?.majorCode}/>
                    <ProfileInformation name='Email' description={profile?.email}/>
                    <ProfileInformation name='Gender' description={profile?.gender}/> 
                    <ProfileInformation name='D.O.B' description={
                        dateFormatter(profile.dob)
                    }/>
                </View>
            ) : (
                <View className='pl-5'>
                    <Text className="text-center text-primary font-bmedium text-bxl">
                        Cannot Retrieve User Profile
                    </Text>
                </View>
            )} 

            <Divider />
            
            {/* Profile skills section */}
            <View className='mt-2 pl-4 justify-content-start'>
                <Text className="mb-2 text-bm font-bsemibold text-black">Skills</Text>
                <View className='flex flex-row flex-wrap'>
                    <ProfileSkills skills={profile?.studentSkills}/>
                </View>
            </View>

            <Divider />

            {/* Profile links section */}
            <View className='mt-2 mb-2 pl-4 justify-content-start'>
                <Text className="mb-2 text-bm font-bsemibold text-black">Links</Text>
                <View className='flex flex-row flex-wrap'>
                    <ProfileLinks links={profile?.links}/>
                </View>
            </View>
        </View>
    )
}

export default ProfileDetails