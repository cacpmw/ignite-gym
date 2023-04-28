import { Center, Heading, ICenterProps } from "native-base";


interface IScreenHeaderComponentProps extends ICenterProps {
    title: string;
}

export function ScreenHeader({ title, ...rest }: IScreenHeaderComponentProps) {
    return (
        <Center
            bg="gray.600"
            pb={6}
            pt={16}
            {...rest}
        >
            <Heading
                color="gray.100"
                fontSize="xl"
                fontFamily="heading"
            >{title}</Heading>
        </Center>
    );
}