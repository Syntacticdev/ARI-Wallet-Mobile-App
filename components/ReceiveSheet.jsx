import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { copyToClipboard, hp, wp } from '~/utils/helper';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';



const ReceiveSheet = ({ refM }) => {
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const closeSheet = useCallback(() => {
        refM.current?.close()
    })

    const share = async () => {
        try {
            const result = await Share.share({
                message: "ARW7DuxnCN1k31DJaJ91nzqBKsk6YNMc1CL4oDYYvnjAy9xGLN1FA",
                title: 'Share Your Address'
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    }

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal

                enableOverDrag={false}
                ref={refM}
                snapPoints={["58%"]}
                handleStyle={{ display: "none" }}
                handleComponent={() => (
                    <View style={{ flexDirection: "row", padding: hp(1.5) }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: hp(2.2) }}>Receive</Text>
                        </View>
                        <Pressable onPress={closeSheet}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                )}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <QRCode
                            value="ARW7DuxnCN1k31DJaJ91nzqBKsk6YNMc1CL4oDYYvnjAy9xGLN1FA"
                            size={hp(14)}
                        />
                    </View>
                    <View style={{ marginTop: hp(1) }}>
                        <View className='flex-row items-center gap-2'>
                            <Text style={{ fontSize: hp(1.8) }} className='font-bold'>My Address</Text>
                            <FontAwesome name="question-circle" size={24} color="black" />
                        </View>

                        <Text style={{ padding: hp(2), marginVertical: hp(1), borderRadius: hp(1), fontSize: hp(1.8) }} className='bg-green-100'>ARW7DuxnCN1k31DJaJ91nzqBKsk6YNMc1CL4oDYYvnjAy9xGLN1FA</Text>
                    </View>

                    <View style={{ marginVertical: hp(2) }} className='flex-row justify-between items-center'>
                        <TouchableOpacity onPress={() => share()} className='border  border-gray-800' style={[styles.actionBtn, { width: wp(30) }]}>
                            <Text style={{ fontSize: hp(2), fontWeight: "600" }}>SHARE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => copyToClipboard("ARW7DuxnCN1k31DJaJ91nzqBKsk6YNMc1CL4oDYYvnjAy9xGLN1FA")} className='border bg-gray-800 border-gray-800' style={[styles.actionBtn, { width: wp(60) }]}>
                            <Text style={{ fontSize: hp(2), fontWeight: "600", color: "#fff" }}>COPY</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 10
    },
    contentContainer: {
        flex: 1,
        padding: hp(2)
    },
    actionBtn: {
        borderRadius: 100,
        padding: hp(1.7),
        justifyContent: "center",
        alignItems: "center"
    }
});

export default ReceiveSheet;