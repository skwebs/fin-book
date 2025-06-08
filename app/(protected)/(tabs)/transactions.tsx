import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, RefreshControl, SectionList, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialTransactions = [
  {
    title: 'Tue, 26 Nov 2024',
    data: [
      { time: '26 Nov 2024-12:25PM', desc: 'Litti', amount: '₹ 15.00', balance: '₹ 4,703.91 Dr' },
    ],
  },
  {
    title: 'Sat, 23 Nov 2024',
    data: [
      { time: '23 Nov 2024-03:57PM', desc: 'FOR cash', amount: '₹ 500.00', balance: '₹ 4,688.91 Dr' },
      { time: '23 Nov 2024-03:39PM', desc: 'Medicine for son', amount: '₹ 470.00', balance: '₹ 4,188.91 Dr' },
      { time: '23 Nov 2024-01:28PM', desc: 'Besan Ladoo', amount: '₹ 15.00', balance: '₹ 3,718.91 Dr' },
      { time: '23 Nov 2024-01:23PM', desc: 'Chat samosa', amount: '₹ 80.00', balance: '₹ 3,703.91 Dr' },
      { time: '23 Nov 2024-08:35AM', desc: 'Litti', amount: '₹ 15.00', balance: '₹ 3,623.91 Dr' },
    ],
  },
  {
    title: 'Fri, 22 Nov 2024',
    data: [
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
      { time: '22 Nov 2024-08:34AM', desc: 'Litti 2 sponge 2', amount: '₹ 39.00', balance: '₹ 3,608.91 Dr' },
    ],
  },
  {
    title: 'Wed, 20 Nov 2024',
    data: [
      { time: '20 Nov 2024-02:50PM', desc: 'Litti samosa', amount: '₹ 15.00', balance: '₹ 3,569.91 Dr' },
      { time: '20 Nov 2024-12:02PM', desc: 'Banana', amount: '₹ 15.00', balance: '₹ 3,554.91 Dr' },
    ],
  },
];

const TransactionList = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState(initialTransactions);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => {
      setTransactions([...initialTransactions]);
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row px-4 bg-white  border-gray-200 shadow-sm">
        <Text className="flex-1 text-lg font-bold text-gray-800">Details</Text>
        <Text className="w-24 text-lg font-bold text-gray-800 text-right">Amount</Text>
      </View>

      {/* SectionList */}
      <SectionList
        sections={transactions}
        keyExtractor={(item, index) => item.time + index}
        renderItem={({ item }) => (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Pressable
              onPress={async () => {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                alert('Transaction pressed');
              }}
              className="flex-row p-4 bg-white border-b border-gray-100"
              accessibilityLabel={`Transaction: ${item.desc} for ${item.amount}`}
              accessibilityRole="button"
            >
              <View className="flex-1">
                <View className='flex-row justify-between'>
                  <Text className='text-xs font-medium text-gray-600'>From:</Text>
                  <Text className='text-xs font-medium text-gray-600'>Time:</Text>
                </View>
                <View className='flex-row justify-between'>
                  <Text className=' font-medium text-gray-600'>To:</Text>
                  <Text className=' font-medium text-gray-600'>88,888.00</Text>
                </View>
                <View>
                  <Text className='text-xs mt-2 text-gray-400'>Description for this transactionDescription for this transactionDescription </Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="">
            <Text className="text-sm font-semibold text-white bg-gray-500 shadow text-center">
              {title}
            </Text>
          </View>
        )}
        ListFooterComponent={
          <View className="py-6 flex-row justify-center">
            <Text className="text-sm font-medium text-gray-500 bg-white rounded-full px-4 py-2 border border-gray-200">
              End of transactions
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#0f766e"
            colors={['#0f766e']}
          />
        }
        stickySectionHeadersEnabled={true}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        className="bg-teal-600 rounded-full w-14 h-14 absolute bottom-6 right-6 justify-center items-center shadow-lg"
        onPress={async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.push('/');
        }}
        accessibilityLabel="Add new transaction"
        accessibilityRole="button"
      >
        <Text className="text-white text-3xl font-bold">+</Text>
      </TouchableOpacity>


    </SafeAreaView>
  );
};

export default TransactionList;
