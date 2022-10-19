import config from "../config";

class Logger {
  private static logToConsole(type: string, tag: string, log: any) {
    console.log(`${new Date().toISOString()} :: ${config.appName} :: ${type} :: ${tag} :: ${log}`);
  }

  static log(tag: string, log: string) {
    Logger.logToConsole("Verbose", tag, log);
  }

  static logInfo(tag: string, log: any) {
    Logger.logToConsole("Info", tag, log);
  }

  static logDebug(tag: string, log: any) {
    Logger.logToConsole("Debug", tag, log);
  }

  static logError(tag: string, log: any) {
    Logger.logToConsole("Error", tag, log);
  }

  static logWarn(tag: string, log: any) {
    Logger.logToConsole("Warn", tag, log);
  }
}

export default Logger;
