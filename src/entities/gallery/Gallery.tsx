import React, {useEffect, useState} from 'react';
import {IImage} from "@/shared/api/apartments/model";
import s from './styles.module.scss';
import {Button, Tooltip} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CachedIcon from '@mui/icons-material/Cached';
import ModalStyled from "@/shared/ui/ModalStyled/ModalStyled";
import {useFormContext} from "react-hook-form";
import {ButtonWrapper} from "@/shared/ui/ButtonWrapper/ButtonWrapper";
import DraggableImageList from "@/entities/DraggableImageList/DraggableImageList";
import DragBar from "@/shared/ui/DragBar/DragBar";
import MediaManagement from "@/entities/MediaManagment/MediaManagement";
import EmptyImage from "../../../public/assets/empty.png"
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import EmptyListMedia from "@/entities/gallery/EmptyListMedia/EmptyListMedia";
import MediaCover from "@/entities/gallery/MediaCover/MediaCover";

interface IGallery {
    onHandlerClearImages: () => void
}

const Gallery = ({onHandlerClearImages}: IGallery) => {
    const {getValues} = useFormContext()
    const images: Array<IImage> = getValues('images')
    const [listImages, setListImages] = useState<Array<IImage>>(images)
    const [open, setOpen] = React.useState(false);



    const isEmptyListMedia = listImages.length === 0

    const handlerCloseModal = () => setOpen(false);

    const handlerOpenModal = () => {
      setOpen(true)
    }

    const clearImages = () => {
        onHandlerClearImages()
        setListImages([])
    }

    return (
        <div className={s.gallery}>
            {isEmptyListMedia
            ? <EmptyListMedia handlerOpenModal={handlerOpenModal}/>
            : <MediaCover images={images} handlerCloseModal={handlerOpenModal} clearImages={clearImages}/>
            }
            <ModalStyled onChangeStateOpen={handlerCloseModal} open={open}>
                <MediaManagement images={images} handlerCloseModal={handlerCloseModal}/>
            </ModalStyled>
        </div>
    );
};

export default Gallery;