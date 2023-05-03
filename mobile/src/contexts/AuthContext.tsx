import { api } from "@services/ApiConnection";
import { ReactNode, createContext, useEffect, useState } from "react";
import { saveAuthenticatedUserOnLocalStorage, getAuthenticatedUserFromLocalStorage, deleteAuthenticatedUserFromLocalStorage } from "@storage/authenticatedUserStorage";
export interface IAuthenticatedUser {
    id: number;
    avatar: string | null;
    email: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}
export interface IAuthenticationContext {
    authenticatedUser: IAuthenticatedUser,
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingAuthenticatedUser: boolean;


}
interface ISignInAxiosResponse {
    token: string;
    refresh_token: string;
    user: {
        id: number;
        avatar: string | null;
        email: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }
}

export const AuthContext = createContext<IAuthenticationContext>({} as IAuthenticationContext);

interface IAuthContextProviderProps {
    children: ReactNode;
}
export function AuthContextProvider({ children }: IAuthContextProviderProps) {
    const [authenticatedUser, setAuthenticatedUser] = useState<IAuthenticatedUser>({} as IAuthenticatedUser);
    const [isLoadingAuthenticatedUser, setIsLoadingAuthenticatedUser] = useState(true);
    async function signIn(email: string, password: string) {
        try {
            console.log("Started sigin");

            const { token, refresh_token, user } = (await api.post<ISignInAxiosResponse>("/sessions", { email, password })).data;
            if (user) {
                setAuthenticatedUser(user);
                await saveAuthenticatedUserOnLocalStorage(user);

            }
        } catch (error) {
            throw error;
        } finally {
            console.log("Logged as: ", authenticatedUser);
        }
    }
    async function loadAuthenticatedUserData() {
        try {

            const authenticatedUserData = await getAuthenticatedUserFromLocalStorage();
            if (authenticatedUserData) {
                setAuthenticatedUser(authenticatedUserData);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingAuthenticatedUser(false);

        }
    }
    async function signOut() {
        setIsLoadingAuthenticatedUser(true);
        setAuthenticatedUser({} as IAuthenticatedUser);
        await deleteAuthenticatedUserFromLocalStorage();
        setIsLoadingAuthenticatedUser(false);
    }


    useEffect(() => {
        loadAuthenticatedUserData();
    }, []);
    return (
        <AuthContext.Provider value={{
            authenticatedUser,
            signIn,
            signOut,
            isLoadingAuthenticatedUser
        }}>

            {children}
        </AuthContext.Provider>
    );
}