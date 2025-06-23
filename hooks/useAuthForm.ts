import { useAuth } from '@/lib/auth/auth-provider';
import { signInSchema, signUpSchema } from '@/lib/auth/auth-schema';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as z from 'zod';

export const useAuthForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ email?: string; password?: string, confirmPassword?: string }>({});
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const router = useRouter();

    const { signIn, signUp } = useAuth();

    const handleSwitchMode = () => {
        setIsSignUp((prev) => !prev);
        setErrors({});
        setIsTouched(false);
    }

    const handleAuth = async () => {
        if(isSignUp && password !== confirmPassword){
            setErrors({...errors, confirmPassword: "Passwords don't match"});
            return;
        }
        if (isSignUp) {
            const error = await signUp(email, password);
            if (error) {
                setAuthError(error);
                return;
            }
        } else {
            console.log("Signing in...");
            const error = await signIn(email, password);
            if (error) {
                setAuthError(error);
                return;
            }
            router.replace("/(tabs)");
        }
    }

    useEffect(() => {
        if (!isTouched) return;

        try {
            if (isSignUp) {
                signUpSchema.parse({ email, password, confirmPassword });
            } else {
                signInSchema.parse({ email, password });
            }
            setErrors({});
        } catch (e) {
            if (e instanceof z.ZodError) {
                const newErrors: { email?: string; password?: string, confirmPassword?: string } = {};
                e.errors.forEach(err => {
                    if (err.path.includes('email')) {
                        newErrors.email = err.message;
                    }
                    if (err.path.includes('password')) {
                        newErrors.password = err.message;
                    }
                    if (err.path.includes('confirmPassword')) {
                        newErrors.confirmPassword = err.message;
                    }
                });
                setErrors(newErrors);
            }
        }
    }, [email, password, confirmPassword, isTouched, isSignUp])

    return {
        handleAuth,
        handleSwitchMode,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        isSignUp,
        setIsSignUp,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errors,
        isTouched,
        setIsTouched,
        authError,
        setAuthError,

    }
}