import { useAuth } from "@/lib/auth/auth-provider";
import { Text, TouchableOpacity } from "react-native";

export default function SignOutBtn() {
    const { signOut } = useAuth();
    return (
        <TouchableOpacity
            onPress={signOut}
            className="p-4 rounded-full bg-red-500">
            <Text className=" text-white font-bold text-xl">
                Sign Out
            </Text>
        </TouchableOpacity>
    )
}