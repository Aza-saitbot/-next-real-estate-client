import { TFunction } from 'react-i18next';
import { AlertTextWithLinkType, AlertType, AlertWithClosingType } from '../alertSlice';


export const getStylesForAlert = (alert: AlertType | AlertWithClosingType |  AlertTextWithLinkType) => {
  if (alert.code) {
    return alert.code < 100000 ? '#F54242' : '#2CBA5F';
  }
  if (alert.color) {
    return alert.color;
  }
  return '#2CBA5F';
};

export const getMessageTextForAlert = (alert: AlertType | AlertWithClosingType,t: TFunction<"translation">) => {
  if (alert.code) {
    return t(`errors.${alert.code}`);
  }
  if (alert.payload) {
    if (typeof(alert.payload) === 'string') {
      return t(alert.payload);
    }
    return t(alert.payload.text)
  }
  return '';
};

export const getMessageTitleForAlert = (alert: AlertWithClosingType,t: TFunction<"translation">) => {
  if (typeof(alert.payload) === 'object') {
    return t(alert.payload.title);
  }
  return null;
};
