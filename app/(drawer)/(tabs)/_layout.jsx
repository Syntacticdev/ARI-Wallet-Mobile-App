import { router, Tabs } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons"
import { wp, hp } from "../../../utils/helper"

export default function TabLayout() {
    const TabBarIcon = ({ name, focused, icon, title }) => {
        return (
            <TouchableOpacity onPress={
                () => name === "index" ? router.push("/") : router.push(name)}>
                <View style={[styles.tabBarIcon, { backgroundColor: focused ? "#fff" : "" }]}>
                    {icon}
                    {focused && <Text clasName=" text-gray-800 font-bold ">{title}</Text>}
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <>
            <Tabs

                tabBar={(props) => (
                    <View style={styles.tabBar}>

                        {props.state.routes.map((route, index) => {
                            const { descriptors, state } = props
                            const isFocused = state.index === index;
                            const tabIcon = descriptors[state.routes[index].key].options.tabBarIcon({
                                focused: isFocused,
                                color: isFocused ? "#1f2937" : "#fff",
                                size: hp(3),
                            })

                            return (
                                <TabBarIcon
                                    key={route.key}
                                    title={descriptors[state.routes[state.index].key].options.title}
                                    name={route.name}
                                    focused={isFocused}
                                    icon={tabIcon}
                                />
                            );
                        })}
                    </View>
                )}

            >

                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        // headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <Feather name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="asset"
                    options={{
                        title: 'Asset',
                        tabBarIcon: ({ focused, color, size }) => (
                            <SimpleLineIcons name="notebook" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="send"
                    options={{
                        title: 'Send',
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons name="logout-variant" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="address_book"
                    options={{
                        title: 'Address Book',
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="address-book" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs >
        </>
    );
}


const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 70,
        paddingHorizontal: 10,
        alignItems: "center",
        backgroundColor: "#363636",
        borderTopLeftRadius: hp(2),
        borderTopRightRadius: hp(2)
    },
    tabBarIcon: {
        flexDirection: "row",
        alignItems: "center",
        gap: hp(1),
        paddingVertical: hp(1),
        paddingHorizontal: hp(1.4),
        borderRadius: 100
    },

})