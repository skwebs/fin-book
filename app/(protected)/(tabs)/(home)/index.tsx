import { removeToken } from '@/store/AuthSecureStorage';
import useAuthStore from '@/ZustandAuthStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const router = useRouter()
  const { setIsAuthenticated } = useAuthStore()


  return (
    <View className='flex-1 '>
      <Text className='text-2xl text-teal-600 font-semibold'>Home</Text>
      <View className="mt-10 mx-4">
        <TouchableOpacity className='bg-violet-600 rounded-2xl py-4' onPress={async () => {
          await removeToken();
          setIsAuthenticated(false);
          router.replace('/login')
        }}>
          <Text className="text-center text-white text-xl font-semibold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home