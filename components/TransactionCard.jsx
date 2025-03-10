import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hp } from '~/utils/helper'
import { router } from 'expo-router'

const TransactionCard = () => {
    const result = {
        transactionId: "uxnCN1k31DJaJ91nzqBKsk6YNMc1CL4o7hhfd1200bb",
        date: "2025.03.09 01:00:48",
        block: 1664072,
        type: "Receive",
        from: "ariaccount",
        to: "ARW7DuxnCN1k31DJaJ91nzqBKsk6YNMc1CL4oDYYvnjAy9xGLN1FA",
        memo: "reward_checkin",
        amount: 10
    }
    return (
        <TouchableOpacity onPress={() => router.push({ pathname: "/details", params: { result: JSON.stringify(result) } })}>
            <View className='flex bg-white' style={styles.transactionCard}>
                <View className='flex-row gap-3'>
                    <Text>2025.03.03</Text>
                    <Text>19:49:39</Text>
                </View>

                <Text className="text-blue-600" style={{ alignSelf: "flex-end", marginVertical: hp(1) }}>+ 10 ARI</Text>

                <View>
                    <Text>ariaccount</Text>
                    <Text className='text-gray-500'>Receive</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TransactionCard

const styles = StyleSheet.create({
    transactionCard: {
        height: hp(15),
        borderWidth: .5,
        borderRadius: hp(1),
        padding: hp(1.5)
    }
})