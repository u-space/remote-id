import ILogsUtils from "./ILogsUtils";
import LogLevel from "./LogLevel";

export default class LogsUtilsFileImp implements ILogsUtils {
  logLine(logLevel: LogLevel, line: string): void {
    throw new Error("Method not implemented.");
  }
}
