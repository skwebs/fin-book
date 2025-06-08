import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample account data
const accountsData = [
  { id: '1', name: 'Personal Savings', type: 'Savings', balance: '₹ 50,000.00' },
  { id: '2', name: 'Business Checking', type: 'Checking', balance: '₹ 1,20,000.00' },
  { id: '3', name: 'Emergency Fund', type: 'Savings', balance: '₹ 30,000.00' },
  { id: '4', name: 'Investment Account', type: 'Investment', balance: '₹ 2,50,000.00' },
  { id: '5', name: 'Travel Fund', type: 'Savings', balance: '₹ 15,000.00' },
  { id: '6', name: 'Personal Savings', type: 'Savings', balance: '₹ 50,000.00' },
  { id: '7', name: 'Business Checking', type: 'Checking', balance: '₹ 1,20,000.00' },
  { id: '8', name: 'Emergency Fund', type: 'Savings', balance: '₹ 30,000.00' },
  { id: '9', name: 'Investment Account', type: 'Investment', balance: '₹ 2,50,000.00' },
  { id: '10', name: 'Travel Fund', type: 'Savings', balance: '₹ 15,000.00' },
  { id: '11', name: 'Personal Savings', type: 'Savings', balance: '₹ 50,000.00' },
  { id: '12', name: 'Business Checking', type: 'Checking', balance: '₹ 1,20,000.00' },
  { id: '13', name: 'Emergency Fund', type: 'Savings', balance: '₹ 30,000.00' },
  { id: '14', name: 'Investment Account', type: 'Investment', balance: '₹ 2,50,000.00' },
  { id: '15', name: 'Travel Fund', type: 'Savings', balance: '₹ 15,000.00' },
  { id: '16', name: 'Personal Savings', type: 'Savings', balance: '₹ 50,000.00' },
  { id: '17', name: 'Business Checking', type: 'Checking', balance: '₹ 1,20,000.00' },
  { id: '18', name: 'Emergency Fund', type: 'Savings', balance: '₹ 30,000.00' },
  { id: '19', name: 'Investment Account', type: 'Investment', balance: '₹ 2,50,000.00' },
  { id: '20', name: 'Travel Fund', type: 'Savings', balance: '₹ 15,000.00' },
];

const AccountList = () => {

  const [accounts, setAccounts] = useState(accountsData);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or data refresh
    setTimeout(() => {
      // For demo purposes, just reset the data (you can fetch new data here)
      setAccounts([...accountsData]);
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
      <View className="flex-row bg-white p-3 border-b border-gray-200">
        <Text className="flex-1 font-bold text-gray-700">Account Name</Text>
        <Text className="w-24 font-bold text-gray-700 text-right">Type</Text>
        <Text className="w-24 font-bold text-gray-700 text-right">Balance</Text>
      </View>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row p-6 bg-white border-b border-gray-200 gap-5">
            <Text className="flex-1 text-gray-600">{item.name}</Text>
            <Text className="w-24 text-gray-700 text-right">{item.type}</Text>
            <Text className="w-24 text-gray-700 text-right">{item.balance}</Text>
          </View>
        )}

        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      {/* <TouchableOpacity
        className="absolute bottom-5 right-5 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
        onPress={() => console.log('Add new account pressed')}
      >
        <Text className="text-white text-2xl">+</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        className="bg-teal-600 rounded-full w-14 h-14 absolute bottom-6 right-6 justify-center items-center shadow-lg"
        onPress={async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          alert('Add a new account');
        }}
        accessibilityLabel="Add new account"
        accessibilityRole="button"
      >
        <Text className="text-white text-3xl font-bold">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccountList;