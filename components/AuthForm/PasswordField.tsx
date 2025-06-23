import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from './styles';

export default function PasswordField({
    showPassword,
    onChangedText,
    onTap,
    errors,
    isConfirmField
}: {
    showPassword: boolean,
    onChangedText: (text: string) => void,
    onTap: () => void,
    errors: any,
    isConfirmField: boolean
}) {

    return (
        <>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={isConfirmField ? "Confirm Password" : "Password"}
                    secureTextEntry={!showPassword}
                    onChangeText={onChangedText}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={onTap}
                >
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                </TouchableOpacity>
            </View>
            {isConfirmField && errors.confirmPassword &&  <Text style={styles.errorText}>{String(errors.confirmPassword ?? "")}</Text>}
            {!isConfirmField && errors.password && <Text style={styles.errorText}>{String(errors.password ?? "")}</Text>}
        </>
    )
}