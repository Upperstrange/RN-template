import { AuthContextType } from "@/lib/auth/auth-context-type"
import { createContext } from "react"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default AuthContext