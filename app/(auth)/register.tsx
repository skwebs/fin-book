import { API_URL } from "@/src/constants/config";
// import useAuthStore from "@/ZustandAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

// Validation schema
const registerSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name cannot exceed 50 characters"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password cannot exceed 20 characters"),
        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// Type definition for form data
type RegisterFormData = z.infer<typeof registerSchema>;

// Type definition for server errors
type ServerError = {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    message?: string;
};

const RegisterScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const [serverError, setServerError] = useState<ServerError>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();
    // const { setIsAuthenticated } = useAuthStore();

    // Handle form submission
    const onSubmit = async (data: RegisterFormData) => {
        setServerError({});

        try {
            const response = await axios.post(

                `${API_URL}/api/register`,
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.confirmPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (response.status === 201) {
                // await saveToken(response.data.token);
                // setIsAuthenticated(true);
                router.replace("/login");
                alert("Registration successful! Please log in.");
            }
        } catch (error) {
            const err = error as AxiosError<{ errors?: ServerError; message?: string }>;
            if (err.response?.status === 422) {
                setServerError(err.response.data.errors || {});
            } else {
                setServerError({
                    message: err.response?.data.message || "An error occurred during registration",
                });
            }
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <View className="flex-1 justify-center px-5">
                    <Text
                        className="text-3xl font-bold text-center mb-8 text-gray-800"
                        accessibilityLabel="Register header"
                    >
                        Create Account
                    </Text>

                    {serverError.message && (
                        <Text className="text-red-500 text-center mb-4">
                            {serverError.message}
                        </Text>
                    )}

                    <View>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="mb-4">
                                    <TextInput
                                        className={`bg-white border-2 ${errors.name || serverError.name
                                            ? "border-red-400"
                                            : "border-gray-200"
                                            } rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-500`}
                                        placeholder="Full Name"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        autoCapitalize="words"
                                        accessibilityLabel="Full name input"
                                    />
                                    {errors.name ? (
                                        <Text className="text-red-500 text-sm ml-3 mt-1">
                                            {errors.name.message}
                                        </Text>
                                    ) : serverError.name ? (
                                        <Text className="text-red-500 text-sm ml-3 mt-1">
                                            {serverError.name[0]}
                                        </Text>
                                    ) : null}
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="mb-4">
                                    <TextInput
                                        className={`bg-white border-2 ${errors.email || serverError.email
                                            ? "border-red-400"
                                            : "border-gray-200"
                                            } rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-500`}
                                        placeholder="Email"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        accessibilityLabel="Email input"
                                    />
                                    {errors.email ? (
                                        <Text className="text-red-500 text-sm ml-3 mt-1">
                                            {errors.email.message}
                                        </Text>
                                    ) : serverError.email ? (
                                        <Text className="text-red-500 text-sm ml-3 mt-1">
                                            {serverError.email[0]}
                                        </Text>
                                    ) : null}
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="mb-4">
                                    <View className="relative">
                                        <TextInput
                                            className={`bg-white border-2 ${errors.password || serverError.password
                                                ? "border-red-400"
                                                : "border-gray-200"
                                                } rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-500 pr-12`}
                                            placeholder="Password"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                            accessibilityLabel="Password input"
                                        />
                                        <TouchableOpacity
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            onPress={() => setShowPassword(!showPassword)}
                                            accessibilityLabel={
                                                showPassword ? "Hide password" : "Show password"
                                            }
                                        >
                                            <Ionicons
                                                name={showPassword ? "eye-off" : "eye"}
                                                size={24}
                                                color="gray"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.password ? (
                                        <Text className="text-red-500 text-sm ml-3 mt-1">
                                            {errors.password.message}
                                        </Text>
                                    ) : serverError.password ? (
                                        <Text className="text-red-500 text-sm ml-3 mt-1">
                                            {serverError.password[0]}
                                        </Text>
                                    ) : null}
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="mb-4">
                                    <View className="relative">
                                        <TextInput
                                            className={`bg-white border-2 ${errors.confirmPassword || serverError.confirmPassword
                                                ? "border-red-400"
                                                : "border-gray-200"
                                                } rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-500 pr-12`}
                                            placeholder="Confirm Password"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            secureTextEntry={!showConfirmPassword}
                                            autoCapitalize="none"
                                            accessibilityLabel="Confirm password input"
                                        />
                                        <TouchableOpacity
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                            accessibilityLabel={
                                                showConfirmPassword
                                                    ? "Hide confirm password"
                                                    : "Show confirm password"
                                            }
                                        >
                                            <Ionicons
                                                name={showConfirmPassword ? "eye-off" : "eye"}
                                                size={24}
                                                color="gray"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.confirmPassword ? (
                                        <Text className="text-red-500 text-sm ml-3 mt-1">
                                            {errors.confirmPassword.message}
                                        </Text>
                                    ) : serverError.confirmPassword ? (
                                        <Text className="text-red-500 text-sm ml-3 mt-1">
                                            {serverError.confirmPassword[0]}
                                        </Text>
                                    ) : null}
                                </View>
                            )}
                        />

                        <TouchableOpacity
                            className={`bg-blue-600 rounded-2xl py-4 flex-row justify-center items-center ${isSubmitting ? "opacity-70" : "opacity-100"
                                }`}
                            onPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            accessibilityLabel="Register button"
                        >
                            {isSubmitting && (
                                <ActivityIndicator
                                    size="small"
                                    color="white"
                                    style={{ marginRight: 8 }}
                                />
                            )}
                            <Text className="text-white text-center font-semibold text-xl">
                                {isSubmitting ? "Registering..." : "Register"}
                            </Text>
                        </TouchableOpacity>

                        <View className="mt-6">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                accessibilityLabel="Login link"
                            >
                                <Text className="text-center text-blue-600 text-base">
                                    Already have an account?{" "}
                                    <Text className="font-semibold">Log In</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;