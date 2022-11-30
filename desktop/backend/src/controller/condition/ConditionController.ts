import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Access } from "../../entity/Access";
import { Condition } from "../../entity/Condition";
import { Devices } from "../../entity/Devices";
import { ErrHand } from "../../helper/controllerHelper/ErrHand";
import { CheckBody } from "../../helper/controllerHelper/Validity";

export class ConditionController {
  private deviceRepository = getRepository(Devices);
  private conditionRepository = getRepository(Condition);

  async createcondition(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let body = request.body;
    if (
      CheckBody(
        body,
        ["temperature", "humidity", "intensity", "device_id"],
        ["number", "number", "number", "number"]
      )
    ) {
      let devicecheck = await this.deviceRepository.findOne({
        where: {
          id: body.device_id,
        },
      });
      let conditioncheck = await this.conditionRepository.findOne({
        where: {
          device_id: body.device_id,
        },
      });
      if (conditioncheck !== undefined) {
        return ErrHand(
          "Condition Already exist Use Update API",
          402,
          response,
          2
        );
      } else {
        if (devicecheck !== undefined) {
          let databuf = body;
          databuf.temperature.toFixed(2);
          databuf.humidity.toFixed(2);
          try {
            await this.conditionRepository.save(databuf);
          } catch (error) {
            return ErrHand(error, 406, response, 4);
          }
        } else {
          return ErrHand("Didnt found device", 402, response, 2);
        }
      }
    } else {
      return ErrHand("Not Accepted", 406, response, 1);
    }
  }

  async updatecondition(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let body = request.body;
    if (CheckBody(body, ["device_id"], ["number"])) {
      try {
        let cari = await this.conditionRepository.findOne({
          where: [
            {
              device_id: body.device_id,
            },
          ],
        });
        if (cari) {
          cari = { ...cari, ...body };
          try {
            await this.conditionRepository.save(cari);
            return {
              msg: cari.devices + " update success",
            };
          } catch (error) {
            return ErrHand(error, 406, response, 2);
          }
        } else {
          return ErrHand("Device Code Not Registered", 402, response, 2);
        }
      } catch (error) {
        return ErrHand("Error", 406, response, 2);
      }
    } else {
      return ErrHand("Not Accepted", 406, response, 1);
    }
  }
}
