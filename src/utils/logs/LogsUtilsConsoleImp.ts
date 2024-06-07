import ILogsUtils from "./ILogsUtils";
import LogLevel from "./LogLevel";

export default class LogsUtilsConsoleImp implements ILogsUtils {
  logLine(logLevel: LogLevel, line: string): void {
    console.log(line);
  }
}
