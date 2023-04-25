import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface IExerciseCardComponentProps extends TouchableOpacityProps {
    title:string;
    description: string;
}
export function ExerciseCard({title, description, ...rest }: IExerciseCardComponentProps) {
    return (
        <TouchableOpacity

            {...rest}
        >
            <HStack
                bg="gray.500"
                alignItems="center"
                p={2}
                pr={4}
                rounded="md"
                mb={3}
            >
                <Image
                    source={{ uri: "https://www.origym.com.br/upload/remada-unilateral-3.png" }}
                    alt="image"
                    w={16}
                    h={16}
                    rounded="md"
                    mr={4}
                    resizeMode="center"
                />
                <VStack flex={1}>
                    <Heading
                        fontSize="lg"
                        color="white"
                    >{title}
                    </Heading>
                    <Text
                        fontSize="sm"
                        color="gray.200"
                        mt={1}
                        numberOfLines={2}
                    >
                        {description}

                    </Text>
                </VStack>
                <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
            </HStack>

        </TouchableOpacity>
    );
}