import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";
import BackgroundImage from "@assets/background.png";
import LogoSVG from "@assets/logo.svg";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IAuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/ApiConnection";
import { AppError } from "@exceptions/AppError";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";

const signInSchema = Yup.object({

    email: Yup.string().required("Required field").email("Invalid email address"),
    password: Yup.string().required("Required field").min(6, "at least 6 chars"),


});

interface SignInInputPayload {

    email: string;
    password: string,

}

export function SignIn() {
    const [isLoading,setIsLoading] = useState(false);
    const toast = useToast();
    const { signIn } = useAuth();

    const navigation = useNavigation<IAuthNavigatorRoutesProps>();
    const { control, handleSubmit, formState: { errors } } = useForm<SignInInputPayload>({
        resolver: yupResolver(signInSchema),
    });
    async function handleSignIn({ email, password }: SignInInputPayload) {
        try {
            setIsLoading(true);
           await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Unable to reach the server. Please try again later';

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });

        }finally{
            setIsLoading(false);
        }

    }
    function handleSignUp() {
        navigation.navigate("signUp");
    }
    return (
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === 'ios' ? 180 : 16
        }}
            showsVerticalScrollIndicator={false}>
            <VStack
                flex={1}
                bg="gray.700"
                px={10}
                pb={Platform.OS === 'ios' ? 40 : 16}
            >
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

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />


                        )}

                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Password"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="done"
                                errorMessage={errors.password?.message}

                            />
                        )}
                    />

                    <Button
                        text="Sign In"
                        onPress={handleSubmit(handleSignIn)}
                        isLoading={isLoading}
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