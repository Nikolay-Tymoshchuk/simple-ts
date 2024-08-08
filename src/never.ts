type Param = "one" | "two" | "three";

function foo(param: Param) {
  switch (param) {
    case "one":
      return "one";
    case "two":
      return "two";
    case "three":
      return "three";
    default:
      const _: never = param;
      throw new Error("Unexpected param");
  }
}

function generateError(message: string): never {
  throw new Error(message);
}

function isString(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }

  /**
   * Исчерпывающая проверка
   *
   * Сюда мы больше не попадем, поэтому нет ошибки TS
   */
  generateError("Unexpected type");
}
