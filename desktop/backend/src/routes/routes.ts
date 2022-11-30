import { RouteFormater } from "../helper/routeHelper/HelperR";
import { AccessRoute } from "./access/AccessRoute";
import { ConditionRoute } from "./condition/ConditionRoute";
import { DeviceRoute } from "./device/DeviceRoute";
import { UserRoute } from "./user/UserRoute";

export const Routes = RouteFormater("/api", [
  UserRoute,
  ConditionRoute,
  AccessRoute,
  DeviceRoute,
]);
