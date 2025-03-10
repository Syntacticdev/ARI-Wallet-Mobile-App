import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DrawerActions } from '@react-navigation/native'
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router'
import { hp, wp } from '../../../utils/helper'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import AddBookSheet from '../../../components/AddBookSheet'
import AddressBookCard from '../../../components/AddressBookCard'
import addressBookList from "~/constants/data/addressBook.js"

const AddressBook = () => {
    const [addressBook, setAddressBook] = useState([])  // Initialize with default list
    const [actionType, setActionType] = useState("add")
    const [walletId, setWalletId] = useState("")
    const [walletName, setWalletName] = useState(null)
    const [walletAddress, setWalletAddress] = useState("")
    const { address } = useLocalSearchParams()

    const navigation = useNavigation()

    const bottomSheetModalRef = useRef(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    useEffect(() => {
        if (address) {
            setWalletAddress(address)
        }
    }, [address])

    useEffect(() => {
        setAddressBook(addressBookList)
    }, [])

    const saveAddress = () => {
        if (actionType === "add") {
            const data = {
                id: addressBook.length + 1,
                walletName,
                walletAddress,
            }
            setAddressBook(prevAddressBook => [...prevAddressBook, data]);
        } else {
            setAddressBook(prevAddressBook =>
                prevAddressBook.map(item =>
                    item.id === walletId
                        ? { ...item, walletName, walletAddress }
                        : item
                )
            );
        }

        // Reset form
        setWalletName("");
        setWalletAddress("");
        setWalletId("");
        setActionType("add");
        bottomSheetModalRef.current?.close();
    }

    const deleteAddress = (id) => {
        setAddressBook(prevAddressBook =>
            prevAddressBook.filter(item => item.id !== id)
        );
    }


    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <Stack.Screen

                    options={{
                        header: () => (
                            <View style={{ paddingTop: hp(7), paddingBottom: hp(2), paddingHorizontal: hp(2) }} className='bg-gray-800'>
                                <View className='flex-row justify-between'>
                                    <Text className="text-white" style={{ fontSize: hp(2.5) }}>Address Book</Text>

                                    <View className="flex-row items-center gap-5">
                                        <Pressable onPress={handlePresentModalPress}>
                                            <AntDesign name="adduser" size={hp(3)} color="#fff" />
                                        </Pressable>
                                        <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                            <SimpleLineIcons name="menu" size={hp(3)} color="#fff" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />

                {addressBook.length === 0 ? (
                    <View style={{ flex: 1, marginTop: hp(10) }} className="items-center">
                        <SimpleLineIcons name="info" size={hp(5)} color="black" />
                        <View style={{ marginTop: hp(4) }}>
                            <Text>There is no registered address.</Text>
                            <Text>Please add your address book.</Text>
                        </View>

                        <TouchableOpacity onPress={handlePresentModalPress} style={{ width: wp(75), padding: hp(1.5), marginTop: hp(4), borderRadius: 100 }} className="bg-gray-800 ma">
                            <Text style={{ fontSize: hp(2) }} className="text-white text-center">Add Address Book</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <View className="bg-gray-800" style={{ height: hp(10) }} />
                        <View style={{ marginBlockStart: hp(-5), width: wp(90), marginHorizontal: "auto", gap: hp(1), paddingBottom: hp(2) }} >
                            {addressBook?.map((details) => (
                                <AddressBookCard
                                    key={details?.id}
                                    data={details}
                                    walletName={walletName}
                                    setWalletName={setWalletName}
                                    walletAddress={walletAddress}
                                    setWalletAddress={setWalletAddress}
                                    setWalletId={setWalletId}
                                    setActionType={setActionType}
                                    deleteAddress={deleteAddress}
                                    refM={bottomSheetModalRef}
                                />
                            ))}
                        </View>
                    </View>
                )}

            </ScrollView>
            <AddBookSheet
                setWalletId={setWalletId}
                walletAddress={walletAddress}
                walletName={walletName}
                setWalletAddress={setWalletAddress}
                setWalletName={setWalletName}
                saveAddress={saveAddress}
                actionType={actionType}
                setActionType={setActionType}
                refM={bottomSheetModalRef}
            />
        </>
    )
}

export default AddressBook

const styles = StyleSheet.create({})