import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export type AlertType = {
  identificator: string | number;
  payload?: string;
  color?: string;
};

type PayloadTitled = {
  title: string;
  text: string;
}

export type AlertWithClosingType = {
  payload?: string | PayloadTitled;
  color?: string;
};

export type AlertsModelType = {
  alerts: AlertType[];
  alertWithClosing: null | AlertWithClosingType
};

const initialState: AlertsModelType = {
  alerts: [],
  alertWithClosing: null
};

const generateId = () => nanoid();

const alertModel = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    removeAlert: (state, action: PayloadAction<AlertType>) => {
      const alertIndex = state.alerts.findIndex((alert) => alert.identificator === action.payload.identificator);
      if (alertIndex !== -1) {
        state.alerts.splice(alertIndex, 1);
      }
    },
    addAlertWithCustomText: (state, action: PayloadAction<{ message: string; color?: string }>) => {
      state.alerts.push({ payload: action.payload.message, color: action.payload.color, identificator: generateId() });
    },
    setAlertWithClosing: (state, action: PayloadAction<null|AlertWithClosingType>) => {
      state.alertWithClosing=action.payload
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(updateIntegration.rejected, (state, action) => {
  //       state.alerts.push({
  //         code: action.payload!,
  //         identificator: generateId(),
  //       });
  //     })
  //     .addCase(updateIntegration.fulfilled, (state) => {
  //       state.alerts.push({
  //         code: 100000,
  //         identificator: generateId(),
  //       });
  //     })
  // },
});

export const { removeAlert, addAlertWithCustomText, setAlertWithClosing } = alertModel.actions;

export const alertReducer = alertModel.reducer;
