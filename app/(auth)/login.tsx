import { login } from "@/features/auth/authSlice";
import { AppDispatch, RootState } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert("Error", "Please enter phone number and password");
      return;
    }
    try {
      const user = await dispatch(login({ phoneNumber, password })).unwrap();
      console.log(user);
      router.push("/");
    } catch (error: any) {
      console.log("Login error:", JSON.stringify(error, null, 2));
      Alert.alert("Login Failed", error.message || "An error occurred");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover" // Ensures the image covers the whole area
      className="px-6"
    >
      {/* Logo */}
      <View className="items-center">
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 220, height: 220 }}
          resizeMode="contain"
        />
      </View>

      {/* Glassmorphic Form
      <BlurView
        intensity={120}
        tint="dark"
        className="w-full max-w-md rounded-3xl border border-white/20 bg-black/60 p-6"
      > */}
      {/* Header */}
      <Text className="text-white text-4xl font-bold text-center mb-2">
        Welcome Back
      </Text>
      <Text className="text-[#facc15] font-medium text-base text-center mb-8">
        Sign in to continue
      </Text>

      {/* phoneNumber Input */}
      <View className="mb-5">
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="number-pad"
          autoCapitalize="none"
          placeholderTextColor="#cbd5e1"
          className="border border-[#facc15]/20 rounded-xl px-4 py-3 text-white"
        />
      </View>

      {/* Password Input */}
      <View className="mb-16 relative">
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#cbd5e1"
          className=" border border-[#facc15]/20 rounded-xl px-4 py-3 text-white pr-12"
        />
        <TouchableOpacity
          className="absolute right-4 top-3"
          onPress={() => setShowPassword(!showPassword)}        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#cbd5e1"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.9}
        className="rounded-xl overflow-hidden shadow-xl"
      >
        <LinearGradient
          colors={["#facc15", "#eab308"]}
          className="py-3 rounded-xl items-center"
        >
          {loading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Text className="text-black font-bold text-base">Log In</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
      {/* </BlurView> */}
    </ImageBackground>
  );
}
