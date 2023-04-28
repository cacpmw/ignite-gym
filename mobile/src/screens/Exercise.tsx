import { Text, HStack, Heading, Icon, VStack, Image, Box, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IMainRoutesProps } from "@routes/main.routes";
import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepsSVG from "@assets/repetitions.svg";
import { Button } from "@components/Button/Button";
export function Exercise() {
    const navigation = useNavigation<IMainRoutesProps>()
    function handleGoBack() {
        navigation.goBack();
    }
    return (
        <VStack flex={1}>

            <VStack px={8} bg="gray.600" pt={12}>
                <TouchableOpacity
                    onPress={handleGoBack}
                >
                    <Icon
                        as={Feather}
                        name="arrow-left"
                        color="green.500"
                        size={6}
                    />
                </TouchableOpacity>
                <HStack
                    mt={4}
                    mb={8}
                    alignItems="center"
                    justifyContent="space-between">
                    <Heading
                        flexShrink={1}
                        color="gray.100"
                        fontSize="lg"
                        fontFamily="heading"
                    >Title
                    </Heading>
                    <HStack alignItems="center">
                        <BodySVG />
                        <Text
                            color="gray.200"
                            ml={1}
                            textTransform="capitalize"
                        >costas</Text>
                    </HStack>
                </HStack>
            </VStack>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack p={8}>
                    <Image
                        w="full"
                        h={80}
                        source={{ uri: "https://www.origym.com.br/upload/remada-unilateral-3.png" }}
                        alt="exercise"
                        mb={3}
                        resizeMode="cover"
                        rounded="lg"

                    />
                    <Box
                        bg="gray.600"
                        pb={4}
                        px={4}
                        rounded="md"
                    >
                        <VStack>
                            <HStack
                                mb={6}
                                mt={5}
                                alignItems="center"
                                justifyContent="space-around">
                                <HStack >
                                    <SeriesSVG />
                                    <Text color="gray.200" ml={2}> 3 series </Text>

                                </HStack>
                                <HStack>
                                    <RepsSVG />
                                    <Text color="gray.200" ml={2}> 3 reps </Text>

                                </HStack>
                            </HStack>
                            <Button
                                text="Mark as done"
                            />
                        </VStack>

                    </Box>
                </VStack>
            </ScrollView>




        </VStack>
    );
}