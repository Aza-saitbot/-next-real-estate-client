import React, {useState} from "react";
import {Button} from "@mui/material";
import s from "./styles.module.scss";

type EditableCellProps = {
    id:number
    value: string;
    handlerEditApartment: (id: number) => void;
}
export const EditableCell = ({ handlerEditApartment,id,value }:EditableCellProps) => {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleButtonClick = () => {
        handlerEditApartment(id);
    };

    return (
        <div
            className={s.content}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span>{value}</span>
            {isHovered && <Button variant='outlined' onClick={handleButtonClick}>Открыть</Button>}
        </div>
    );
};
