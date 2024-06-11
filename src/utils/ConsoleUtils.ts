export default class ConsoleUtils {
  static print(line: string, color?: ConsoleColor): void {
    let colorCode = 0;
    if (color !== undefined) {
      colorCode = ConsoleUtils.getColorCode(color);
    }
    console.log(`\x1b[${colorCode}m${line}\x1b[0m`);
  }

  private static getColorCode(color: ConsoleColor): number {
    if (color === ConsoleColor.BLUE) return 34;
    if (color === ConsoleColor.GREEN) return 32;
    if (color === ConsoleColor.MAGENTA) return 35;
    if (color === ConsoleColor.RED) return 31;
    if (color === ConsoleColor.WHITE) return 37;
    if (color === ConsoleColor.YELLOW) return 33;
    throw new Error(`Invalid color (color=${color})`);
  }
}

export const enum ConsoleColor {
  BLUE,
  GREEN,
  MAGENTA,
  RED,
  WHITE,
  YELLOW,
}
