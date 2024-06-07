import CielumAPIImp from "./CielumAPIImp";
import CielumAPIMock from "./CielumAPIMock";
import ICielumAPI from "./ICielumAPI";

export default class CielumAPIFactory {
  static getCielumAPI(mockCielumAPI: boolean): ICielumAPI {
    if (mockCielumAPI) {
      return new CielumAPIMock();
    } else {
      return new CielumAPIImp();
    }
  }
}
