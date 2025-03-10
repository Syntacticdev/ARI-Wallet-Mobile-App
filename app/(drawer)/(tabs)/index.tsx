import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Platform, Pressable, RefreshControl, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { IconButton, Tooltip } from 'react-native-paper';
import { hp, wp } from '~/utils/helper';
import TransactionCard from "../../../components/TransactionCard"
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from "../../../components/CustomHeader"
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ReceiveSheet from "~/components/ReceiveSheet"
import ConfirmAddressSheet from "~/components/ConfirmAddressSheet"
import { router } from 'expo-router';

export default function Home() {
  const [showBalance, setshowBalance] = useState(true)
  const [refreshing, setRefreshing] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);


  const { address } = useLocalSearchParams()
  const confirmSheetModalRef = useRef<BottomSheetModal>(null);


  useEffect(() => {
    if (address) {  // 
      confirmSheetModalRef.current?.present();
    }
  }, [address])


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a data-fetching delay (replace with actual API call)
    setTimeout(() => {
      setRefreshing(false);
      console.log('Data reloaded!');
    }, 2000); // 2 seconds delay
  }, []);

  return (
    <>
      <ScrollView
        className='bg-gray-800'
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ffaa66', '#ff8855', '#ff6644']} // Optional: Customize spinner colors
            progressBackgroundColor="red" // Optional: Customize background color
          />
        }
      >
        <Stack.Screen options={{
          header: ({ route }) => <CustomHeader title={route.name} />
        }} />
        <View className='bg-white'>

          <View className='relative bg-gray-800' style={{ height: hp(15) }}>
            <View style={{ width: wp(90), height: hp(21), top: hp(5), left: wp(5), elevation: 1, borderRadius: hp(2), padding: hp(1.5) }} className='absolute bg-white'>
              <View className='flex-row justify-between items-center'>
                <Pressable>
                  <View className='flex-row gap-3 items-center'>
                    <Image style={{ width: hp(5), height: hp(5) }} source={require("../../../assets/ari_icon.png")} />
                    <Text className="text-gray-800" style={{ fontSize: hp(2) }}>ARICHAIN(ARI)</Text>
                  </View>
                </Pressable>

                <View className='items-center'>
                  <View style={{ borderWidth: 1, borderColor: "#000", height: hp(3.2), width: wp(12), alignItems: 'center', justifyContent: "center", borderRadius: 100 }}>
                    <Switch style={Platform.OS === 'android' ? styles.androidSwitch : {}}
                      onValueChange={() => setshowBalance((show) => !show)} value={showBalance} trackColor={{ true: "transparent", false: "transparent" }} thumbColor={"#000"} />
                  </View>
                  <Text style={{ fontSize: hp(1.3) }}>Amount</Text>
                </View>
              </View>
              <View style={{ marginVertical: hp(2) }} className='flex-row items-center gap-2'>
                <Text className='font-bold' style={{ fontSize: hp(2.3) }}>{showBalance ? "1,400" : "**********"}</Text>
                <Text>ARI</Text>
              </View>
              <View className='flex-row items-center justify-between gap-3'>
                <TouchableOpacity onPress={handlePresentModalPress} style={{ paddingHorizontal: hp(2.7), paddingVertical: hp(1.5), borderWidth: 1, borderRadius: 100 }}>
                  <Text style={{ fontSize: hp(1.8), fontWeight: "600" }}>Receive</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/(drawer)/(tabs)/send")} style={{ paddingHorizontal: hp(2.7), paddingVertical: hp(1.5), borderWidth: 1, borderRadius: 100 }}>
                  <Text style={{ fontSize: hp(1.8), fontWeight: "600" }}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "/transactions" })} style={{ paddingHorizontal: hp(2.7), paddingVertical: hp(1.5), borderWidth: 1, borderRadius: 100 }}>
                  <Text style={{ fontSize: hp(1.8), fontWeight: "600" }}>Transaction</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginTop: hp(15), marginVertical: hp(1.5) }}>
            <Text style={{ fontSize: hp(1.8), fontWeight: "600", padding: hp(1) }}>Token</Text>

            <View className='flex-row bg-green-100 items-center gap-3' style={{ paddingVertical: hp(2), paddingHorizontal: hp(5) }}>
              <MaterialIcons name="keyboard-arrow-left" size={hp(2.5)} color="black" />
              <View style={{ flex: 1, height: hp(10) }}>
                <View className='flex-row gap-3 items-center'>
                  <Image style={{ width: hp(4), height: hp(4) }} source={require("../../../assets/ari_icon.png")} />
                  <Text style={{ fontSize: hp(1.8) }}>ARI TOKEN</Text>
                </View>
                <View className='flex-row items-center gap-2 mt-3'>
                  <Tooltip titleMaxFontSizeMultiplier={2} enterTouchDelay={1} title={`When you have an ARI token,
                   the token is activated.`}>
                    <IconButton icon="information-outline" selected size={24} onPress={() => { }} />
                  </Tooltip>
                  <Text className='text-gray-500'>Don't see your token</Text>
                </View>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={hp(2.5)} color="black" />
            </View>
          </View>

          <View style={{ padding: wp(3) }}>
            <View className="flex-row justify-between items-center">
              <Text style={{ fontSize: hp(1.8) }} className='font-bold'>Last Transaction</Text>
              <TouchableOpacity>
                <Ionicons name="reload" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Transactions */}

            <View className='gap-3 mt-3'>
              {Array(10).fill("").map((_, index) => (
                <TransactionCard key={index} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <ReceiveSheet refM={bottomSheetModalRef} />
      <ConfirmAddressSheet address={address} refM={confirmSheetModalRef} />
    </>
  );
}
const styles = StyleSheet.create({
  androidSwitch: {
    transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
  },
})