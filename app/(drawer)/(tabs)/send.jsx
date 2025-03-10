import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { hp, wp } from '../../../utils/helper'
import { router, Stack, useLocalSearchParams, useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import { SegmentedButtons } from 'react-native-paper'
import { useState } from 'react'
import AddressBookSheet from '../../../components/AddressBookSheet'

const Send = () => {
    const navigation = useNavigation()
    const [percentToSentFromAccount] = useState(0)
    const [amountToSent, setAmountToSent] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [receiverAddress, setReceiverAddress] = useState("")

    const { address } = useLocalSearchParams()

    const bottomSheetModalRef = useRef(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);


    useEffect(() => {
        if (address) {
            setReceiverAddress(address)
        }
    }, [address])

    const dummyBalance = 1400

    const updatePercent = (percent) => {
        const amt = dummyBalance * percent / 100
        setAmountToSent(amt.toString())
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={{ flex: 1 }} className="bg-white">
                <Stack.Screen
                    options={{
                        header: () => (
                            <View style={{ paddingTop: hp(7), paddingBottom: hp(2), paddingHorizontal: hp(2) }} className='bg-gray-800'>
                                <View className='flex-row justify-between'>
                                    <Text className="text-white" style={{ fontSize: hp(2.5) }}>Send</Text>
                                    <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                        <SimpleLineIcons name="menu" size={hp(3)} color="#fff" />
                                    </Pressable>
                                </View>
                            </View>
                        )
                    }}
                />
                <View style={{ flex: 1 }}>
                    <View className=' bg-gray-800' style={{ height: hp(15) }} />
                    <View style={styles.dashbaord} className=' bg-white'>

                        <Pressable style={{ padding: hp(1), borderRadius: hp(1), borderWidth: 2 }} className='flex-row justify-between border border-gray-400 items-center'>
                            <View className='flex-row gap-3 items-center'>
                                <Image style={{ width: hp(5), height: hp(5) }} source={require("../../../assets/ari_icon.png")} />
                                <Text className="text-gray-800" style={{ fontSize: hp(2) }}>ARICHAIN(ARI)</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={hp(2.5)} color="black" />
                        </Pressable>

                        <View style={{ marginVertical: hp(1) }} className='flex-row items-center gap-2'>
                            <Text className=' text-gray-500' style={{ fontSize: hp(1.8) }}>Balance :</Text>
                            <Text style={{ fontSize: hp(1.8) }} className="text-blue-700">1,400 ARI</Text>
                        </View>

                        <View className="gap-2">
                            <Text>Wallet Address</Text>
                            <TextInput value={receiverAddress} onChangeText={(text) => setReceiverAddress(text)} style={styles.textInput} className="border border-gray-400" placeholder='Please enter address to send.' />
                        </View>

                        <View className="flex-row my-3 gap-3">
                            {/* <TouchableOpacity onPress={() => router.push("../../scan")} style={styles.actionBtn} className="flex-1 p-4 border border-gray-800 items-center"> */}
                            <TouchableOpacity onPress={() => router.push({ pathname: "../../scan", params: { from: "send" } })} style={styles.actionBtn} className="flex-1 p-4 border border-gray-800 items-center">
                                <Text className="font-semibold">Scan QR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePresentModalPress} style={styles.actionBtn} className="flex-1 p-4 border border-gray-800 items-center">
                                <Text className="font-semibold">Address Book</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="gap-2">
                            <Text>Amount</Text>
                            <TextInput keyboardType='numeric' value={amountToSent} style={styles.textInput} className="border border-gray-400" placeholder='Please enter amount to send.' />
                            <SegmentedButtons
                                style={{ borderTopLeftRadius: 2, borderWidth: 0 }}
                                value={percentToSentFromAccount}
                                onValueChange={updatePercent}
                                buttons={[
                                    {
                                        value: 10,
                                        label: '10%',
                                    },
                                    {
                                        value: 25,
                                        label: '25%',
                                    },
                                    {
                                        value: 50,
                                        label: '50%',
                                    },
                                    {
                                        value: 100,
                                        label: '100%'
                                    },
                                ]}
                            />
                        </View>

                        <View className="gap-2 my-2">
                            <Text>Memo</Text>
                            <TextInput style={styles.textInput} className="border border-gray-400" placeholder='Please enter a memo.' />
                        </View>

                        <View className="gap-2 my-2">
                            <Text>Password</Text>
                            <View style={[styles.textInput, { padding: 0, paddingHorizontal: hp(1) }]} className="flex-row items-center border border-gray-400">
                                <TextInput secureTextEntry={showPassword} className="flex-1" placeholder='Please enter a memo.' />
                                <Pressable onPress={() => setShowPassword((show) => !show)}>
                                    <MaterialCommunityIcons name={`${showPassword ? "eye-outline" : "eye-off-outline"}`} size={24} color="black" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: hp(2.5) }}>
                    <TouchableOpacity style={styles.nextBtn} className="bg-gray-800">
                        <Text className="text-white text-center" style={{ fontSize: hp(2) }}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
            <AddressBookSheet setReceiverAddress={setReceiverAddress} refM={bottomSheetModalRef} />
        </KeyboardAvoidingView>
    )
}

export default Send

const styles = StyleSheet.create({
    dashbaord: {
        flex: 1,
        width: wp(90),
        marginHorizontal: "auto",
        marginBlockStart: hp(-10),
        elevation: 1,
        borderRadius: hp(2),
        padding: hp(1.5)
    },
    textInput: {
        borderRadius: hp(1),
        borderWidth: 2,
        padding: hp(1),
        height: hp(6)
    },
    actionBtn: {
        borderRadius: hp(0.5),
        borderWidth: 1.5
    },
    nextBtn: {
        width: wp(75),
        padding: hp(1.2),
        margin: "auto",
        borderRadius: 100
    }
})