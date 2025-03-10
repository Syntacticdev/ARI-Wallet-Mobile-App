import { Image, Platform, Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from "../../../components/CustomHeader"
import Scanner from "../../../components/Scanner"
import { router, Stack, useNavigation } from 'expo-router'
import { hp, wp } from '../../../utils/helper'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
const Asset = () => {
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{
                header: ({ route }) => <CustomHeader title={route.name} />
            }} />

            <View className="flex-1 bg-white">
                <View className='relative bg-gray-800' style={{ height: hp(15) }}>
                    <View style={{ width: wp(90), height: hp(15), top: hp(5), left: wp(5), elevation: 1, borderRadius: hp(2), padding: hp(1.5) }} className='absolute bg-white'>
                        <View className='flex-row justify-between items-center'>
                            <Pressable onPress={() => router.push("../../transactions")}>
                                <View className='flex-row gap-3 items-center'>
                                    <Image style={{ width: hp(5), height: hp(5) }} source={require("../../../assets/ari_icon.png")} />
                                    <Text className="text-gray-800" style={{ fontSize: hp(2) }}>ARICHAIN(ARI)</Text>
                                    <MaterialIcons name="keyboard-arrow-right" size={hp(2.5)} color="black" />
                                </View>
                            </Pressable>
                        </View>
                        <View style={{ marginVertical: hp(2) }} className='flex-row items-center gap-2'>
                            <Text className='font-bold' style={{ fontSize: hp(2.3) }}>1,400</Text>
                            <Text>ARI</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: hp(7.5), paddingHorizontal: wp(3) }}>
                    <Text tyle={{ fontSize: hp(1.8), fontWeight: "600", padding: hp(1) }}>Token</Text>

                    <View className="justify-center items-center gap-3 my-2">
                        <Ionicons name="reload" size={24} color="#6b7280" />
                        <Text className="text-gray-500">There is no token balance.</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Asset

const styles = StyleSheet.create({})