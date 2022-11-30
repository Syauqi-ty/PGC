import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Users } from "../../entity/Users";
import { EmailVal } from "../../helper/authHelper/EmailChecker";
import { Hasher, Verifier } from "../../helper/authHelper/HashHelp";
import { ErrHand } from "../../helper/controllerHelper/ErrHand";
import { CheckBody } from "../../helper/controllerHelper/Validity";

export class UserController {
  private userRepository = getRepository(Users);

  async register(request: Request, response: Response, next: NextFunction) {
    let body = request.body;
    if (
      CheckBody(
        body,
        ["name", "phone", "email", "username", "password", "level"],
        ["string", "string", "string", "string", "string", "number"]
      )
    ) {
      if (EmailVal(body.email)) {
        let existCheck = await this.userRepository.findOne({
          where: [
            {
              name: body.name,
            },
            {
              email: body.email,
            },
            {
              phone: body.phone,
            },
            {
              username: body.username,
            },
          ],
        });
        if (existCheck !== undefined) {
          return ErrHand("Already Exist", 402, response, 2);
        } else {
          let databuf = body;
          let hash = Hasher(body.password);
          databuf.password = hash;
          await this.userRepository.save(databuf);
          return {
            msg: "Hi " + databuf.name,
            codehandler: 0,
          };
        }
      } else {
        return ErrHand("Email Not Valid", 406, response, 3);
      }
    } else {
      return ErrHand("Not Accepted", 406, response, 1);
    }
  }
  async login(request: Request, response: Response, next: NextFunction) {
    let body = request.body;
    if (CheckBody(body, ["umail", "password"], ["string", "string"])) {
      let existCheck = await this.userRepository.findOne({
        where: [
          {
            username: body.umail,
          },
          {
            email: body.umail,
          },
        ],
      });
      if (existCheck !== undefined) {
        if (Verifier(existCheck.password, body.password)) {
          let data = existCheck;
          delete data.password;
          let token = data.id;
          return {
            msg: "Welcome Aboard " + data.name,
            token: token,
            codehandler: 0,
          };
        } else {
          return ErrHand("Logged In Failed", 402, response, 2);
        }
      } else {
        return ErrHand("User Not Registered", 402, response, 2);
      }
    } else {
      return ErrHand("Not Accepted", 406, response, 1);
    }
  }
  async finduserbyid(request: Request, response: Response, next: NextFunction) {
    let params = request.params["id"];
    let user = await this.userRepository.findOne({
      where: { id: params },
    });
    if (user) {
      return {
        data: user,
        msg: "Query Successfully",
      };
    } else {
      return ErrHand("Genre not found", 406, response, 1);
    }
  }

  async findall(request: Request, response: Response, next: NextFunction) {
    let user = await this.userRepository.find();
    if (user) {
      return {
        data: user,
        msg: "Query Successfully",
      };
    } else {
      return ErrHand("Genre not found", 406, response, 1);
    }
  }

  async edituser(request: Request, response: Response, next: NextFunction) {
    let body = request.body;
    if (CheckBody(body, ["umail"], ["string"])) {
      try {
        let cari = await this.userRepository.findOne({
          where: [
            {
              username: body.umail,
            },
            {
              email: body.umail,
            },
          ],
        });
        if (cari) {
          delete body.umail;
          cari = { ...cari, ...body };
          try {
            await this.userRepository.save(cari);
            return {
              msg: cari.name + " update success",
            };
          } catch (error) {
            return ErrHand("Error", 406, response, 2);
          }
        } else {
          return ErrHand("User Not Registered", 402, response, 2);
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
    if (CheckBody(body, ["umail"], ["string"])) {
      try {
        let cari = await this.userRepository.findOne({
          where: [
            {
              username: body.umail,
            },
            {
              email: body.umail,
            },
          ],
        });
        if (cari) {
          await this.userRepository.remove(cari);
          return {
            msg: body.umail + " removed",
          };
        } else {
          return ErrHand("User Not Registered", 402, response, 2);
        }
      } catch (error) {
        return ErrHand("Error", 406, response, 2);
      }
    } else {
      return ErrHand("Not Accepted", 406, response, 1);
    }
  }
}
