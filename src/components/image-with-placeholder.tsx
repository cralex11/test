import Image from "next/image";
import personPlaceholderImg from "../assets/person-placeholder.png"
import * as React from "react";


interface ImageWithPlaceholderProps extends Pick<React.HTMLAttributes<HTMLDivElement>, "className"> {
    src?: string
}

export const ImageWithPlaceholder = ({src, className}: ImageWithPlaceholderProps) => {
    if (src) {
        return <img src={src} alt={"app logo"}
                    className={className}/>
    }

    return (<Image src={personPlaceholderImg} alt={"placeholder"}
                   className={className}/>)

};
