import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { hp, wp } from '../utils/helper';
import { router, Stack, useLocalSearchParams } from 'expo-router';

export default function Scan() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    const { from } = useLocalSearchParams()

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Stack.Screen options={{
                    title: "Scan QR",
                    headerStyle: {
                        backgroundColor: "#1f2937",
                    },
                    headerTintColor: "#fff"
                }} />
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity style={{ width: wp(70), padding: hp(2), borderRadius: 100 }} onPress={requestPermission} className="bg-gray-800">
                    <Text style={{ fontSize: hp(2) }} className="text-white text-center">Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const doneScanning = (data) => {
        if (from == "index") {
            router.dismissTo({ pathname: "/(drawer)/(tabs)/", params: { address: data } })
        }

        if (from == "asset") {
            router.dismissTo({ pathname: "/(drawer)/(tabs)/send", params: { address: data } })
        }

        if (from == "send") {
            router.dismissTo({ pathname: "/(drawer)/(tabs)/send", params: { address: data } })
        }

        if (from == "address_book") {
            router.dismissTo({ pathname: "/(drawer)/(tabs)/address_book", params: { address: data } })

        }
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                title: "Scan QR",
                headerStyle: {
                    backgroundColor: "#1f2937",
                },
                headerTintColor: "#fff"
            }} />
            <CameraView
                collapsable={true}
                barcodeScannerSettings={{
                    barCodeSize: {
                        width: 200,
                        height: 200
                    },
                    barCodePoint: {
                        x: 0.5, // center horizontally
                        y: 0.5  // center vertically
                    }
                }}
                mirror={true}
                onBarcodeScanned={(result) => doneScanning(result.data)}
                style={styles.camera}
                facing={facing}
            >
                <View style={styles.overlayContainer}>
                    <View style={styles.overlay} />

                    <View style={styles.centerRow}>
                        <View style={styles.overlay} />
                        <View style={styles.scanWindow}>
                            <View style={styles.cornerTL} />
                            <View style={styles.cornerTR} />
                            <View style={styles.cornerBL} />
                            <View style={styles.cornerBR} />
                        </View>
                        <View style={styles.overlay} />
                    </View>

                    <View style={styles.overlay}>
                        <Text style={styles.scanText}>Scan address code to send funds.</Text>
                    </View>
                </View>
            </CameraView>
        </View>
    );
}

const WINDOW_SIZE = 200;
const BORDER_WIDTH = 3;
const CORNER_SIZE = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },

    overlayContainer: {
        flex: 1,
    },
    centerRow: {
        flexDirection: 'row',
        // height: WINDOW_SIZE,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    scanWindow: {
        width: WINDOW_SIZE,
        height: WINDOW_SIZE,
    },
    scanText: {
        color: '#fff',
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 16,
    },
    cornerTL: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        borderLeftWidth: BORDER_WIDTH,
        borderTopWidth: BORDER_WIDTH,
        borderColor: '#fff',
    },
    cornerTR: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        borderRightWidth: BORDER_WIDTH,
        borderTopWidth: BORDER_WIDTH,
        borderColor: '#fff',
    },
    cornerBL: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        borderLeftWidth: BORDER_WIDTH,
        borderBottomWidth: BORDER_WIDTH,
        borderColor: '#fff',
    },
    cornerBR: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        borderRightWidth: BORDER_WIDTH,
        borderBottomWidth: BORDER_WIDTH,
        borderColor: '#fff',
    },
});
