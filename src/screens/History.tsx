import { EmptyList } from "@components/EmptyList/EmpytList";
import { HistoryCard } from "@components/HistoryCard/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { Heading, VStack, SectionList } from "native-base";
import { useState } from "react";

interface ISectionListProps {
    title: string;
    data: string[];
}
export function History() {
    const [exercise, setExercise] = useState<ISectionListProps[]>([
        {
            title: "26.08.22",
            data: ["Puxada", "Remada", "Supino"]
        },
        {
            title: "27.08.22",
            data: ["Puxada", "Remada", "Supino"]
        }
    ]);
    return (
        <VStack flex={1}>
            <ScreenHeader title="Exercise History" />
            <SectionList
                px={8}
                sections={exercise}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({ section }) => (
                    <Heading
                    color="gray.200"
                    fontSize="md"
                    mt={10}
                    mb={3}
                    >{section.title}</Heading>
                )}
                contentContainerStyle={exercise.length === 0 && {
                    flex:1,
                    justifyContent: "center"
                }}
                ListEmptyComponent={()=>(
                    <EmptyList message="Empty list"/>
                )}
            />

        </VStack>
    );
}