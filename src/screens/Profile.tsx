import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from "native-base";
import { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";

export function Profile() {
    const PHOTOSIZE = 33;
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    return (
        <VStack flex={1}>
            <ScreenHeader title="Profile" />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: Platform.OS === 'ios' ? 180 : 16
                }}
                px={10}>
                <Center mt={6} >
                    {photoIsLoading ? <Skeleton
                        w={PHOTOSIZE}
                        h={PHOTOSIZE}
                        rounded="full"
                        startColor="gray.500"
                        endColor="gray.400"
                    /> :
                        <UserPhoto
                            source={{
                                uri: "https://www.github.com/cacpmw.png"
                            }}
                            alt="profile image"
                            size={PHOTOSIZE}
                            mr={4}
                        />}
                    <TouchableOpacity>
                        <Text
                            alignItems="center"
                            fontFamily="heading"
                            color="green.500"
                            fontSize="md"
                            mt={2}
                            mb={8}

                        >
                            Change Photo
                        </Text>
                    </TouchableOpacity>
                    <Input
                        bg="gray.600"
                        placeholder="Name"
                    />
                    <Input
                        bg="gray.600"
                        value="email@email.com"
                        isDisabled

                    />

                </Center>
                <VStack mt={12} mb={9}>
                    <Heading
                        fontFamily="heading"
                        color="gray.200"
                        fontSize="md"
                        mb={8}
                    >
                        Change Password
                    </Heading>
                    <Input
                        bg="gray.600"
                        placeholder="Old password"
                        secureTextEntry
                    />
                    <Input
                        bg="gray.600"
                        placeholder="New password"
                        secureTextEntry
                    />
                    <Input
                        bg="gray.600"
                        placeholder="Confirm password"
                        secureTextEntry
                    />
                    <Button
                    mt={4}
                    text="Update"/>
                </VStack>
            </ScrollView>

        </VStack>

    );
}