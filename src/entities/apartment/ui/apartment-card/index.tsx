import React, {useEffect, useRef, useState} from 'react';
import {IApartment} from "@/shared/api/models";
import style from './apartment-card.module.scss';
import Image from "next/image";
import ImageSlider from "@/shared/ui/ImageSlider";
import useResizeObserver from "@/shared/hooks/useResizeObserver";

const ApartmentCard = ({title,price,images,address}:IApartment) => {
    return (
        <div className={style.apartmentCard}>
            <ImageSlider images={images}/>
            <div>
                title: {title}
            </div>
            <div>
                Стоимость: {price}
            </div>
            <div>
                Адрес: {address}
            </div>
        </div>
    );
};

export default ApartmentCard;