import {RootState} from "@/app/store/types";

export const alertsSelector = (state: RootState) => state.alerts.alerts;
export const alertWithClosingSelector = (state: RootState) => state.alerts.alertWithClosing;
