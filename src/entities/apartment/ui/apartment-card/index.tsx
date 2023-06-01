import React, {useState} from 'react';
import {IApartment} from "@/shared/api/models";
import style from './apartment-card.module.scss';
import Image from "next/image";
import ImageSwitcher from "@/shared/ui/ImageSwitch";

const ApartmentCard = ({title,price,images,address}:IApartment) => {

    return (
        <div className={style.apartmentCard}>
            <div>
               <ImageSwitcher images={images}/>
            </div>
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