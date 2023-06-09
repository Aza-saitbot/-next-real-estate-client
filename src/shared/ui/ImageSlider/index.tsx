import {useState} from 'react';
import Image from "next/image";
import style from './image-switch.module.scss';
import {IImage} from "@/shared/api/apartments/model";
import EmptyImage from '../../../../public/assets/not_image.jpeg';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


interface IImageSwitcher {
    images: IImage[]
}

const ImageSlider = ({images}: IImageSwitcher) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (images.length === 0) {
        return <div className={style.imageSwitch}>
            <Image height={300} width={300} className={style.apartmentImage} src={EmptyImage} alt='not image'/>
        </div>
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const srcImage = process.env.NEXT_PUBLIC_API_URL + images[currentIndex]?.filename;
    return (
        <div className={style.imageSwitch}>
            {currentIndex > 0 &&
                <div className={style.prev} onClick={handlePrev}><ArrowBackIosNewIcon/></div>
            }
            <img className={style.apartmentImage} src={srcImage} alt={`Image ${currentIndex + 1}`}/>
            {currentIndex < images.length - 1 &&
                <div className={style.next} onClick={handleNext}><ArrowForwardIosIcon/></div>
            }
        </div>
    );
};

export default ImageSlider;
