import { user } from "@/lib/auth/auth-context-type";
import { useContext, useEffect, useState } from "react";
import { ID } from "react-native-appwrite";
import { account } from "../appwrite";
import AuthContext from "./auth-context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<user>(null);
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

    useEffect(()=> {
        getUser();
    }, [])

    const getUser = async () => {
        try{
            const session = await account.get();
            setUser(session)
        } catch(e){
            setUser(null)
        } finally{
            setIsLoadingUser(false);
        }
    }

    const signUp = async (email: string, password: string) => {
        try{
            await account.create(ID.unique(), email, password );
            await signIn(email, password);
            return null;
        }catch (e){
            if(e instanceof Error){
                return e.message;
            }
            return "Unkown error occured during signup";
        }
    }

    const signIn = async (email:string, password:string) => {
        try{
            await account.createEmailPasswordSession(email, password);
            await getUser();
            return null;
        }catch (e){
            if(e instanceof Error){
                return e.message;
            }
            return "Unkown error occured during signin";
        }
    }

    const signOut = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoadingUser, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("useAuth must be inside of the AuthProvider")
    }
    return context;
}
