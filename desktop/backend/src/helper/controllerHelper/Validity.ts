/**
 * ValidateType
 * @param data data to validate
 * @param type type of the data
 * @returns boolean
 */
export function ValidateType(data: any[], type: string[]): boolean {
  if (data.length === type.length) {
    let check = true;
    data.map((val, idx) => {
      if (typeof val !== type[idx]) {
        check = false;
      }
    });
    return check;
  } else {
    return false;
  }
}

/**
 * CheckBody
 * @param body request body
 * @param key key of the body
 * @param type type of the data
 * @returns boolean
 */
export function CheckBody(body: any, key: any[], type: string[]): boolean {
  if (key.length === type.length) {
    let check = true;
    key.map((val, idx) => {
      if (typeof body[val] !== type[idx]) {
        check = false;
      }
    });
    return check;
  } else {
    return false;
  }
}
