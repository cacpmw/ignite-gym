import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthenticatedUser } from "@contexts/AuthContext";
import { AUTHENTICATED_USER } from "./storageConfig";

export async function saveAuthenticatedUserOnLocalStorage(user: IAuthenticatedUser): Promise<void> {
    await AsyncStorage.setItem(AUTHENTICATED_USER, JSON.stringify(user));
}
export async function getAuthenticatedUserFromLocalStorage(): Promise<IAuthenticatedUser> {
    const storedData = await AsyncStorage.getItem(AUTHENTICATED_USER);
    const authenticatedUser: IAuthenticatedUser = storedData ? JSON.parse(storedData) : {};
    return authenticatedUser;

}

export async function deleteAuthenticatedUserFromLocalStorage(): Promise<void> {
    await AsyncStorage.removeItem(AUTHENTICATED_USER);

}