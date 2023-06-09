import React from 'react';
import s from './../styles.module.scss';
import Image from "next/image";
import EmptyImage from "../../../../public/assets/empty.png";
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


type ButtonWrapperProps = {
    handlerOpenModal: () => void
}
const EmptyListMedia = ({handlerOpenModal}:ButtonWrapperProps) => {
    return (
        <>
            <div className={s.emptyWrapper}>
                <div className={s.empty}>
                    <div className={s.wrapperImage}>
                        <Image height={120} width={120} src={EmptyImage}/>
                    </div>
                    <div className={s.emptyText}>
                        <div>Добавьте медиафайлы</div>
                        <div>Загрузите в галерею фото</div>
                        <Button  onClick={handlerOpenModal} variant="contained">
                            <AddIcon className={s.addIcon}/>Добавить медиа
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmptyListMedia;