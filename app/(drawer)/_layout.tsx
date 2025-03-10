import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { copyToClipboard, hp } from '~/utils/helper';

const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={({ navigation }) => (
        <SafeAreaView style={{ flex: 1, padding: hp(2) }}>
          <View className='flex-row justify-between'>
            <Pressable onPress={() => navigation.closeDrawer()}>
              <AntDesign name='close' size={hp(2.5)} color="black" />
            </Pressable>

            <View className="flex-row gap-5">
              <Pressable>
                <MaterialCommunityIcons name="line-scan" size={24} color="black" />
              </Pressable>
              <Pressable>
                <AntDesign name='setting' size={hp(2.5)} color="black" />
              </Pressable>
            </View>
          </View>
          <ScrollView>
            <Text style={{ fontSize: hp(1.7), marginVertical: hp(1) }}>eminentcryptoproject@gmail.com</Text>

            <View className='flex-row gap-3 items-center bg-gray-100 rounded-md' style={{ padding: hp(1) }}>
              <View className='bg-gray-500' style={{ width: hp(10), height: hp(10) }}>
                <QRCode
                  value="ARW7DuxnCN1k31DJaJ91nzqBKsk6YNMc1CL4oDYYvnjAy9xGLN1FA"
                  size={hp(10)}
                />
              </View>
              <Pressable onPress={() => copyToClipboard("ARW7DuxnCN1k31DJaJ91nzqBKsk6YNMc1CL4oDYYvnjAy9xGLN1FA")} style={{ flex: 1 }}>
                <View >
                  <Text>ARW7DuxnCN1k31DJaJ91nzqBKsk6YNMc1CL4oDYYvnjAy9xGLN1FA</Text>
                  <Feather name="copy" size={hp(2.5)} color="black" />
                </View>
              </Pressable>
            </View>

            <View className=' gap-3 bg-green-100 rounded-md' style={{ padding: hp(1), marginVertical: hp(1) }}>
              <Text className='text-gray-400'>My Refferal Code</Text>
              <Pressable onPress={() => copyToClipboard("67909998535a1")}>
                <View className="flex-row items-end gap-2">
                  <Text>67909998535a1</Text>
                  <Feather name="copy" size={hp(2.5)} color="black" />
                </View>
              </Pressable>
            </View>
            {/* Service */}
            <View className='flex-row items-center gap-5'>
              <Text style={{ fontSize: hp(1.8) }}>Service</Text>
              <View style={{ flex: 2, height: hp(0.02), backgroundColor: "#000" }} />
            </View>

            <View className='gap-3 mt-3'>
              <Pressable onPress={() => router.push("/(drawer)/(tabs)/asset")} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: hp(1) }}>
                <View className='flex-row gap-3 items-center'>
                  <SimpleLineIcons name="notebook" size={hp(3)} color="black" />
                  <Text>Asset</Text>
                </View>
                <SimpleLineIcons name="arrow-right" size={hp(2)} color="black" />
              </Pressable>
              <Pressable onPress={() => router.push("/(drawer)/(tabs)/send")} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: hp(1) }}>
                <View className='flex-row gap-3 items-center'>
                  <MaterialCommunityIcons name="logout-variant" size={hp(3)} color="black" />
                  <Text>Send</Text>
                </View>
                <SimpleLineIcons name="arrow-right" size={hp(2)} color="black" />
              </Pressable>
              <Pressable onPress={() => router.push("/(drawer)/(tabs)/address_book")} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: hp(1) }}>
                <View className='flex-row gap-3 items-center'>
                  <FontAwesome5 name="address-book" size={hp(3)} color="black" />
                  <Text>Address Book</Text>
                </View>
                <SimpleLineIcons name="arrow-right" size={hp(2)} color="black" />
              </Pressable>
              <Pressable style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: hp(1) }}>
                <View className='flex-row gap-3 items-center'>
                  <MaterialCommunityIcons name="web" size={hp(3)} color="black" />
                  <Text>ARI Explorer</Text>
                </View>
                <Feather name="external-link" size={hp(3)} color="black" />
              </Pressable>
            </View>

            {/* Support */}
            <View className='flex-row items-center my-4 gap-5'>
              <Text style={{ fontSize: hp(1.8) }}>Support</Text>
              <View style={{ flex: 2, height: hp(0.02), backgroundColor: "#000" }} />
            </View>

            <View className='gap-3 mt-3'>
              <Pressable style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: hp(1) }}>
                <View className='flex-row gap-3 items-center'>
                  <MaterialCommunityIcons name="note-outline" size={hp(3)} color="black" />
                  <Text>Whitepaper</Text>
                </View>
                <Feather name="external-link" size={hp(3)} color="black" />
              </Pressable>
              <Pressable style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: hp(1) }}>
                <View className='flex-row gap-3 items-center'>
                  <MaterialCommunityIcons name="clipboard-text-outline" size={hp(3)} color="black" />
                  <Text>Terms of Use</Text>
                </View>
                <SimpleLineIcons name="arrow-right" size={hp(2)} color="black" />
              </Pressable>
              <Pressable style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: hp(1) }}>
                <View className='flex-row gap-3 items-center'>
                  <MaterialIcons name="lock-outline" size={hp(3)} color="black" />
                  <Text>Privacy Policy</Text>
                </View>
                <SimpleLineIcons name="arrow-right" size={hp(2)} color="black" />
              </Pressable>
            </View>

            <View style={{ marginTop: hp(1), gap: hp(1) }}>
              <Pressable className='bg-gray-800 p-4 rounded-full'>
                <Text style={{ fontSize: hp(1.8) }} className='text-white font-bold text-center'>Today's Quiz</Text>
              </Pressable>
              <Pressable className='bg-gray-800 p-4 rounded-full'>
                <Text style={{ fontSize: hp(1.8) }} className='text-white font-bold text-center'>Daily Check-In</Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}

      initialRouteName='(tabs)'
      screenOptions={{
        headerShown: false,   // headerShown: false,
        drawerPosition: "right",
        headerStyle: {
          elevation: 0,
          backgroundColor: "transparent"
        },
        drawerStyle: {      // width: 240,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          elevation: 0
        },
        drawerIcon: ({ color, size, focused }) => <Text>Hi</Text>
      }}

    >

    </Drawer>
  );
};

export default DrawerLayout;
