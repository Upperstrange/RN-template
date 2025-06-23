import { useAuth } from "@/lib/auth/auth-provider";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function AuthRedirect() {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();
  const inAuthGroup = segments[0] === "auth";

  useEffect(() => {
    if (isLoadingUser) return;
    if (!user && !inAuthGroup) {
      router.replace("/auth");
    }
    if (user && inAuthGroup) {
        router.replace("/(tabs)");
    }
  }, [user, segments, router, isLoadingUser]);

  return null;
}