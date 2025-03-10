import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { hp, wp } from '~/utils/helper';
import { AntDesign } from '@expo/vector-icons';
import addressBookList from "~/constants/data/addressBook"

const AddressBookSheet = ({ refM, setReceiverAddress }) => {
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const closeSheet = useCallback(() => {
        refM.current?.close()
    })

    const updateAddress = (address) => {
        setReceiverAddress(address)
        closeSheet()
    }

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={refM}
                snapPoints={["50%", "100%"]}
                handleStyle={{ display: "none" }}
                handleComponent={() => (
                    <View style={{ flexDirection: "row", padding: hp(1.5) }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: hp(2.2) }}>Select Address Book</Text>
                        </View>
                        <Pressable onPress={closeSheet}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                )}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <View style={{ gap: hp(2) }}>
                        {addressBookList?.map((data) => (
                            <TouchableOpacity onPress={() => updateAddress(data?.walletAddress)} key={data.id}>
                                <View className='flex bg-white' style={styles.abCard}>
                                    <Text>{data?.walletName}</Text>
                                    <View style={{ height: hp(0.1), marginVertical: hp(1) }} className="bg-gray-500" />
                                    <Text style={{ fontSize: hp(1.8) }}>{data?.walletAddress}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    abCard: {
        height: hp(14),
        borderWidth: .5,
        borderRadius: hp(2),
        padding: hp(1.5)
    },
    contentContainer: {
        flex: 1,
        padding: hp(2)
    },
});

export default AddressBookSheet;