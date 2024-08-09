"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo(param) {
    switch (param) {
        case "one":
            return "one";
        case "two":
            return "two";
        case "three":
            return "three";
        default:
            const _ = param;
            throw new Error("Unexpected param");
    }
}
function generateError(message) {
    throw new Error(message);
}
function isString(x) {
    if (typeof x === "string") {
        return true;
    }
    else if (typeof x === "number") {
        return false;
    }
    /**
     * Исчерпывающая проверка
     *
     * Сюда мы больше не попадем, поэтому нет ошибки TS
     */
    generateError("Unexpected type");
}
