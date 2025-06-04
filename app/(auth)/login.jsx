// import { saveToken } from "@/store/AuthSecureStorage";
// import useAuthStore from "@/ZustandAuthStore";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { z } from "zod";

// // Define the validation schema with zod
// const loginSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Please enter a valid email"),
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .max(20, "Password cannot exceed 20 characters"),
// });

// // Define the form data type based on the schema
// // type LoginFormData = z.infer<typeof loginSchema>;

// const LoginScreen = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const [serverError, setServerError] = useState({});

//   //   useForm <
//   //   LoginFormData >
//   //   {
//   //     resolver: zodResolver(loginSchema),
//   //     defaultValues: {
//   //       email: "",
//   //       password: "",
//   //     },
//   //   };
//   const router = useRouter();
//   const { setIsAuthenticated } = useAuthStore();

//   // const onSubmit = async (data: LoginFormData) => {
//   const onSubmit = async (data) => {
//     setServerError({}); // Reset server errors before submission

//     try {
//       const response = await axios.post(
//         "https://accounting.anshumemorial.in/api/login",
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );

//       console.log("Login response:", response);

//       if (response.status === 200) {
//         // Save the token to secure storage
//         await saveToken(response.data.token);
//         router.replace("/"); // Redirect to home page
//         // alert("Login successful!");
//         setIsAuthenticated(true); // Update authentication state
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 422) {
//         // Handle validation errors
//         console.log("Validation error:", error.response.data.errors?.email);
//         console.log("Validation error:", error.response.data.errors?.email[0]);
//         setServerError(error.response.data.errors);
//       }
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log("error.response.data.errorse", error.response.data.errors);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log("Error", error.message);
//       }
//       console.log(error.config);
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <KeyboardAvoidingView
//         className="flex-1"
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
//       >
//         <View className="flex-1 justify-center px-5">
//           {/* <Text className="text-4xl font-bold text-center mb-12 text-gray-400">
//                         Log In
//                     </Text> */}
//           <View>
//             <Controller
//               control={control}
//               name="email"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <View className="mb-4">
//                   <TextInput
//                     className={`bg-white border-2 ${
//                       errors.email || serverError.email
//                         ? "border-red-400"
//                         : "border-gray-200"
//                     } rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-500`}
//                     placeholder="Email"
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                   />
//                   {errors.email ? (
//                     <Text className="text-red-500 text-sm ml-3">
//                       {errors.email.message}
//                     </Text>
//                   ) : serverError.email ? (
//                     <Text className="text-red-500 text-sm ml-3">
//                       {serverError.email[0]}
//                     </Text>
//                   ) : null}
//                 </View>
//               )}
//             />
//             <Controller
//               control={control}
//               name="password"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <View className="mb-4">
//                   <TextInput
//                     className={`bg-white border-2 ${
//                       errors.password ? "border-red-400" : "border-gray-200"
//                     } rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-500`}
//                     placeholder="Password"
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     secureTextEntry
//                     autoCapitalize="none"
//                   />
//                   {errors.password && (
//                     <Text className="text-red-500 text-sm ml-3">
//                       {errors.password.message}
//                     </Text>
//                   )}
//                 </View>
//               )}
//             />
//             <TouchableOpacity
//               className={`bg-blue-600 rounded-2xl py-4 ${
//                 isSubmitting ? "opacity-70" : "opacity-100"
//               }`}
//               onPress={handleSubmit(onSubmit)}
//               disabled={isSubmitting}
//             >
//               <Text className="text-white text-center font-semibold text-xl">
//                 {isSubmitting ? "Logging In..." : "Log In"}
//               </Text>
//             </TouchableOpacity>

//             <View className="mt-6">
//               <TouchableOpacity onPress={() => router.push("/register")}>
//                 <Text className="text-center text-blue-600 mt-4">
//                   Don&apos;t have an account? Sign Up
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* <View className="mt-10">
//               <TouchableOpacity
//                 className="bg-violet-600 rounded-2xl py-4"
//                 onPress={() => router.replace("/")}
//               >
//                 <Text className="text-center text-white text-xl font-semibold">
//                   Home
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View className="mt-10">
//               <TouchableOpacity
//                 className="bg-violet-600 rounded-2xl py-4"
//                 onPress={() => saveToken("test-token23")}
//               >
//                 <Text className="text-center text-white text-xl font-semibold">
//                   Save Token
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View className="mt-10">
//               <TouchableOpacity
//                 className="bg-violet-600 rounded-2xl py-4"
//                 onPress={() => getSavedToken()}
//               >
//                 <Text className="text-center text-white text-xl font-semibold">
//                   Get Token
//                 </Text>
//               </TouchableOpacity>
//             </View> */}
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

import { saveToken } from "@/store/AuthSecureStorage";
import useAuthStore from "@/ZustandAuthStore";
import { Ionicons } from "@expo/vector-icons"; // Add this import
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

// Define the validation schema with zod
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

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [serverError, setServerError] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility

  const router = useRouter();
  const { setIsAuthenticated } = useAuthStore();

  const onSubmit = async (data) => {
    setServerError({}); // Reset server errors before submission

    try {
      const response = await axios.post(
        "https://accounting.anshumemorial.in/api/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Login response:", response);

      if (response.status === 200) {
        await saveToken(response.data.token);
        router.replace("/");
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log("Validation error:", error.response.data.errors?.email);
        console.log("Validation error:", error.response.data.errors?.email[0]);
        setServerError(error.response.data.errors);
      }
      if (error.response) {
        console.log(error.response.data);
        console.log("error.response.data.errorse", error.response.data.errors);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
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
          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-4">
                  <TextInput
                    className={`bg-white border-2 ${
                      errors.email || serverError.email
                        ? "border-red-400"
                        : "border-gray-200"
                    } rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-500`}
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email ? (
                    <Text className="text-red-500 text-sm ml-3">
                      {errors.email.message}
                    </Text>
                  ) : serverError.email ? (
                    <Text className="text-red-500 text-sm ml-3">
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
                      className={`bg-white border-2 ${
                        errors.password ? "border-red-400" : "border-gray-200"
                      } rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-500 pr-12`}
                      placeholder="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text className="text-red-500 text-sm ml-3">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <TouchableOpacity
              className={`bg-blue-600 rounded-2xl py-4 ${
                isSubmitting ? "opacity-70" : "opacity-100"
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Text className="text-white text-center font-semibold text-xl">
                {isSubmitting ? "Logging In..." : "Log In"}
              </Text>
            </TouchableOpacity>

            <View className="mt-6">
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text className="text-center text-blue-600 mt-4">
                  Don&apos;t have an account? Sign Up
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
