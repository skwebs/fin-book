// import { useAuthStore } from '@/src/store/authStore';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';

// const More = () => {
//   const router = useRouter()
//   const { setAuth, clearAuth, _hasHydrated } = useAuthStore();


//   return (
//     <View className='flex-1 p-4'>
//       <View className="mt-10 mx-4">
//         <TouchableOpacity className='bg-violet-600 rounded-2xl py-4' onPress={() => {
//           clearAuth();
//           router.replace('/login')
//         }}>
//           <Text className="text-center text-white text-xl font-semibold">
//             Logout
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// export default Moreimport React, { useState } from 'react';
import { useAuthStore } from '@/src/store/authStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const router = useRouter();
  const { isLoggedIn, _hasHydrated, clearAuth } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('Light'); // Example theme state

  // Wait for store to hydrate before rendering
  if (!_hasHydrated) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Loading...</Text>
      </View>
    );
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    router.replace('/login');
    return null;
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-800 text-center mb-6">
          Settings
        </Text>
        <View className="mx-4">
          {/* Notifications Toggle */}
          <View className="flex-row items-center justify-between bg-white px-5 py-3 rounded-2xl mb-4 border border-gray-200">
            <Text className="text-gray-700 text-lg">Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d1d5db', true: '#8b5cf6' }}
              thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          {/* Theme Selector */}
          <View className="flex-row items-center justify-between bg-white px-5 py-4 rounded-2xl mb-4 border border-gray-200">
            <Text className="text-gray-700 text-lg">Theme</Text>
            <TouchableOpacity
              className="bg-gray-200 rounded-xl px-4 py-2"
              onPress={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')}
            >
              <Text className="text-gray-700">{theme}</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            className="bg-violet-600 rounded-2xl py-4 mt-4"
            onPress={() => {
              clearAuth();
              router.replace('/login')
            }}
          >
            <Text className="text-center text-white text-xl font-semibold">
              Logout
            </Text>
          </TouchableOpacity>


        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;