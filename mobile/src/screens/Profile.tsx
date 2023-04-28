import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export function Profile() {
    const PHOTOSIZE = 33;
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [photoUri, setPhotoUri] = useState("https://www.github.com/cacpmw.png");
    const toast = useToast();

    async function handleUserPhotoSelection() {
        try {
            setPhotoIsLoading(true);

            let photo = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                aspect: [4, 4],
                quality: 1,
                allowsEditing: true,
            });
            if (!photo.canceled) {
                const photoInfo = await FileSystem.getInfoAsync(photo.assets[0].uri,{
                    size: true
                });
                console.log(photoInfo);
                if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
                    return toast.show({
                        title: "Too big a image. Select a photo under 5MB",
                        placement:"top",
                        bgColor:"red.500"

                    });
                }
                setPhotoUri(photo.assets[0].uri);
            }
        } catch (error) {
            console.log(error);

        } finally {
            setPhotoIsLoading(false);

        }


    }
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
                                uri: photoUri
                            }}
                            alt="profile image"
                            size={PHOTOSIZE}

                        />}
                    <TouchableOpacity
                        onPress={handleUserPhotoSelection}
                    >
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
                        text="Update" />
                </VStack>
            </ScrollView>

        </VStack>

    );
}