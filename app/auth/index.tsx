// app/auth.tsx

import React, { useState } from "react";
import { View, TextInput, Text, Pressable, Alert } from "react-native";
import { Stack, Tabs, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase"; // Adjust the path as needed

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      router.replace("/");
    }
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Check your email for the confirmation link.");
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Stack.Screen options={{ title: "Sign In or Register" }} />
      <Text className="text-3xl font-bold text-center text-neutral-800 mb-8">
        Welcome Back
      </Text>

      <View className="space-y-4">
        <TextInput
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          className="border border-neutral-300 rounded-lg px-4 py-3 text-base text-neutral-900 bg-neutral-100"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-neutral-300 rounded-lg px-4 py-3 text-base text-neutral-900 bg-neutral-100"
        />
      </View>

      <Pressable
        onPress={handleSignIn}
        className="mt-6 bg-red-600 rounded-lg py-3"
      >
        <Text className="text-center text-white font-semibold text-base">
          Sign In
        </Text>
      </Pressable>

      <Pressable
        onPress={handleSignUp}
        className="mt-3 border border-red-600 rounded-lg py-3"
      >
        <Text className="text-center text-red-600 font-semibold text-base">
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
}
