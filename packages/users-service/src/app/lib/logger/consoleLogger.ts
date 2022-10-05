import { BgBlue, BgGreen, BgRed, BgYellow, Bright, FgBlack, FgBlue, FgCyan, FgGreen, FgRed, FgWhite, FgYellow, Reset } from "../colors/colors";

class ConsoleLogger {
  private static instance?: ConsoleLogger;
  private constructor() { }
  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new ConsoleLogger();
    }
    return this.instance;
  }

  ok(message: string) {
    console.log(`${Reset}${BgGreen}${FgBlack}[${Bright}OK${Reset}${BgGreen}${FgBlack}]${Reset} ${FgCyan}${message}${Reset}`);
  }
  warn(message: string) {
    console.warn(`${Reset}${BgYellow}${FgBlack}[${Bright}WARN${Reset}${BgYellow}${FgBlack}]${Reset} ${FgYellow}${message}${Reset}`);
  }
  info(message: string) {
    console.info(`${Reset}${BgBlue}${FgBlack}[${Bright}INFO${Reset}${BgBlue}${FgBlack}]${Reset} ${FgWhite}${message}${Reset}`);
  }
  error(message: string) {
    console.error(`${Reset}${BgRed}${FgBlack}[${Bright}ERROR${Reset}${BgRed}${FgBlack}]${Reset} ${FgRed}${message}${Reset}`);
  }
}


const logger = ConsoleLogger.getInstance()
export default logger;
