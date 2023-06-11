import React, {useState} from 'react';
import s from './styles.module.scss';
import ModalStyled from "@/shared/ui/ModalStyled/ModalStyled";
import {useFormContext} from "react-hook-form";
import MediaManagement from "@/entities/MediaManagment/MediaManagement";
import EmptyListMedia from "@/entities/gallery/EmptyListMedia/EmptyListMedia";
import MediaCover from "@/entities/gallery/MediaCover/MediaCover";


const Gallery = () => {
    const {getValues} = useFormContext()
    const images: Array<string> = getValues('fileNames')
    const [open, setOpen] = React.useState(false);

    const handlerCloseModal = () => setOpen(false);

    const handlerOpenModal = () => {
      setOpen(true)
    }

    return (
        <div className={s.gallery}>
            {images.length === 0
            ? <EmptyListMedia handlerOpenModal={handlerOpenModal}/>
            : <MediaCover handlerCloseModal={handlerOpenModal} />
            }
            <ModalStyled onChangeStateOpen={handlerCloseModal} open={open}>
                <MediaManagement handlerCloseModal={handlerCloseModal}/>
            </ModalStyled>
        </div>
    );
};

export default Gallery;