import { Text, TouchableOpacity } from "react-native";
import styles from './styles';

export default function AuthBtn({isSignUp, action}: {isSignUp: boolean, action: () => Promise<void>}) {
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={action}>
            <Text className="text-white font-bold text-lg">
                {isSignUp ? "Sign Up" : "Sign In"}
            </Text>
        </TouchableOpacity>
    )
}