import React from 'react';
import s from './styles.module.scss';
import {Button} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import {ButtonWrapper} from "@/shared/ui/ButtonWrapper/ButtonWrapper";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {IImage} from "@/shared/api/apartments/model";

const VISIBLE_IMAGES = 6

type MediaCoverProps = {
    handlerCloseModal:()=> void
    clearImages:()=> void
    images:Array<IImage>
}
const MediaCover = ({handlerCloseModal,clearImages,images}:MediaCoverProps) => {
    const isRemainingImages = images.length > VISIBLE_IMAGES
    const remainingImages = isRemainingImages ? images.length - VISIBLE_IMAGES : 0
    return (
        <>
            <div className={s.list}>
                {images.map(image =>
                    <div key={image.id}>
                        <img className={s.item} width={200} height={120}
                             src={process.env.NEXT_PUBLIC_API_URL + image.filename}
                             alt={`Image ${image.id}`}
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