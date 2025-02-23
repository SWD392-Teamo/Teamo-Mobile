import React from "react";
import { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface Props{
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({setSearch}:Props) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setSearch(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Search..."
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Ionicons name="search" size={24} color="#4B5563" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 24, // ~ mt-6
      width: '50%',  // ~ w-1/2
      position: 'relative',
    },
    input: {
      width: '100%',
      paddingVertical: 12,  // ~ py-3
      paddingLeft: 40,      // ~ pl-10
      paddingRight: 60,     // ~ pr-24
      borderRadius: 9999,   // ~ rounded-full
      borderWidth: 1,       // ~ border
      borderColor: '#D1D5DB', // ~ border-gray-300
      fontSize: 18,         // ~ text-lg
      color: '#4B5563',     // ~ text-gray-600
    },
    button: {
      position: 'absolute',
      right: 4,
      top: '50%',
      transform: [{ translateY: -16 }], // ~ half of p-3 for center alignment
      backgroundColor: '#E2EFFF',
      padding: 12,    // ~ p-3
      borderRadius: 9999, // ~ rounded-full
    },
});