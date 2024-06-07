import JWTUtilsImp from "./JWTUtilsImp";
import JWTUtilsMock from "./JWTUtilsMock";

export default class JWTUtilsFactory {
  static getJWTUtils(
    mockJWTUtils: boolean,
    username: string,
    publicKey: string
  ) {
    if (mockJWTUtils) {
      return new JWTUtilsMock(username);
    } else {
      return new JWTUtilsImp(publicKey);
    }
  }
}
