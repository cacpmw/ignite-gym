
import { Image, IImageProps } from "native-base";

interface UserPhotoComponentProps extends IImageProps {
    size: number;
}
export function UserPhoto({ size , ...rest}: UserPhotoComponentProps) {
    return (
        <Image
            w={size}
            h={size}
            rounded="full"
            borderWidth={2}
            borderColor="gray.400"
            {...rest}
        />
    );
}