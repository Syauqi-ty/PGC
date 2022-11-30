import { DeviceController } from "../../controller/device/DeviceController";

export const DeviceRoute = {
  px: "/device",
  route: [
    {
      method: "post",
      route: "/create",
      controller: DeviceController,
      action: "create",
    },
    {
      method: "post",
      route: "/subgenre/create",
      controller: DeviceController,
      action: "createsubgen",
    },
    {
      method: "get",
      route: "/list/:id",
      controller: DeviceController,
      action: "finddevicebyuserid",
    },
    {
      method: "get",
      route: "/info/:id",
      controller: DeviceController,
      action: "finddevicebyid",
    },
    {
      method: "put",
      route: "/edit",
      controller: DeviceController,
      action: "editdevice",
    },
    {
      method: "delete",
      route: "/delete",
      controller: DeviceController,
      action: "delete",
    },
  ],
};
