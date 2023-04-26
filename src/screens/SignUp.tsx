import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import BackgroundImage from "@assets/background.png";
import LogoSVG from "@assets/logo.svg";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IAuthNavigatorRoutesProps } from "@routes/auth.routes";
export function SignUp() {
    const navigation = useNavigation<IAuthNavigatorRoutesProps>();

    function handleSignIn() {
        navigation.navigate("signIn");
    }
    return (
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === 'ios' ? 180 : 16
        }}
            showsVerticalScrollIndicator={false}>
            <VStack flex={1} bg="gray.700" px={10} pb={Platform.OS === 'ios' ? 40 : 16}>
                <Image
                    source={BackgroundImage}
                    defaultSource={BackgroundImage}
                    alt="People exercising"
                    resizeMode="contain"
                    position="absolute"
                />
                <Center my={24}>
                    <LogoSVG />
                    <Text color="gray.100">Train your mind and body</Text>

                </Center>
                <Center>
                    <Heading
                        color="gray.100"
                        fontSize="xl"
                        mb={6}
                        fontFamily="heading"
                    >Create your account</Heading>
                    <Input
                        placeholder="Name"
                        keyboardType="default"

                    />
                    <Input
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Password"
                        secureTextEntry
                    />
                    <Button
                        text="Sign Up"
                    />

                </Center>

                <Center mt={24}>
                    <Text
                        color="gray.100"
                        fontSize="sm"
                        mb={3}
                        fontFamily="body"
                    >Already have an account?</Text>
                    <Button
                        text="Sign In"
                        variant="outline"
                        onPress={handleSignIn}

                    />
                </Center>

            </VStack>
        </ScrollView>

    );
}
