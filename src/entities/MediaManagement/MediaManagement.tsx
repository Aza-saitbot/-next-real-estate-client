import React from 'react';
import s from './styles.module.scss';
import DraggableImageList from "@/shared/ui/DraggableImageList/DraggableImageList";
import {IImage} from "@/shared/api/apartments/model";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

type MediaManagementProps = {
    images: Array<IImage>
    onChangeStateOpen: () => void
}
const MediaManagement = ({images,onChangeStateOpen}: MediaManagementProps) => {

    const addImage = () => {
        console.log('addImage')
    }
    const onSubmit = () => {
        console.log('onSubmit')
        onChangeStateOpen()
    }
    return (
        <div className={s.mediaManagement}>
            <div className={s.header}>
                <div>
                    <Button  onClick={addImage} variant="contained">
                        <AddIcon className={s.addIcon}/>Добавить медиа
                    </Button>
                </div>
                <CloseIcon onClick={onChangeStateOpen} className={s.closeIcon}/>
            </div>
            <DraggableImageList images={images}/>
            <div className={s.footer}>
                <div>
                    <Button onClick={onSubmit} variant="contained">
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MediaManagement;