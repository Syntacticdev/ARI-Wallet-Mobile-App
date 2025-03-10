import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { hp, wp } from '~/utils/helper';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';



const ConfirmAddressSheet = ({ refM, address }) => {
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const closeSheet = useCallback(() => {
        refM.current?.close()
    })

    const confirm = () => {
        router.push({ pathname: "/(drawer)/(tabs)/send", params: { address } })
        closeSheet()
    }

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                enableOverDrag={false}
                ref={refM}
                snapPoints={["50%"]}
                handleStyle={{ display: "none" }}
                handleComponent={() => (
                    <View style={{ flexDirection: "row", padding: hp(1.5) }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: hp(2.2) }}>Would you like to send money to the address below?</Text>
                        </View>
                        <Pressable onPress={closeSheet}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                )}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.contentContainer}>

                    <Text style={{ padding: hp(2), marginVertical: hp(1), borderRadius: hp(1), fontSize: hp(1.8) }} className='bg-green-100'>ARW7DuxnCN1k31DJaJ91nzqBKsk6YNMc1CL4oDYYvnjAy9xGLN1FA</Text>
                    <Text style={{ padding: hp(2), borderRadius: hp(1), fontSize: hp(1.5) }} className='text-red-400'>
                        * Coins sent to the wrong address cannot be found, so please enter them correctly.
                    </Text>

                    <View style={{ marginVertical: hp(2) }} className='flex-row justify-between items-center'>
                        <TouchableOpacity onPress={closeSheet} className='border  border-gray-800' style={[styles.actionBtn, { width: wp(30) }]}>
                            <Text style={{ fontSize: hp(2), fontWeight: "600" }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={confirm} className='border bg-gray-800 border-gray-800' style={[styles.actionBtn, { width: wp(60) }]}>
                            <Text style={{ fontSize: hp(2), fontWeight: "600", color: "#fff" }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
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

export default ConfirmAddressSheet;