import React, {useState} from "react";
import {Button} from "@mui/material";
import s from "./styles.module.scss";

type EditableCellProps = {
    id:number
    value: string;
    onSave: (id: number) => void;
}
export const EditableCell = ({ onSave,id,value }:EditableCellProps) => {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleButtonClick = () => {
        onSave(id);
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
