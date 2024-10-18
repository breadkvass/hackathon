import { FC } from "react";

type BadgeIconProps = {
    style?: string;
}

const BadgeIcon: FC<BadgeIconProps> = ({style}) => {
    return (
        <svg className={style} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" fill="#FF003F"/>
        </svg>
    )   
}

export default BadgeIcon;