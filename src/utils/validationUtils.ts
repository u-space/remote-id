export enum BasicType {
  Object = "object",
  boolean = "boolean",
  function = "function",
  number = "number",
  string = "string",
  undefined = "undefined",
}

export type ObjectKey = {
  name: string;
  type: BasicType;
};

export const validateObjectKeys = (
  obj: any,
  requiredKeys: ObjectKey[],
  optionalKeys: ObjectKey[],
  doNotAcceptExtraKeys?: boolean
): string => {
  if (obj === null || obj === undefined)
    return "obj can not be null or undefined";
  const objKeys = Object.keys(obj);
  const requiredKeysMap = objectKeysArrayToMap(requiredKeys);
  const optionalKeysMap = objectKeysArrayToMap(optionalKeys);
  for (let i = 0; i < objKeys.length; i++) {
    const key = objKeys[i];
    if (requiredKeysMap.has(key)) {
      if (typeof obj[key] !== requiredKeysMap.get(key)!.type.toString()) {
        return `${key} is ${typeof obj[key]} and must be ${requiredKeysMap
          .get(key)!
          .type.toString()}`;
      }
      requiredKeysMap.delete(key);
    } else if (optionalKeysMap.has(key)) {
      if (typeof obj[key] !== optionalKeysMap.get(key)!.type.toString()) {
        return `${key} is ${typeof obj[key]} and must be ${optionalKeysMap
          .get(key)!
          .type.toString()}`;
      }
      optionalKeysMap.delete(key);
    } else if (doNotAcceptExtraKeys) {
      return `invalid key '${key}'`;
    }
  }
  if (requiredKeysMap.size > 0) {
    let keysNotReceived = "";
    requiredKeysMap.forEach((entry) => {
      keysNotReceived += `${entry.name}, `;
    });
    keysNotReceived = keysNotReceived.substring(0, keysNotReceived.length - 2);
    return `${requiredKeysMap.size} required keys not received [${keysNotReceived}]`;
  }
  return "";
};

/* -------------------------------------------------------
 * ------------------ private functions ------------------
 * -------------------------------------------------------
 */

const objectKeysArrayToMap = (
  objectKeys: ObjectKey[]
): Map<string, ObjectKey> => {
  if (objectKeys === undefined)
    throw new Error("objectKeys can not be undefined");
  const result = new Map<string, ObjectKey>();
  objectKeys.forEach((key) => result.set(key.name, key));
  return result;
};
