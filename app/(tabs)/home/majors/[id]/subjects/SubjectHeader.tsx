import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import { Major } from "@/types";
import React from "react";
import { Text, View } from "react-native";

interface Props{
    major: Major
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function MajorHeader({major, setSearch}:Props) {
    return (
        <View>
            <View>
                <BackButton
                    url="majors"
                />
                <Text className="text-bsm font-bmedium text-primary">{major.code}</Text>
            </View>
            <View>
                <SearchBar 
                    setSearch = {setSearch}
                />
            </View>
        </View>
    )
}