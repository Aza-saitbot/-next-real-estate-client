import React, {useEffect, useState} from 'react';
import {IImage} from "@/shared/api/apartments/model";
import s from './styles.module.scss';
import {Button, Tooltip} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CachedIcon from '@mui/icons-material/Cached';
import ModalStyled from "@/shared/ui/ModalStyled/ModalStyled";
import {useFormContext} from "react-hook-form";


const VISIBLE_IMAGES = 6
const style = {
    backgroundColor:'white'
}

interface IGallery {
    onHandlerClearImages: () => void
}

const Gallery = ({onHandlerClearImages}: IGallery) => {
    const {getValues} = useFormContext()
    const images:Array<IImage> = getValues('images')
    const [listImages,setListImages]=useState<Array<IImage>>(images)
    const [open, setOpen] = React.useState(false);

    const isRemainingImages = images.length > VISIBLE_IMAGES
    const remainingImages = isRemainingImages ?  images.length - VISIBLE_IMAGES : 0

    const onChangeStateOpen = () => setOpen(!open);

    const clearImages = () => {
        onHandlerClearImages()
        setListImages([])
    }

    console.log('GALLERY',images)
    if (listImages.length === 0) {
        return (
            <div className={s.gallery}>
                <div className={s.empty}>
                    <h3>В галерее нет изображений</h3>
                </div>
            </div>
        )
    }


    return (
        <div className={s.gallery}>
            <div className={s.list}>
                {listImages.map(image =>
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
                    <Button onClick={onChangeStateOpen} style={style} variant='outlined'><CachedIcon/> <span>Управлять медиа</span></Button>
                    <Tooltip placement="top" title="Превью">
                    <Button onClick={onChangeStateOpen} style={style}
                            variant='outlined'>
                        <OpenInFullIcon/>
                    </Button>
                    </Tooltip>
                    <Tooltip placement="top" title="Очистить">
                        <Button onClick={clearImages} style={style}
                                variant='outlined'>
                            <DeleteOutlineIcon/>
                        </Button>
                    </Tooltip>
                    </div>
            </div>
            <ModalStyled onChangeStateOpen={onChangeStateOpen} open={open}>
                Note that while using aria-labelledby is similar in this situation to using an HTML
                element with the for attribute, there are some very important differences.
                The aria-labelledby attribute only defines the accessible name. It doesn't provide any of
                s other functionality, such as making clicking on the labeling element activate the input it is associ
                ated with. That has to be added back in with JavaScript.
            </ModalStyled>
        </div>
    );
};

export default Gallery;