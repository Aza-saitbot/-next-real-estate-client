import React, {useEffect} from 'react';
import s from './alert.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {alertsSelector, alertWithClosingSelector} from './alertSelectors';
import {removeAlert, setAlertWithClosing, AlertType, AlertWithClosingType} from './alertReducer';
import CloseIcon from '../../assets/cross-white.svg';
import {useTranslation} from "next-i18next";


const Alert = () => {
    const dispatch = useDispatch();
    const alerts = useSelector(alertsSelector);
    const alertWithCustom = useSelector(alertWithClosingSelector);
    const {t} = useTranslation();

    const getMessageText = (alert: AlertType | AlertWithClosingType) => {
        if (alert.code) {
            return t(`errors.${alert.code}`);
        }
        if (alert.payload) {
            if (typeof (alert.payload) === 'string') {
                return t(alert.payload);
            }
            return t(alert.payload.text)
        }
        return 'Неизвестная ошибка';
    };

    const getMessageTitle = (alert: AlertWithClosingType) => {
        if (typeof (alert.payload) === 'object') {
            return t(alert.payload.title);
        }
        return null;
    };

    useEffect(() => {
        if (alerts.length > 0) {
            setTimeout(() => {
                dispatch(removeAlert(alerts[alerts.length - 1]));
            }, 3000);
        }
    }, [alerts]);

    const getStyles = (alert: AlertType | AlertWithClosingType) => {
        if (alert.code) {
            return alert.code < 100000 ? s.error : s.success;
        }
        if (alert.color && alert.color === 'error') {
            return s.error
        }
        return s.success
    };

    const onHandlerClosedAlert = () => {
        dispatch(setAlertWithClosing(null))
    };

    return (
        <div className={s.alertContainer}>
            {alerts.map((alert) => (
                <div className={[s.description, getStyles(alert)].join(' ')} key={alert.identificator}>
                    <p>{getMessageText(alert)}</p>
                </div>
            ))}
            {alertWithCustom &&
                <div className={s.alert} style={{background: getStyles(alertWithCustom)}}>
                    {getMessageTitle(alertWithCustom)
                        ? (
                            <div className={s.titled}>
                                <h4>{getMessageTitle(alertWithCustom)}</h4>
                                <p>{getMessageText(alertWithCustom)}</p>
                            </div>
                        ) : (
                            <p>{getMessageText(alertWithCustom)}</p>
                        )
                    }
                    <div className={s.closeIcon} onClick={onHandlerClosedAlert}>
                        <CloseIcon/>
                    </div>
                </div>
            }
        </div>
    );
};

export default Alert;
