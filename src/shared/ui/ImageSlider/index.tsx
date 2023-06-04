import {useState} from 'react';
import Image from "next/image";
import style from './image-switch.module.scss';
import {IImage} from "@/shared/api/apartments/model";
import EmptyImage from '../../../../public/assets/not_image.jpeg';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


interface IImageSwitcher {
    images?: IImage[]
}

const ImageSlider = ({images}: IImageSwitcher) => {

    if (!images) {
        return <div className={style.imageSwitch}>
            <Image src={EmptyImage} alt='not image'/>
        </div>
    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleIndicatorsCount = Math.min(images.length, 5);
    const visibleIndicators = images.slice(0, visibleIndicatorsCount);

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
            <div className={style.carouselIndicators}>
                {visibleIndicators.map((_,indicatorIndex) => (
                    <div key={indicatorIndex}
                         className={`${style.indicator} ${currentIndex === indicatorIndex  ? style.active : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
