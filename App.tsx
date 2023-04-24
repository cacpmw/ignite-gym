import { StatusBar, Text } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { NativeBaseProvider,  } from "native-base";
import { Loading } from '@components/Loading/Loading';
import { THEME } from '@theme/index';
export default function App() {
  const [fontsLoaded] = useFonts([
    Roboto_400Regular,
    Roboto_700Bold
  ])
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Text>Hello World</Text>: <Loading/>}
    </NativeBaseProvider>

  );
}
