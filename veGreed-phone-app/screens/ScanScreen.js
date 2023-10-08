import React, { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet, SafeAreaView } from "react-native";
import ScannerView from "./QRCode/ScannerView";
import { StatusBar } from "expo-status-bar";
import { useQRStore } from "../store/useQRstore";

export default function ScanScreen({ navigation }) {


    const [scanned, setScanned] = useState(false);

    const setQRData = useQRStore(state => state.setQRData)

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setQRData(data)
        navigation.navigate('Credentials')
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='inverted' />

            <BarCodeScanner
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
            {scanned && (
                <ScannerView scanned={scanned} />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',  // Set te background color to black
    },
});