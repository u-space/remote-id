import ILogsUtils from "./ILogsUtils";
import LogLevel from "./LogLevel";

export default class LogsUtilsDummyImp implements ILogsUtils {
  logLine(logLevel: LogLevel, line: string): void {}
}
