import { IButtonProps, Button as NativeBaseButton, Text } from "native-base";

interface ButtonComponentProps extends IButtonProps {
    text: string;
    variant?: "solid"|"outline"
}
export function Button({ text = "",variant="solid", ...rest }: ButtonComponentProps) {
    return (
        <NativeBaseButton
            bg={variant==="outline" ? "transparent" :"green.700"}
            w="full"
            h={14}
            borderWidth={variant==="outline" ? 1:0}
            borderColor="green.500"
            rounded="sm"
            _pressed={{
                bg: variant === "outline" ? "gray.500": "green.500"
            }}
            {...rest}
        >
            <Text
                color={variant === "outline" ? "green.500":"white"}
                fontFamily="heading"
                fontSize="sm"
            >

                {text}
            </Text>
        </NativeBaseButton>
    );
}