import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetModal, BottomSheetView, BottomSheetModalProvider, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { hp, wp } from '~/utils/helper';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';



const TextInputBox = (props) => (
    <TextInput {...props} style={styles.input} className="border border-gray-400" placeholder='Please enter wallet name to save.' />
)

const AddAddressBook = ({ refM, setWalletId, walletAddress, walletName, setWalletAddress, setWalletName, actionType, setActionType, saveAddress }) => {
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);


    const closeSheet = useCallback(() => {
        refM.current?.close()
        setWalletId("")
        setWalletAddress("")
        setWalletName("")
        setActionType("add")
    })





    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                keyboardBehavior='extend'
                keyboardBlurBehavior='restore'
                index={1}
                // enableOverDrag={false}
                ref={refM}
                snapPoints={["82%"]}
                handleStyle={{ display: "none" }}
                handleComponent={() => (
                    <View style={{ flexDirection: "row", padding: hp(1.5) }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: hp(2.2) }}>{actionType == "add" ? "Add Address Book" : "Edit Address Book"}</Text>
                        </View>
                        <Pressable onPress={closeSheet}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                )}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <KeyboardAvoidingView style={{ gap: hp(2) }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                        <View className="gap-2">
                            <Text style={{ fontSize: hp(1.8) }}>Wallet name</Text>
                            <TextInput value={walletName} onChangeText={(text) => setWalletName(text)} style={styles.input} className="border border-gray-400" placeholder='Please enter wallet name to save.' />
                        </View>
                        <View className="gap-2">
                            <View className="flex-row justify-between">
                                <Text style={{ fontSize: hp(1.8) }}>Wallet Address</Text>

                                <TouchableOpacity onPress={() => router.push({ pathname: "/scan", params: { from: "address_book" } })}>
                                    <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <TextInput value={walletAddress} onChangeText={(text) => setWalletAddress(text)} style={styles.input} className="border border-gray-400" placeholder='Please enter wallet address to save.' />
                        </View>

                        <View style={{ marginVertical: hp(2) }} className='flex-row justify-between items-center'>
                            <TouchableOpacity onPress={closeSheet} className='border  border-gray-800' style={[styles.actionBtn, { width: wp(30) }]}>
                                <Text style={{ fontSize: hp(2), fontWeight: "600" }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={saveAddress} className='border bg-gray-800 border-gray-800' style={[styles.actionBtn, { width: wp(60) }]}>
                                <Text style={{ fontSize: hp(2), fontWeight: "600", color: "#fff" }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );

};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: hp(2),
        gap: hp(2)
    },
    actionBtn: {
        borderRadius: 100,
        padding: hp(1.7),
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        borderWidth: 1,
        borderRadius: hp(1),
        padding: hp(1),
        height: hp(6),
        fontSize: hp(2)
    }
});

export default AddAddressBook;