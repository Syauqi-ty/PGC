import * as bcrypt from "bcrypt";

/**
 * Hasher Function for hashing password
 * @param payload password
 * @returns hashes password
 */
export function Hasher(payload: string): any {
  const hash = bcrypt.hashSync(payload, 10);
  return hash;
}

/**
 * Verifier for password verify
 * @param hash password hash
 * @param pwd password plain
 * @returns boolean true if password correct
 */
export function Verifier(hash: string, pwd: string): any {
  let cmp = bcrypt.compareSync(pwd, hash);
  return cmp;
}
