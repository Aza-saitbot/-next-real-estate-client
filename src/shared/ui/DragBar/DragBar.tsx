import React, {useState} from 'react';
import s from './style.module.scss';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useFormContext} from "react-hook-form";
import {IImage} from "@/shared/api/apartments/model";


interface IDragBar {
    images: IImage[]
}

const DragBar = ({images}: IDragBar) => {
    const {setValue} = useFormContext()
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

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        // @ts-ignore
        let files = [...e.dataTransfer.files]

        setFiles(files)
        setDrag(false)
    };

    const removeImage = (removeFile: File) => {
        setFiles(currentFiles.filter((f: File) => f !== removeFile))
    }


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
                                    <div className={s.preview}>
                                        {currentFiles.map((i, index) => {
                                            let imgUrl = URL.createObjectURL(i)
                                            return (
                                                <div key={index} className={s.previewItem}>
                                                    <div className={s.previewItemImg}>
                                                        <img src={imgUrl} alt='image'/>
                                                        <DeleteOutlineOutlinedIcon onClick={() => removeImage(i)}
                                                            fontSize={"small"} className={s.previewItemImgIcon}/>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
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