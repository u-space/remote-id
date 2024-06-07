export const getString = (str: any): string => {
  if (typeof str === "string") return String(str);
  if (str === null || str === undefined) return "";
  throw new Error("invalid input");
};

export const getStringOrNull = (str: any): string | null => {
  if (typeof str === "string") return `${str}`;
  if (str === null || str === undefined) return null;
  throw new Error("invalid input");
};

export const getNumber = (number: any): number => {
  if (typeof number === "number") return number as number;
  if (typeof number === "string") return Number.parseFloat(number);
  if (number === null || number === undefined) return 0;
  throw new Error("invalid input");
};

export const getNumberOrNull = (number: any): number | null => {
  if (typeof number === "number") return number as number;
  if (number === null || number === undefined) return null;
  throw new Error("invalid input");
};

export const stringToDate = (value: string, format: string): Date => {
  if (format === "yyyy-MM-dd'T'HH:mm:ss.SSSZ") {
    try {
      return new Date(Date.parse(value));
    } catch (error) {
      throw new Error("invalid input");
    }
  }
  throw new Error("invalid format");
};
