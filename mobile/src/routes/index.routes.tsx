import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useTheme, Box } from "native-base";
import { MainRoutes } from "./main.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading/Loading";


export function Routes() {
    const { colors } = useTheme();
    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700]; // default bg color for all screens
    const { authenticatedUser, isLoadingAuthenticatedUser } = useAuth();
    console.log("index.routes: ", authenticatedUser);

    if (isLoadingAuthenticatedUser) {
        return <Loading />
    }
    return (
        <Box flex={1}>
            <NavigationContainer theme={theme}>
                {authenticatedUser.id ? <MainRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    );
}