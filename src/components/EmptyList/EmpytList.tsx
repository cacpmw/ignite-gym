import {  Text } from "native-base";

interface EmptyListProps {
    message: string;
}
export function EmptyList({ message }: EmptyListProps) {

    return (

            <Text color="gray.100" textAlign="center">{message}</Text>

    )
}