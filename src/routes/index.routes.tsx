import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useTheme, Box } from "native-base";
import { MainRoutes } from "./main.routes";


export function Routes() {
    const { colors } = useTheme();
    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700]; // default bg color for all screens

    return (
        <Box flex={1}>
            <NavigationContainer theme={theme}>
                <MainRoutes />
            </NavigationContainer>
        </Box>
    );
}