import React from 'react';
import {IImage} from "@/shared/api/apartments/model";
import s from './styles.module.scss';
import {Button} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CachedIcon from '@mui/icons-material/Cached';

const VISIBLE_IMAGES = 6
const style = {
    backgroundColor:'white'
}
interface IGallery {
    images?: Array<IImage>
}

const Gallery = ({images}: IGallery) => {
    if (!images) {
        return (
            <div className={s.gallery}>
                <div className={s.empty}>
                    <h3>В галерее нет изображений</h3>
                </div>
            </div>
        )
    }
    const isRemainingImages = images.length > VISIBLE_IMAGES
    const remainingImages = isRemainingImages ?  images.length - VISIBLE_IMAGES : 0

    return (
        <div className={s.gallery}>
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
                    <Button style={style} variant='outlined'><CachedIcon/> <span>Управлять медиа</span></Button>
                    <Button style={style} variant='outlined'><OpenInFullIcon/></Button>
                    <Button style={style} variant='outlined'><DeleteOutlineIcon/></Button>
                </div>
            </div>
        </div>
    );
};

export default Gallery;