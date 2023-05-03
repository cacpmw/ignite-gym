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
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

interface SignUpInputPayload {
    name: string;
    email: string;
    password: string,
    passwordConfirm: string;
}

const signUpSchema = Yup.object({
    name: Yup.string().required("Required field"),
    email: Yup.string().required("Required field").email("Invalid email address"),
    password: Yup.string().required("Required field").min(6, "at least 6 chars"),
    passwordConfirm: Yup.string().required("Required field")
        .oneOf([Yup.ref("password")], "Passwords dont match"),

});

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const {signIn} = useAuth();
    const navigation = useNavigation<IAuthNavigatorRoutesProps>();
    const toast = useToast();


    const { control, handleSubmit, formState: { errors } } = useForm<SignUpInputPayload>({
        resolver: yupResolver(signUpSchema),
    });
    function handleSignIn() {
        navigation.navigate("signIn");
    }
    async function handleSignUp({ name, email, password }: SignUpInputPayload) {
        try {
            setIsLoading(true);
            await api.post("/users", { name, email, password });
            await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Unable to reach the server. Please try again later';

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });

        } finally {
            setIsLoading(false);
        }


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
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Name"
                                keyboardType="default"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}

                            />


                        )}
                    />

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
                                errorMessage={errors.password?.message}

                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="passwordConfirm"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirm Password"
                                secureTextEntry
                                onChangeText={onChange}
                                returnKeyType="send"
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                errorMessage={errors.passwordConfirm?.message}

                            />
                        )}
                    />




                    <Button
                        text="Sign Up"
                        onPress={handleSubmit(handleSignUp)}
                        isLoading={isLoading}
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
