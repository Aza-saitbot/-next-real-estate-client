import React from 'react';
import style from './apartments-list.module.scss';
import {IApartment} from "@/shared/api/apartments/model";
import ApartmentCard from "@/entities/apartment/ui/apartment-card";

type ApartmentsListProps = {
    apartments: Array<IApartment>
}
const ApartmentsList = ({apartments}:ApartmentsListProps) => {
    const list = [...apartments,...apartments,...apartments,...apartments,...apartments,...apartments,...apartments]

    return (
        <div className={style.apartmentsList}>
            {list?.map(apartment =>
                <ApartmentCard key={apartment.id} {...apartment} />
            )}
        </div>
    );
};

export default ApartmentsList;