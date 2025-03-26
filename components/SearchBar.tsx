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
        <Ionicons name="search" size={15} color="#4B5563" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 5,
      width: '60%',  
      position: 'relative'
    },
    input: {
      width: '100%',
      paddingVertical: 12, 
      paddingLeft: 20,      
      paddingRight: 20,     
      borderRadius: 9999,   
      borderWidth: 1,       
      borderColor: '#D1D5DB', 
      fontSize: 15,         
      color: '#4B5563'     
    },
    button: {
      position: 'absolute',
      right: 6,
      top: '40%',
      transform: [{ translateY: -16 }], 
      backgroundColor: '#E2EFFF',
      padding: 12,   
      borderRadius: 9999
    },
});