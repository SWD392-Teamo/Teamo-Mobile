import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import React from "react";
import { View } from "react-native";

interface Props{
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function MajorHeader({setSearch}:Props) {
    return (
        <View>
            <View>
                <BackButton
                    url="home"
                />
            </View>
            <View>
                <SearchBar 
                    setSearch = {setSearch}
                />
            </View>
        </View>
    )
}