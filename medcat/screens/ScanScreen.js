import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import TesseractOcr, { LANG_ENGLISH, useEventListener } from "react-native-tesseract-ocr";

const ScanScreen = ({navigation}) => {
    // OCR
    const [recognizedText, setRecognizedText] = useState('');
    const [loading, setLoading] = useState(false);

    const selectImage = async () => {
        try {
        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            performOCR(result.uri);
        }
        } catch (error) {
        console.error('Error selecting image:', error);
        }
    };

    const performOCR = async (imageUri) => {
        try {
        setLoading(true);
        const recognizedText = await TesseractOcr.recognize(imageUri, LANG_ENGLISH);
        setRecognizedText(recognizedText);
        } catch (error) {
        console.error('Error recognizing text:', error);
        } finally {
        setLoading(false);
        }
    };

    // Use this event listener to get progress updates
    useEventListener('onProgressChange', (e) => {
        console.log('Progress:', e.progress); // e.progress is a number between 0 and 100
    });

    return(
        <View style={styles.container}>
             <Button title="Select Image" onPress={selectImage} disabled={loading} />
            {loading && <Text>Loading...</Text>}
            {recognizedText ? (
                <View style={{ marginTop: 20 }}>
                <Text>Recognized Text:</Text>
                <Text>{recognizedText}</Text>
                </View>
            ) : null}  
        </View>
    );
};

export default ScanScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});