import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { copyToClipboard, hp, wp } from '../utils/helper'
import { Feather } from '@expo/vector-icons'

const Details = () => {
    const { result } = useLocalSearchParams()
    const transaction = JSON.parse(result)
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Stack.Screen options={{
                headerTitle: "Transaction Detail",
                headerTitleStyle: {
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: "#1f2937",
                },
                headerTintColor: "#fff"
            }} />

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ paddingHorizontal: wp(3), marginTop: hp(1) }}>
                        <View className="gap-2">
                            <View className="flex-row items-center gap-2">
                                <Text className="text-gray-500">TXID</Text>
                                <Pressable onPress={() => copyToClipboard(transaction?.transactionId)}>
                                    <Feather name="copy" size={hp(2.5)} color="black" />
                                </Pressable>
                            </View>
                            <Text>{transaction?.transactionId}</Text>
                        </View>

                        <View className="bg-gray-500" style={{ height: hp(0.1), marginVertical: hp(2) }} />

                        <View className="gap-5">
                            <View className="flex-row items-center justify-between">
                                <Text className="text-gray-500">Date</Text>
                                <Text>{transaction.date}</Text>
                            </View>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-gray-500">Block</Text>
                                <Text>{transaction.block}</Text>
                            </View>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-gray-500">Type</Text>
                                <Text>{transaction.type}</Text>
                            </View>
                            <View style={{ gap: wp(15) }} className="flex-row items-center ">
                                <Text className="text-gray-500">From</Text>
                                <Pressable className="flex-row items-center gap-2" onPress={() => copyToClipboard(transaction?.from)}>
                                    <Text>{transaction.from}</Text>
                                    <Feather name="copy" size={hp(2.5)} color="black" />
                                </Pressable>
                            </View>
                            <View style={{ gap: wp(15) }} className="flex-row items-center ">
                                <Text className="text-gray-500">To</Text>
                                <Pressable className="flex-1 flex-row items-center gap-2" onPress={() => copyToClipboard(transaction?.to)}>
                                    <Text>{transaction.to}<Feather name="copy" size={hp(2.5)} color="black" /></Text>
                                </Pressable>
                            </View>
                        </View>

                        <View className="bg-gray-500" style={{ height: hp(0.1), marginVertical: hp(3) }} />

                        <View className="flex-row items-center justify-between">
                            <Text className="text-gray-500">Amount</Text>
                            <Text className="text-gray-800 font-bold">{transaction.amount} ARI</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ flex: 1, paddingHorizontal: hp(2), paddingBottom: hp(2), marginVertical: hp(2) }}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.actionBtn} className="bg-gray-800"  >
                        <Text className="text-white text-center" style={{ fontSize: hp(2) }}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Details

const styles = StyleSheet.create({
    buttonContainer: {
        padding: hp(2),
        marginVertical: hp(2),
        backgroundColor: 'white'
    },
    actionBtn: {
        width: wp(75),
        padding: hp(2),
        margin: "auto",
        borderRadius: 100
    }
})