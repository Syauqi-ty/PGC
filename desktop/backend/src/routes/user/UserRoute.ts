import { UserController } from "../../controller/user/UserController";

export const UserRoute = {
  px: "/user",
  route: [
    {
      method: "post",
      route: "/register",
      controller: UserController,
      action: "register",
    },
    {
      method: "post",
      route: "/login",
      controller: UserController,
      action: "login",
    },
    {
      method: "get",
      route: "/find/:id",
      controller: UserController,
      action: "finduserbyid",
    },
    {
      method: "get",
      route: "/find",
      controller: UserController,
      action: "findall",
    },
    {
      method: "put",
      route: "/edit",
      controller: UserController,
      action: "edituser",
    },
    {
      method: "delete",
      route: "/delete",
      controller: UserController,
      action: "delete",
    },
  ],
};
