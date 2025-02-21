import { Text, View } from 'react-native'
import ProfileInformation from './ProfileInformation'
import { format } from 'date-fns';
import { Profile } from '@/types';
import Divider from '@/components/Divider';
import ExternalLink from '@/components/ExternalLink';
import ProfileLinks from './ProfileLinks';

interface ProfileDetailsProps {
    profile: Profile | null;
}

const ProfileDetails = ({profile} : ProfileDetailsProps) => {
    const formattedDob = profile?.dob? format(profile.dob, 'dd-MM-yyyy') : '';

    return(
        <View>
            {/* Profile information section */}
            { profile ? (
                <View>
                    <ProfileInformation name='Code' description={profile?.code}/>
                    <ProfileInformation name='Major' description={profile?.majorCode}/>
                    <ProfileInformation name='Email' description={profile?.email}/>
                    <ProfileInformation name='Gender' description={profile?.gender}/>
                    <ProfileInformation name='D.O.B' description={formattedDob}/>
                </View>
            ) : (
                <View>
                    <Text className="text-center text-primary font-bmedium text-pxl">
                        Cannot Retrieve User Profile
                    </Text>
                </View>
            )}

            <Divider />
            
            {/* Profile skills section */}
            <View className='flex flex-row mt-10 ml-20 justify-content-start'>
                <Text className="mb-1 text-pl font-bsemibold text-black">Skills</Text>
            </View>

            <Divider />

            {/* Profile links section */}
            <View className='flex flex-row mt-10 ml-20 justify-content-start'>
                <Text className="mb-1 text-pl font-bsemibold text-black">Links</Text>
                <ProfileLinks links={profile?.links}/>
            </View>
        </View>
    )
}

export default ProfileDetails