
import {ApartmentModelType} from "@/entities/apartment/model/apartmentReducer";
import {UserModelType} from "@/entities/user/model/userReducer";
import {AlertsModelType} from "@/shared/ui/Alert/alertReducer";

export type RootState = {
    user: UserModelType
    apartment:ApartmentModelType
    alerts:AlertsModelType

}