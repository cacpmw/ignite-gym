import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

type IAuthRoutes = {
    signIn: undefined;
    signUp: undefined;
}

export interface IAuthNavigatorRoutesProps extends NativeStackNavigationProp<IAuthRoutes> {

}
const { Navigator, Screen } = createNativeStackNavigator<IAuthRoutes>();

export function AuthRoutes() {
    return (
        <Navigator initialRouteName="signIn" screenOptions={{ headerShown: false }}>
            <Screen
                name="signIn"
                component={SignIn}
            />

            <Screen
                name="signUp"
                component={SignUp}
            />


        </Navigator>
    );
}