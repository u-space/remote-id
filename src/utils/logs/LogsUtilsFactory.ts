import ILogsUtils from "./ILogsUtils";
import LogsUtilsConsoleImp from "./LogsUtilsConsoleImp";
import LogsUtilsDummyImp from "./LogsUtilsDummyImp";
import LogsUtilsFileImp from "./LogsUtilsFileImp";

export default class LogsUtilsFactory {
  static getLogsUtils(type: LogsUtilsType): ILogsUtils {
    if (type === LogsUtilsType.DUMMY) return new LogsUtilsDummyImp();
    else if (type === LogsUtilsType.CONSOLE) return new LogsUtilsConsoleImp();
    else if (type === LogsUtilsType.FILE) return new LogsUtilsFileImp();
    throw new Error(`Invalid type (type=${type})`);
  }
}

export enum LogsUtilsType {
  DUMMY,
  CONSOLE,
  FILE,
}

export function strToLogsUtilsType(str: string) {
  if (str === "DUMMY") return LogsUtilsType.DUMMY;
  if (str === "CONSOLE") return LogsUtilsType.CONSOLE;
  if (str === "FILE") return LogsUtilsType.FILE;
  throw new Error(`Invalid type (type=${str})`);
}
