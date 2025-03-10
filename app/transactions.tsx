import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { router, Stack } from 'expo-router'
import { Image, ScrollView } from 'react-native'
import { hp, wp } from '~/utils/helper'
import { Ionicons } from '@expo/vector-icons'
import TransactionCard from '~/components/TransactionCard'
import ReceiveSheet from '~/components/ReceiveSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

const Transactions = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{
                headerTitle: "ARICHAIN(ARI)",
                headerTitleStyle: {
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: "#1f2937",
                },
                headerTintColor: "#fff"
            }} />

            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(10) }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ padding: hp(2) }} className='bg-white'>
                    <View className="flex-row items-center gap-3">
                        <Image style={{ height: hp(7), width: wp(14), borderRadius: 200 }} source={require("../assets/ari_icon.png")} />

                        <View className="flex-row gap-2">
                            <Text className="font-bold" style={{ fontSize: hp(2) }}>1,500</Text>
                            <Text style={{ fontSize: hp(2) }}>ARI</Text>
                        </View>
                    </View>

                    <View style={{ marginVertical: hp(2), gap: hp(1.5) }} className="flex-row items-center">
                        <TouchableOpacity onPress={() => router.push("/(drawer)/(tabs)/send")} style={{ flex: 1, paddingHorizontal: hp(2.7), paddingVertical: hp(1.5), borderWidth: 1, borderRadius: 100 }}>
                            <Text className='text-center' style={{ fontSize: hp(1.8), fontWeight: "600" }}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePresentModalPress} style={{ flex: 1, paddingHorizontal: hp(2.7), paddingVertical: hp(1.5), borderWidth: 1, borderRadius: 100 }}>
                            <Text className='text-center' style={{ fontSize: hp(1.8), fontWeight: "600" }}>Receive</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="bg-white" style={{ flex: 1, marginTop: hp(1), paddingHorizontal: wp(3) }}>
                    <View style={{ marginVertical: hp(1) }} className="flex-row justify-between items-center">
                        <Text style={{ fontSize: hp(1.8) }} className='font-bold'>Last Transaction</Text>
                        <TouchableOpacity>
                            <Ionicons name="reload" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View className="gap-3">
                        {Array(5).fill("").map((_, i) => (
                            <TransactionCard key={i} />
                        ))}
                    </View>
                </View>
            </ScrollView>

            <ReceiveSheet refM={bottomSheetModalRef} />
        </View>
    )
}

export default Transactions

const styles = StyleSheet.create({})