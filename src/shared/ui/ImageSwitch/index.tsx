import {useState} from 'react';
import Image from "next/image";
import style from './image-switch.module.scss';
import {IImage} from "@/shared/api/apartments/model";
import EmptyImage from '../../../../public/assets/not_image.jpeg';


interface IImageSwitcher {
    images?: IImage[]
}

const ImageSwitcher = ({images}: IImageSwitcher) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!images) {
        return  <div className={style.imageSwitch}>
            <Image width={300} height={300} src={EmptyImage} alt='not image'/>
        </div>
    }

    const handleNext = () => {
        setActiveIndex((activeIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((activeIndex + images.length - 1) % images.length);
    };
    const srcImage = process.env.NEXT_PUBLIC_API_URL + images[activeIndex].filename;

    return (
        <div className={style.imageSwitch}>
            <div>
                <button onClick={handlePrev}>Previous</button>
            </div>
            <img width={300} height={300} src={srcImage} alt={`Image ${activeIndex + 1}`}/>
            <div>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default ImageSwitcher;
