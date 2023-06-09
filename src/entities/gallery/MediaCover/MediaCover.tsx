import React from 'react';
import s from './styles.module.scss';
import {Button} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import {ButtonWrapper} from "@/shared/ui/ButtonWrapper/ButtonWrapper";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useFormContext} from "react-hook-form";

const VISIBLE_IMAGES = 6

type MediaCoverProps = {
    handlerCloseModal:()=> void
}
const MediaCover = ({handlerCloseModal}:MediaCoverProps) => {
    const {getValues,setValue} = useFormContext()
    const images: Array<string> = getValues('fileNames')
    const isRemainingImages = images.length > VISIBLE_IMAGES
    const remainingImages = isRemainingImages ? images.length - VISIBLE_IMAGES : 0

    const clearImages = () => {
        setValue('fileNames', [])
    }


    return (
        <>
            <div className={s.list}>
                {images.map(image =>
                    <div key={image}>
                        <img className={s.item} width={200} height={120}
                             src={process.env.NEXT_PUBLIC_API_URL + image}
                             alt={`Image ${image}`}
                        />
                    </div>
                )}
                {isRemainingImages && <div className={s.remainingImages}><h3>+{remainingImages}</h3></div>}
            </div>
            <div className={s.actions}>
                <div className={s.buttons}>
                    <Button onClick={handlerCloseModal}  variant='outlined'><CachedIcon/> <span>Управлять медиа</span></Button>
                    <ButtonWrapper titleTooltip='Превью' onClick={handlerCloseModal} >
                        <OpenInFullIcon/>
                    </ButtonWrapper>
                    <ButtonWrapper titleTooltip='Очистить' onClick={clearImages}>
                        <DeleteOutlineIcon/>
                    </ButtonWrapper>
                </div>
            </div>
        </>
    );
};

export default MediaCover;