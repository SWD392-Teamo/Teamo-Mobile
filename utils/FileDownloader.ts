import { Platform, PermissionsAndroid, Alert, ToastAndroid } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';

/**
 * Downloads a file to Android's download directory.
 * 
 * @param {string} fileUrl - The URL of the file to be downloaded.
 * @param {string} fileName - The desired name of the downloaded file.
 * @param {string} mimeType - The MIME type of the file (e.g., 'application/pdf').
 */
export const downloadFileAndroid = async (fileUrl: string, fileName: string, mimeType: string) => {
    // Request storage permission for Android
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download files',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
          buttonNeutral: 'Ask me later',
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Storage permission is required to download files.');
        return;
      }
    }

    const { config, fs } = RNFetchBlob;
    const downloadsDir = fs.dirs.DownloadDir; // Path to Android's downloads directory
    const filePath = `${downloadsDir}/${fileName}`; // Full file path

    // Configure the download request
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // Use Android's built-in Download Manager
        notification: true,       // Show download notification in the notification bar
        path: filePath,           // The path where the file will be saved
        description: 'Downloading file...',
        mime: mimeType,           // MIME type of the file (e.g., 'application/pdf')
        mediaScannable: true,     // Make the file visible in the Downloads app
      },
    };

    // Start downloading the file - properly await the result
    const res = await config(options).fetch('GET', fileUrl);
    ToastAndroid.show('Download file succeeded', ToastAndroid.SHORT)
    
    return res.path();
};