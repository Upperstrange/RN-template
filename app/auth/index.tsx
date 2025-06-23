import { KeyboardAvoidingView, Platform } from 'react-native';
import AuthForm from '../../components/AuthForm/AuthForm';

const AuthScreen = () => {

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 justify-center items-center bg-slate-50">
            <AuthForm/>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;
