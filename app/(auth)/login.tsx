import { API_URL } from "@/src/constants/config";
import { useAuthStore } from "@/src/store/authStore";
// import { saveToken } from "@/store/AuthSecureStorage";
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
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

// Type definition for form data
type LoginFormData = z.infer<typeof loginSchema>;

// Type definition for server errors
type ServerError = {
  email?: string[];
  password?: string[];
  message?: string;
};

const LoginScreen = () => {

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [serverError, setServerError] = useState<ServerError>({});
  const [showPassword, setShowPassword] = useState(false);

  const { setAuth, _hasHydrated } = useAuthStore();
  // const { setIsAuthenticated } = useAuthStore();

  const router = useRouter();

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    setServerError({});

    try {
      const response = await axios.post(
        `${API_URL}/api/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        // await saveToken(response.data.token);
        // setIsAuthenticated(true);
        // Store tokens and user info in Zustand
        setAuth({
          accessToken: response.data.token,
          refreshToken: null, // Assuming no refresh token is provided
          user: {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
          },
        });
        router.replace("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      const err = error as AxiosError<{ errors?: ServerError; message?: string }>;
      if (err.response?.status === 422) {
        setServerError(err.response.data.errors || {});
      } else {
        setServerError({
          message: err.response?.data.message || "An error occurred during login",
        });
      }
    }
  };

  // if (!_hasHydrated) {
  //   return <Text>Loading...</Text>;
  // }

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
            accessibilityLabel="Login header"
          >
            Welcome Back
          </Text>

          {serverError.message && (
            <Text className="text-red-500 text-center mb-4">
              {serverError.message}
            </Text>
          )}

          <View>
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

            <TouchableOpacity
              className={`bg-blue-600 rounded-2xl py-4 flex-row justify-center items-center ${isSubmitting ? "opacity-70" : "opacity-100"
                }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              accessibilityLabel="Login button"
            >
              {isSubmitting && (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{ marginRight: 8 }}
                />
              )}
              <Text className="text-white text-center font-semibold text-xl">
                {isSubmitting ? "Logging In..." : "Log In"}
              </Text>
            </TouchableOpacity>

            <View className="mt-6">
              <TouchableOpacity
                onPress={() => router.push("/register")}
                accessibilityLabel="Sign up link"
              >
                <Text className="text-center text-blue-600 text-base">
                  Don&apos;t have an account?{" "}
                  <Text className="font-semibold">Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;