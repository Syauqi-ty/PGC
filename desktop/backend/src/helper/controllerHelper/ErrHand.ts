/**
 * ErrHand function
 * @param msg error massage
 * @param status http status code
 * @param response http response
 * @param codehandler code handler for frontend error
 * @returns response status and error objects
 */
export function ErrHand(
  msg,
  status,
  response,
  codehandler
): { msg: any; codehandler: any } {
  response.status(status);
  return {
    msg: msg,
    codehandler: codehandler,
  };
}
