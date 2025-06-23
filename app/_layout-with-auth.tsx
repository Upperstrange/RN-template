import { useAuth } from "@/lib/auth/auth-provider";
import AuthRedirect from "@/lib/auth/auth-redirect";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import "react-native-reanimated";
import "./globals.css";

export default function LayoutWithAuth() {
  const { isLoadingUser } = useAuth();

  if (isLoadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <AuthRedirect />
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}