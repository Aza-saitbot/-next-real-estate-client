import React from 'react';
import s from './style.module.scss';


interface IEmptyList {
    text?: string
}
const EmptyList = ({text='Пусто'}:IEmptyList) => {
    return (
        <div className={s.emptyList}>
            <h3>{text}</h3>
        </div>
    );
};

export default EmptyList;