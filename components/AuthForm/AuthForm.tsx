import { useAuthForm } from '@/hooks/useAuthForm';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import AuthBtn from './AuthBtn';
import PasswordField from './PasswordField';
import styles from './styles';

const AuthForm = () => {
    const {
        handleSwitchMode,
        setEmail,
        setPassword,
        setConfirmPassword,
        setShowPassword,
        setIsTouched,
        handleAuth,
        setShowConfirmPassword,
        isSignUp,
        showPassword,
        showConfirmPassword,
        errors,
        authError } = useAuthForm();


    return (
        <View className="w-[80%] p-6 bg-white border-2 border-slate-400/10 rounded-3xl shadow-xl shadow-blue-100">

            <Text style={styles.title}>
                {isSignUp ? "Create Account" : "Welcome Back"}
            </Text>

            {/* Email input */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(text) => {
                    setEmail(text);
                    setIsTouched(true);
                }}
            />

            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password input */}
            <PasswordField
                isConfirmField={false}
                showPassword={showPassword}
                onChangedText={(text) => {
                    setPassword(text);
                    setIsTouched(true);
                }}
                onTap={() => setShowPassword(!showPassword)}
                errors={errors} />

            {/* Confirm password field */}
            {isSignUp && (
                <PasswordField
                    isConfirmField={true}
                    showPassword={showConfirmPassword}
                    onChangedText={(text) => {
                        setConfirmPassword(text);
                        setIsTouched(true);
                    }}
                    onTap={() => setShowConfirmPassword(!showConfirmPassword)}
                    errors={errors} />

            )}

            {/* Button */}
            <AuthBtn isSignUp={isSignUp} action={handleAuth} />

            {/* Errors during auth from appwrite */}

            {authError && (
                <Text className="text-red-500 text-center text-md mt-6">
                    {authError}
                </Text>
            )}

            {/* Switch mode link */}
            <Text className="text-blue-500 text-center text-md mt-6" onPress={handleSwitchMode}>
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </Text>

        </View>
    )
}

export default AuthForm