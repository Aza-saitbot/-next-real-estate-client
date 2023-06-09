import React, {useState} from 'react';
import s from './style.module.scss';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useFormContext} from "react-hook-form";
import {IImage} from "@/shared/api/apartments/model";
import {useAppDispatch} from "@/app/store/store";
import {previewImages} from "@/entities/apartment/model";

const DragBar = () => {
    const {setValue} = useFormContext()
    const dispatch = useAppDispatch()
    const [drag, setDrag] = useState(false)
    const [currentFiles, setCurrentFiles] = useState<Array<File>>([])

    // const onSubmit = () => {
    //     const formData = new FormData()
    //     currentFiles.forEach((item) => formData.append("files", item))
    //
    //     console.log(formData.getAll("files"))
    //
    // }

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(true)
    };

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(false)
    };

    const setFiles = (files: File[]) => {
        setCurrentFiles(files)
        setValue('images', files)
    }

    const onDropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        // @ts-ignore
        let files = [...e.dataTransfer.files]
        const formData = new FormData()
        formData.append("images", JSON.stringify(files))
        const images = await dispatch(previewImages(formData))

        console.log('images',images)

        setFiles(files)
        setDrag(false)

    };

console.log('drag',drag)
    return (
        <div className={s.dragBar}>
            <div className={s.item}>
                <div className={s.search}>
                    <div className={s.dropzone}>
                        {drag
                            ? <div
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                                onDrop={e => onDropHandler(e)}
                                className={s.area}><p>Отпустите файлы, что бы загрузить их</p></div>
                            : <div
                                onDragStart={e => dragStartHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragOver={e => dragStartHandler(e)}
                                className={s.move}>
                                <div>
                                    {currentFiles.length === 0 &&
                                        <div className={s.moveTitle}>Перетащите файлы, чтобы загрузить их</div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DragBar;