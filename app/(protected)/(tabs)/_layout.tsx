import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>

      <Tabs.Screen
        name="(dashboard)"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="dashboard-customize" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(transactions)"
        options={{
          title: 'Transactions',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="currency-exchange" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="(accounts)"
        options={{
          title: 'Accounts',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="account-box" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(more)"
        options={{
          title: 'More',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="more-vert" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
