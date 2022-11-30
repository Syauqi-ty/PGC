import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Access } from "../../entity/Access";
import { Devices } from "../../entity/Devices";
import { Users } from "../../entity/Users";
import { ErrHand } from "../../helper/controllerHelper/ErrHand";
import { CheckBody } from "../../helper/controllerHelper/Validity";

export class AccessController {
  private userRepository = getRepository(Users);
  private deviceRepository = getRepository(Devices);
  private accessRepository = getRepository(Access);

  async createaccess(request: Request, response: Response, next: NextFunction) {
    let body = request.body;
    if (CheckBody(body, ["username", "code_device"], ["number", "string"])) {
      let usercheck = await this.userRepository.findOne({
        where: {
          username: body.username,
        },
      });
      let devicecheck = await this.deviceRepository.findOne({
        where: {
          code_device: body.code_device,
        },
      });
      if (usercheck !== undefined && devicecheck !== undefined) {
        let send = new Access();
        send.device_id = devicecheck.id;
        send.user_id = usercheck.id;
        try {
          await this.accessRepository.save(send);
        } catch (error) {
          return ErrHand(error, 406, response, 4);
        }
      } else {
        return ErrHand("Didnt found user", 402, response, 2);
      }
    } else {
      return ErrHand("Not Accepted", 406, response, 1);
    }
  }
  async deleteaccess(request: Request, response: Response, next: NextFunction) {
    let body = request.body;
    if (CheckBody(body, ["username", "code_device"], ["number", "string"])) {
      let usercheck = await this.userRepository.findOne({
        where: {
          username: body.username,
        },
      });
      let devicecheck = await this.deviceRepository.findOne({
        where: {
          code_device: body.code_device,
        },
      });
      if (usercheck !== undefined && devicecheck !== undefined) {
        let deletedaccess = await this.accessRepository.findOne({
          where: [
            {
              device_id: devicecheck.id,
            },
            {
              user_id: usercheck.id,
            },
          ],
        });

        try {
          await this.accessRepository.remove(deletedaccess);
        } catch (error) {
          return ErrHand(error, 406, response, 4);
        }
      } else {
        return ErrHand("Didnt found user", 402, response, 2);
      }
    } else {
      return ErrHand("Not Accepted", 406, response, 1);
    }
  }
}
