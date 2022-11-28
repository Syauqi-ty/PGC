import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { Request, Response } from "express";
import { ErrHand } from "../controllerHelper/ErrHand";

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = crypto.randomBytes(16);

/**
 * GenerateAccessToken JWT
 * @param user is user type
 * @returns encrypted JWT Token and the IV
 */
export function GenerateAccessToken(user: any): {
  iv: string;
  content: string;
} {
  return Encrypt(
    jwt.sign(user, process.env.TOKEN_SECRET, {
      expiresIn: "10800s",
    })
  );
}

/**
 * AuthTokenVerify JWT
 * @param token JWT Token
 * @returns [false] is JWT not verified and [True. user] if verified
 * @returns [false, newtoken, payload] if token is verified but expired
 */
export function AuthTokenVerify(token: string): void {
  let val = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (!err) {
        return [true, user.data];
      } else if (err.name === "TokenExpiredError") {
        let payload = jwt.verify(token, process.env.TOKEN_SECRET, {
          ignoreExpiration: true,
        });
        let newtoken = GenerateAccessToken({ data: payload.data });
        return [false, newtoken, payload.data];
      } else return [false];
    }
  );
  return val;
}

/**
 * Encrypt AES
 * @param text encryption plaintext
 * @returns Iv and Content of the encrypted data
 */
export function Encrypt(text: any): { iv: string; content: string } {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
}

/**
 * Decrypt AES
 * @param hash hash contain IV and Message
 * @returns Decrpted Data
 */
export function Decrypt(hash: any): string {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
}

/**
 * TokenValidator for validation controller token
 * @param request http express request
 * @param response http express response
 * @returns data: userdata, newtoken: newrefreshedtoken, msg: function message, codehandler: codehandler if error
 */

export function TokenValidator(
  request: Request,
  response: Response
):
  | { msg: any; codehandler: any }
  | { data: any; msg: string; newtoken?: undefined }
  | { data: any; newtoken: string; msg: string } {
  let token = request.headers.authorization.split("Bearer ")[1].split("-");
  if (token.length === 2) {
    let RTok = {
      content: token[0],
      iv: token[1],
    };
    let verify = AuthTokenVerify(Decrypt(RTok));
    if (verify[0]) {
      return { data: verify[1], msg: "ok" };
    } else {
      if (verify[1]) {
        return {
          data: verify[2],
          newtoken: verify[1].content + "-" + verify[1].iv,
          msg: "Token expired but valid",
        };
      } else {
        return ErrHand("Not Accepted", 406, response, 1);
      }
    }
  } else {
    return ErrHand("Not Accepted", 406, response, 1);
  }
}
