import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { Center, ScrollView, Skeleton, Text, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export function Profile() {
    const PHOTOSIZE = 33;
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    return (
        <VStack flex={1}>
            <ScreenHeader title="Profile" />
            <ScrollView>
                <Center mt={6} px={10}>
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
                            fontWeight="bold"
                            color="green.500"
                            fontSize="md"
                            mt={2}
                            mb={8}

                        >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                </Center>
            </ScrollView>

        </VStack>

    );
}