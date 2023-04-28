import { ExerciseCard } from "@components/ExerciseCard/ExerciseCard";
import { Group } from "@components/Group/Group";
import { HomeHeader } from "@components/HomeHeader/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { IMainRoutesProps } from "@routes/main.routes";
import { Center, FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useState } from "react";

export function Home() {
    const navigation = useNavigation<IMainRoutesProps>();

    const [selectedGroup, setSelectedGroup] = useState("costa");
    const [groups, setGroups] = useState(["costa", "biceps", "triceps", "ombro"]);
    const [exercises, setExercises] = useState(["Remada", "Supino", "Barra", "Levantamento"]);
    function handleOpenExercise() {
        navigation.navigate("exercise")
    }
    return (
        <VStack flex={1} >
            <HomeHeader />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={selectedGroup.toLowerCase() === item.toLowerCase()}
                        onPress={() => setSelectedGroup(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={10}
                maxH={10}
                minH={10}
            />
            <VStack flex={1} px={8}>

                <HStack
                    mb={5}
                    justifyContent="space-between"
                >
                    <Heading
                        color="gray.200"
                        fontSize="md"
                        fontFamily="heading"
                    >
                        Exercises
                    </Heading>
                    <Text
                        color="gray.200"
                        fontSize="sm"
                    >{exercises.length}</Text>
                </HStack>
                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExerciseCard
                            title={item}
                            description={item}
                            onPress={handleOpenExercise}

                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom: 20 }}
                />
            </VStack>

        </VStack>
    );
}