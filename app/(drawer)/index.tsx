import { router, Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { wp, hp } from "../../utils/helper"

export default function Home() {

  return (
    <>
      <StatusBar backgroundColor='#1f2937' style={Platform.OS === 'ios' ? 'dark' : 'light'} />
      <SafeAreaView>
        <View className='bg-gray-800 rounded-b-xl justify-center items-center' style={{ height: hp(40) }}>
          <Image style={{ width: hp(8), height: hp(8) }} source={require("../../assets/ari_icon.png")} />
          <Text className="text-white" style={{ fontSize: hp(4), fontWeight: "bold", marginTop: hp(2) }}>Ari Wallet</Text>
        </View>

        <View style={{ paddingVertical: hp(7), paddingHorizontal: wp(5), gap: hp(2) }}>
          <TouchableOpacity onPress={() => router.replace("/(drawer)/(tabs)")}>
            <View className='flex-row gap-2 bg-gray-200' style={{ paddingVertical: hp(1.4), paddingHorizontal: hp(4), borderRadius: hp(1.5) }}>
              <Image style={{ width: hp(8), height: hp(8), alignSelf: "center" }} source={require("../../assets/icon.png")} />
              <Text style={{ fontSize: hp(1.6), alignSelf: "flex-start", paddingVertical: hp(0.3), paddingHorizontal: hp(1), marginHorizontal: wp(2) }} className='bg-red-400 rounded-full text-white'>Connecting</Text>
              <View>
                <Text style={{ fontSize: hp(3), fontWeight: "bold" }}>TESTNET</Text>
                <View style={{ paddingVertical: hp(2), alignItems: "flex-end" }}>
                  <Text style={{ fontSize: hp(1.8) }}>Recent Access Date</Text>
                  <Text style={{ fontSize: hp(1.8) }}> 2025.03.02</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View className='flex-row gap-2 bg-gray-200' style={{ paddingVertical: hp(2), paddingHorizontal: hp(4), borderRadius: hp(1.5), justifyContent: "space-between", alignItems: "center" }}>
              <Image style={{ width: hp(8), height: hp(8), alignSelf: "center" }} source={require("../../assets/icon.png")} />

              <View className='items-end'>
                <Text className='text-gray-500' style={{ fontSize: hp(3), fontWeight: "bold" }}>MAINNET</Text>
                <View style={{ paddingTop: hp(0.2) }}>
                  <Text className='text-gray-500' style={{ fontSize: hp(1.8) }}>Coming soon</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView >
    </>
  );
}
