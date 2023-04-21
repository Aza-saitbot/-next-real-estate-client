
import {ApartmentModelType} from "@/entities/apartment/model/apartmentReducer";
import {UserModelType} from "@/entities/user/model/userReducer";

export type RootState = {
  //  user: UserModelType
    apartment:ApartmentModelType
}