import config from "../config";

class Logger {
  private static logToConsole(type: string, tag: string, log: any) {
    let pidLogSuffix = "";
    if (config.isClusterModeEnabled) pidLogSuffix = `pid ${process.pid} ::`;
    console.log(`${new Date().toISOString()} :: ${pidLogSuffix} ${config.appName} :: ${type} :: ${tag} :: ${log}`);
  }

  static log(tag: string, log: string) {
    Logger.logToConsole("V", tag, log);
  }

  static logInfo(tag: string, log: any) {
    Logger.logToConsole("I", tag, log);
  }

  static logDebug(tag: string, log: any) {
    Logger.logToConsole("D", tag, log);
  }

  static logError(tag: string, log: any) {
    Logger.logToConsole("E", tag, log);
  }

  static logWarn(tag: string, log: any) {
    Logger.logToConsole("W", tag, log);
  }
}

export default Logger;
