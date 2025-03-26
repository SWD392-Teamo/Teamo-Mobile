import React from "react"
import { Text, TouchableOpacity, StyleSheet, Platform, Image, ColorValue } from "react-native"
import * as WebBrowser from "expo-web-browser"

type ExternalLinkProps = {
  url: string     
  title?: string  
  icon?: any
  hideUrl: boolean
}

/**
 * - On native: opens in an in-app browser (via expo-web-browser).
 * - On web: opens in a new tab by default.
 */
export default function ExternalLink({ url, title, icon, hideUrl }: ExternalLinkProps) {
  const handlePress = async () => {
    if (Platform.OS === "web") {
      // On web, open the link in a new tab
      window.open(url, "_blank")
    } else {
      // On native, open in an in-app browser
      await WebBrowser.openBrowserAsync(url)
    }
  };

  return (
    <TouchableOpacity
      className="flex flex-row flex-wrap m-1.5"
      onPress={handlePress}
    >
      {icon && (
        <Image
          className="w-5 h-5 mr-3" 
          source={icon} 
        />
      )}
      <Text className="mr-3 text-black font-bold font-bregular text-bsm">{title} </Text>
      {!hideUrl &&
        <Text className="text-bsm font-bregular text-gray-600 underline">{url}</Text>
      }
      </TouchableOpacity>
  );
}
