import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

// Define the validation schema with zod
const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password cannot exceed 20 characters'),
});

// Define the form data type based on the schema
type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            console.log('Login attempted with:', data);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API call
            alert('Login successful!');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <View className="flex-1 justify-center px-5">
                    <Text className="text-4xl font-bold text-center mb-12 text-gray-900">
                        Log In
                    </Text>
                    <View className="space-y-6">
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View>
                                    <TextInput
                                        className={`bg-white border-2 ${errors.email ? 'border-red-400' : 'border-gray-200'
                                            } rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-500`}
                                        placeholder="Email"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {errors.email && (
                                        <Text className="text-red-500 text-sm mt-2 ml-3">
                                            {errors.email.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View>
                                    <TextInput
                                        className={`bg-white border-2 ${errors.password ? 'border-red-400' : 'border-gray-200'
                                            } rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-500`}
                                        placeholder="Password"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry
                                        autoCapitalize="none"
                                    />
                                    {errors.password && (
                                        <Text className="text-red-500 text-sm mt-2 ml-3">
                                            {errors.password.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                        />
                        <TouchableOpacity
                            className={`bg-blue-600 rounded-2xl py-4 ${isSubmitting ? 'opacity-70' : 'opacity-100'
                                }`}
                            onPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        >
                            <Text className="text-white text-center font-semibold text-xl">
                                {isSubmitting ? 'Logging In...' : 'Log In'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;