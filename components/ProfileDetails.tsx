import { Text, View } from 'react-native'
import ProfileDetailCard from './ProfileDetailCard'
import { format } from 'date-fns';

interface ProfileDetailsProps {
    code: string | undefined
    majorCode: string | undefined
    email: string | undefined
    gender: string | undefined
    dob: Date | undefined
}

const ProfileDetails = ({code, majorCode, email, gender, dob} : ProfileDetailsProps) => {
    const formattedDob = dob? format(dob, 'dd-MM-yyyy') : '';

    return(
        <View >
            <ProfileDetailCard name='Code' description={code}/>
            <ProfileDetailCard name='Major' description={majorCode}/>
            <ProfileDetailCard name='Email' description={email}/>
            <ProfileDetailCard name='Gender' description={gender}/>
            <ProfileDetailCard name='D.O.B' description={formattedDob}/>
        </View>
    )
}

export default ProfileDetails