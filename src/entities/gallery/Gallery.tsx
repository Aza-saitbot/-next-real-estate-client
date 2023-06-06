import React, {useEffect, useState} from 'react';
import {IImage} from "@/shared/api/apartments/model";
import s from './styles.module.scss';
import {Button, Tooltip} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CachedIcon from '@mui/icons-material/Cached';
import ModalStyled from "@/shared/ui/ModalStyled/ModalStyled";
import {useFormContext} from "react-hook-form";
import MediaManagement from "@/entities/MediaManagement/MediaManagement";


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

    const list = [...images,...images,...images,...images,...images].map(i=> ({...i,id: Math.floor(Math.random() * i.id)}))


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
               <MediaManagement onChangeStateOpen={onChangeStateOpen} images={list} />
            </ModalStyled>
        </div>
    );
};

export default Gallery;