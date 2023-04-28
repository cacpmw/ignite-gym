import { IInputProps, Input as NativeBaseInput, FormControl } from "native-base";

interface IInputComponentPros extends IInputProps {
    errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: IInputComponentPros) {
    const isInvalidInput = !!errorMessage || isInvalid
    return (

        <FormControl isInvalid={isInvalidInput} mb={4}>

            <NativeBaseInput
                bg="gray.700"
                h={14}
                px={4}
                borderWidth={0}
                fontSize="md"
                color="white"
                fontFamily="body"
                isInvalid={isInvalidInput}
                keyboardAppearance="dark"
                placeholderTextColor="gray.300"
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500"
                }}
                _focus={{
                    bg: "gray.700",
                    borderWidth: 1,
                    borderColor: "green.500"
                }}
                {...rest}
            />
            <FormControl.ErrorMessage _text={{ color:"red.500"}}>
            {errorMessage}
        </FormControl.ErrorMessage>
        </FormControl >
    )

}