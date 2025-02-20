import React from "react"
import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native"
import * as WebBrowser from "expo-web-browser"

type ExternalLinkProps = {
  url: string     
  title?: string  
}

/**
 * - On native: opens in an in-app browser (via expo-web-browser).
 * - On web: opens in a new tab by default.
 */
export default function ExternalLink({ url, title }: ExternalLinkProps) {
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
      style={[styles.linkContainer, { flexDirection: "row", alignItems: "center" }]}
      onPress={handlePress}
    >
      <Text style={styles.titleText}>{title} </Text>
      <Text style={styles.linkText}>{url}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    marginVertical: 6
  },
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
    fontSize: 15
  },
  titleText: {
    color: "#1C1C1C",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 2,
    fontFamily: "Poppins-Regular"
  }
})
