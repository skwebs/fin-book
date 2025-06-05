import { useAuthStore } from '@/src/store/authStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Dashboard = () => {
  const router = useRouter()
  const { clearAuth, _hasHydrated, user } = useAuthStore();


  return (
    <View className='flex-1 p-4'>

      <Text className='text-gray-600 text-xl'>Welcome! </Text>
      <Text className='text-gray-600 text-xl'>{user?.name} in your Dashboard</Text>
      <Text className=''> {user?.email}</Text>

    </View>
  )
}

export default Dashboard