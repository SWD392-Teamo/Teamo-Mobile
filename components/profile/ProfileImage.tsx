import { useGlobalContext } from "@/providers/AuthProvider";
import { Image } from "react-native";

interface ProfileImageProps{
    imgUrl: string | undefined
}

const {currentUser} = useGlobalContext();

const ProfileImage = ({imgUrl} : ProfileImageProps) => {
    return(
        <Image
            style={{
                width: 96, //w-24
                height: 96, //h-24
                borderRadius: 48, // Half of width/height to make it circular
                borderWidth: 2,
                borderColor: "#A0A0A0", //border-darkgrey
                resizeMode: "cover" //object-cover
            }}
            source={{uri: imgUrl}}
            alt="Profile"
        />
    )
}

export default ProfileImage