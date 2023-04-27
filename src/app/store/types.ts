import {UserModelType} from "@/entities/user/model/userReducer";
import {AlertsModelType} from "@/shared/ui/Alert/alertReducer";

export type RootState = {
    user: UserModelType
    alerts:AlertsModelType

}