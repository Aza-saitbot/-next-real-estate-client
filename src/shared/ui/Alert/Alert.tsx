import React, { useEffect } from 'react';
import s from './alert.module.scss';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { alertsSelector, alertWithClosingSelector } from './alertSelectors';
import { removeAlert, setAlertWithClosing, AlertType, AlertWithClosingType } from './alertReducer';
import CloseIcon from '../../assets/cross-white.svg';


const Alert = () => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const alerts = useSelector(alertsSelector);
  const alertWithCustom = useSelector(alertWithClosingSelector);

  const getMessageText = (alert: AlertType | AlertWithClosingType) => {
    if (alert.payload) {
      if (typeof(alert.payload) === 'string') {
       // return t(alert.payload);
        return alert.payload
      }
     // return t(alert.payload.text)
      return alert.payload.text
    }
    return '';
  };

  const getMessageTitle = (alert: AlertWithClosingType) => {
    if (typeof(alert.payload) === 'object') {
     // return t(alert.payload.title);
      return alert.payload.title;
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
        <div className={ [s.description, getStyles(alert)].join(' ') } key={alert.identificator}>
          <p>{getMessageText(alert)}</p>
        </div>
      ))}
      {alertWithCustom &&
        <div className={s.alert} style={{ background: getStyles(alertWithCustom) }} >
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
