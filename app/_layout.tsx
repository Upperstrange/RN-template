import { AuthProvider } from "@/lib/auth/auth-provider";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import LayoutWithAuth from "./_layout-with-auth";
import "./globals.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <LayoutWithAuth/>
    </AuthProvider>
  );
}
