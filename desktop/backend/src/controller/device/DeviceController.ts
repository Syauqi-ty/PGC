import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Access } from "../../entity/Access";
import { Devices } from "../../entity/Devices";
import { EmailVal } from "../../helper/authHelper/EmailChecker";
import { Hasher, Verifier } from "../../helper/authHelper/HashHelp";
import { ErrHand } from "../../helper/controllerHelper/ErrHand";
import { CheckBody } from "../../helper/controllerHelper/Validity";

export class DeviceController {
  private deviceRepository = getRepository(Devices);
  private accesRepository = getRepository(Access);

  async create(request: Request, response: Response, next: NextFunction) {
    let body = request.body;
    if (CheckBody(body, ["code_device", "alamat"], ["string", "string"])) {
      let existCheck = await this.deviceRepository.findOne({
        where: [
          {
            code_device: body.code_device,
          },
        ],
      });
      if (existCheck !== undefined) {
        return ErrHand("Already Exist", 402, response, 2);
      } else {
        let databuf = body;
        await this.deviceRepository.save(databuf);
        return {
          msg: "Created" + databuf.code_device,
          codehandler: 0,
        };
      }
    } else {
      return ErrHand("Not Accepted", 406, response, 1);
    }
  }

  async finddevicebyuserid(request: Request, response: Response) {
    let id = request.params["id"];
    var arraydevice = [];
    let data = {};
    let existCheck = await this.accesRepository.find({
      where: [{ user_id: id }],
    });
    if (existCheck !== undefined) {
      if (existCheck.length === 1) {
        return {
          data: await this.deviceRepository.findOne({
            where: { id: existCheck[0].device_id },
          }),
        };
      } else if (existCheck.length > 1) {
        await Promise.all(
          existCheck.map(async (element) => {
            data = await this.deviceRepository.findOne({
              where: { id: element.device_id },
            });
            arraydevice.push(data);
          })
        );
        return {
          data: arraydevice,
        };
      } else if (existCheck.length === 0) {
        return {
          msg: "Didnt have access",
        };
      }
    }
  }
  async finddevicebyid(request: Request, response: Response) {
    let id = request.params["id"];
    let existCheck = await this.deviceRepository.findOne({
      where: [{ id: id }],
    });
    if (existCheck !== undefined) {
      return {
        data: existCheck,
      };
    } else {
      return ErrHand("Device Code Not Registered", 402, response, 2);
    }
  }

  async editdevice(request: Request, response: Response, next: NextFunction) {
    let body = request.body;
    if (CheckBody(body, ["code_device"], ["string"])) {
      try {
        let cari = await this.deviceRepository.findOne({
          where: [
            {
              code_device: body.code_device,
            },
          ],
        });
        if (cari) {
          cari = { ...cari, ...body };
          try {
            await this.deviceRepository.save(cari);
            return {
              msg: cari.code_device + " update success",
            };
          } catch (error) {
            return ErrHand("Error", 406, response, 2);
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

  async delete(request: Request, response: Response, next: NextFunction) {
    let body = request.body;
    if (CheckBody(body, ["code_device"], ["string"])) {
      try {
        let cari = await this.deviceRepository.findOne({
          where: [
            {
              code_device: body.code_device,
            },
          ],
        });
        if (cari) {
          await this.deviceRepository.remove(cari);
          return {
            msg: body.code_device + " removed",
          };
        } else {
          return ErrHand("Code Device not Registered", 402, response, 2);
        }
      } catch (error) {
        return ErrHand("Error", 406, response, 2);
      }
    } else {
      return ErrHand("Not Accepted", 406, response, 1);
    }
  }
}
