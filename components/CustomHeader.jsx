import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Pressable } from 'react-native'
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { hp } from "../utils/helper"
import { DrawerActions } from '@react-navigation/native'
import { router, useNavigation } from 'expo-router'
const CustomHeader = ({ title }) => {
    const navigation = useNavigation()
    return (
        <View style={{ paddingTop: hp(7), paddingBottom: hp(2), paddingHorizontal: hp(2) }} className='bg-gray-800'>
            <View className='flex-row justify-between'>
                <View className='flex-row gap-3 items-center'>
                    <Image style={{ width: hp(5), height: hp(5) }} source={require("../assets/ari_icon.png")} />
                    <Text className="text-white" style={{ fontSize: hp(3) }}>Ari Wallet</Text>
                </View>

                <View className="flex-row items-center gap-5">
                    <Pressable onPress={() => router.navigate({ pathname: "/scan", params: { from: title } })}>
                        <MaterialCommunityIcons name="line-scan" size={hp(3)} color="#fff" />
                    </Pressable>
                    <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <SimpleLineIcons name="menu" size={hp(3)} color="#fff" />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({})