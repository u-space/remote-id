import LogLevel from "./LogLevel";

export default interface ILogsUtils {
  logLine(logLevel: LogLevel, line: string): void;
}
