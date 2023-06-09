import React, {useEffect, useState} from 'react';
import s from './styles.module.scss';
import {IImage} from "@/shared/api/apartments/model";
import {Button, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import OpenWithIcon from "@mui/icons-material/OpenWith";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DraggableImageList from "@/entities/DraggableImageList/DraggableImageList";
import DragBar from "@/shared/ui/DragBar/DragBar";

type DraggableImageListProps = {
    images: Array<IImage>
    handlerCloseModal: () => void
}
const MediaManagement = ({images, handlerCloseModal}: DraggableImageListProps) => {
    const [modeManagement, setModeManagement] = useState<'list' | 'add'>('list')
    const isModeList = modeManagement === 'list'

    const onHandlerAddMedia = () => {
        setModeManagement('add')
    }

    const onSubmit = () => {
        handlerCloseModal()
    }

    const onHandlerButtonClose = () => {
        if (modeManagement === 'add') {
            setModeManagement('list')
        } else {
            handlerCloseModal()
        }
    }

    useEffect(()=>{
        if (images.length === 0) {
            setModeManagement('add')
        }
    },[images])

    return (
        <div className={s.mediaManagement}>
            <div className={s.header}>
                <div>
                    {isModeList
                        ? <div className={s.headerButton}>
                            <Button  onClick={onHandlerAddMedia} variant="contained">
                                <AddIcon className={s.addIcon}/>Добавить медиа
                            </Button>
                        </div>
                        : <div className={s.headerTitle}>
                            <h3 >Загрузите файлы</h3>
                        </div>
                    }
                </div>
                <CloseIcon onClick={onHandlerButtonClose} className={s.closeIcon}/>
            </div>
            <div className={s.wrapper}>
                {isModeList
                    ? <DraggableImageList onHandlerAddMedia={onHandlerAddMedia} handlerCloseModal={handlerCloseModal}
                                          images={images}/>
                    : <DragBar/>
                }
            </div>
            <div className={s.footer}>
                <div>
                    <Button onClick={onSubmit} variant="contained">
                        {isModeList ? 'Сохранить' : 'Добавить'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MediaManagement;