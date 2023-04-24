import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import BackgroundImage from "@assets/background.png";
import LogoSVG from "@assets/logo.svg";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IAuthNavigatorRoutesProps } from "@routes/auth.routes";
export function SignIn() {
    const navigation = useNavigation<IAuthNavigatorRoutesProps>();

    function handleSignUp(){
        navigation.navigate("signUp");
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
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
                    >Access your account</Heading>
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
                        text="Sign In"
                    />

                </Center>

                <Center mt={24}>
                    <Text
                        color="gray.100"
                        fontSize="sm"
                        mb={3}
                        fontFamily="body"
                    >Don't an account yet?</Text>
                    <Button
                        text="Sign Up"
                        variant="outline"
                        onPress={handleSignUp}
                    />
                </Center>

            </VStack>
        </ScrollView>

    );
}