import { ConditionController } from "../../controller/condition/ConditionController";

export const ConditionRoute = {
  px: "/condition",
  route: [
    {
      method: "post",
      route: "/create",
      controller: ConditionController,
      action: "createcondition",
    },
    {
      method: "put",
      route: "/edit",
      controller: ConditionController,
      action: "updatecondition",
    },
  ],
};
