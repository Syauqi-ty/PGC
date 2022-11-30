import { AccessController } from "../../controller/access/AccessController";

export const AccessRoute = {
  px: "/access",
  route: [
    {
      method: "post",
      route: "/create",
      controller: AccessController,
      action: "createaccess",
    },
    {
      method: "delete",
      route: "/delete",
      controller: AccessController,
      action: "deleteaccess",
    },
  ],
};
