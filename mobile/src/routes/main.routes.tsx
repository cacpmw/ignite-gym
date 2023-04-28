import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Exercise } from "@screens/Exercise";
import { Home } from "@screens/Home";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";
import ExerciseSvg from "@assets/exercise.svg";
import { useTheme } from "native-base";
import { Platform } from "react-native";

type IMainRoutes = {
    home: undefined;
    exercise: undefined;
    history: undefined;
    profile: undefined;
}
export interface IMainRoutesProps extends BottomTabNavigationProp<IMainRoutes> {

}
export function MainRoutes() {
    const { sizes, colors } = useTheme();
    const iconSize = sizes[6];
    const { Navigator, Screen } = createBottomTabNavigator<IMainRoutes>();

    return (
        <Navigator initialRouteName="home" screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.green[500],
            tabBarInactiveTintColor: colors.gray[200],
            tabBarStyle: {
                backgroundColor: colors.gray[600],
                borderTopWidth: 0,
                height: Platform.OS === "ios" ? 96 : "auto",
                paddingBottom: sizes[10],
                paddingTop: sizes[6]
            }

        }}>
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg
                            fill={color}
                            width={iconSize}
                            height={iconSize}
                        />
                    )
                }}

            />
            <Screen
                name="history"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HistorySvg
                            fill={color}
                            width={iconSize}
                            height={iconSize}
                        />
                    )
                }}
            />
            <Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileSvg
                            fill={color}
                            width={iconSize}
                            height={iconSize}
                        />
                    )
                }}
            />

            <Screen
                name="exercise"
                component={Exercise}
                options={{
                    tabBarButton: ()=> null
                }}
            />





        </Navigator>
    );
}