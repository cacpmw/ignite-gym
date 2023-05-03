import { api } from "@services/ApiConnection";
import { ReactNode, createContext, useEffect, useState } from "react";
import {
    saveAuthenticatedUserOnLocalStorage,
    getAuthenticatedUserFromLocalStorage,
    deleteAuthenticatedUserFromLocalStorage,
    saveAuthenticatedUserTokenOnLocalStorage,
    getAuthenticatedUserTokenFromLocalStorage,
    deleteAuthenticatedUserTokenFromLocalStorage
} from "@storage/authenticatedUserStorage";
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
    async function updateAuthenticatedUserAndToken(user: IAuthenticatedUser, token: string) {

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthenticatedUser(user);


    }
    async function saveAuthenticatedUserAndTokenOnLocalStorage(user: IAuthenticatedUser, token: string){
        try {
            setIsLoadingAuthenticatedUser(true);
            await saveAuthenticatedUserOnLocalStorage(user);
            await saveAuthenticatedUserTokenOnLocalStorage(token);
        } catch (error) {

        }finally{
            setIsLoadingAuthenticatedUser(false);
        }

    }
    async function signIn(email: string, password: string) {
        try {
            console.log("Started signin");

            const { token, refresh_token, user } = (await api.post<ISignInAxiosResponse>("/sessions", { email, password })).data;
            if (user && token) {

                await saveAuthenticatedUserAndTokenOnLocalStorage(user, token);
                await updateAuthenticatedUserAndToken(user, token);
            }
        } catch (error) {
            throw error;
        } finally {
            console.log("Logged as: ", authenticatedUser);
            setIsLoadingAuthenticatedUser(false);

        }
    }
    async function loadAuthenticatedUserData() {
        try {
            setIsLoadingAuthenticatedUser(true);

            const authenticatedUserData = await getAuthenticatedUserFromLocalStorage();
            const token = await getAuthenticatedUserTokenFromLocalStorage();
            if (token && authenticatedUserData) {
                updateAuthenticatedUserAndToken(authenticatedUserData, token);
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
        await deleteAuthenticatedUserTokenFromLocalStorage();
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