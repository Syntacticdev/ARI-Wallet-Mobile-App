import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hp } from '../utils/helper'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const AddressBookCard = ({ data, refM, setWalletName, setWalletAddress, setActionType, setWalletId, deleteAddress }) => {
    const promptEdit = () => {
        refM.current?.present();
        setActionType("edit")
        setWalletId(data?.id)
        setWalletAddress(data?.walletAddress)
        setWalletName(data?.walletName)
    }
    return (
        <View className='flex bg-white' style={styles.abCard}>
            <Text>{data?.walletName}</Text>
            <View style={{ height: hp(0.1), marginVertical: hp(1) }} className="bg-gray-500" />

            <Text style={{ fontSize: hp(1.8) }}>{data?.walletAddress}</Text>

            <View className="flex-row" style={{ marginTop: hp(2), gap: hp(1) }}>
                <TouchableOpacity onPress={() => router.push({ pathname: "/send", params: { address: data?.walletAddress } })} style={styles.actionBtn} className="flex-row flex-1 items-center gap-2 bg-gray-800">
                    <MaterialCommunityIcons name="logout-variant" size={24} color="#fff" />
                    <Text style={{ fontSize: hp(1.8) }} className="text-white font-semibold">Send</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={promptEdit} style={styles.actionBtn} className="flex-row flex-1 items-center gap-2 bg-gray-800">
                    <FontAwesome name="edit" size={24} color="#fff" />
                    <Text style={{ fontSize: hp(1.8) }} className="text-white font-semibold">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteAddress(data.id)} style={styles.actionBtn} className="flex-row flex-1 items-center gap-2 bg-gray-800">
                    <AntDesign name='delete' size={24} color="#fff" />
                    <Text style={{ fontSize: hp(1.8) }} className="text-white font-semibold">Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddressBookCard

const styles = StyleSheet.create({
    abCard: {
        height: hp(20),
        borderWidth: .5,
        borderRadius: hp(2),
        padding: hp(1.5)
    },
    actionBtn: {
        padding: hp(1),
        borderRadius: hp(1)
    }
})