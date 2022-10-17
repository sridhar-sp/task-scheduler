class Logger {
  static log(tag: string, log: string) {
    console.log(`${tag} :: `, log);
  }

  static logInfo(tag: string, log: any) {
    console.log(`Info :: ${tag} :: ${log}`);
  }

  static logDebug(tag: string, log: any) {
    console.log(`Debug :: ${tag} :: ${log}`);
  }

  static logError(tag: string, log: any) {
    console.error(`Error :: ${tag} :: ${log}`);
  }

  static logWarn(tag: string, log: any) {
    console.error(`Warn :: ${tag} :: ${log}`);
  }
}

export default Logger;
