"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function identity(data) {
    return data;
}
const logLine = {
    timestamp: new Date(),
    data: {
        a: 1,
    },
};
// ==================================================================================
class Vehicle {
}
//Ограничение дженерика типом Vehicle
function kmToMiles(vehicle) {
    vehicle.run = vehicle.run * 0.621371;
    return vehicle;
}
class LCV extends Vehicle {
}
const vehicle = kmToMiles(new Vehicle());
const lcv = kmToMiles(new LCV());
//========================================================================
function logId(id, additionalData) {
    console.log(id);
    console.log(additionalData);
    return { id, data: additionalData };
}
const data = [
    { group: 1, name: "a" },
    { group: 1, name: "b" },
    { group: 2, name: "c" },
];
function sortDataByKey(array, key) {
    return array.reduce((acc, item) => {
        const currentKey = item[key];
        acc[currentKey] ? acc[currentKey].push(item) : (acc[currentKey] = [item]);
        return acc;
    }, {});
}
console.log("sortDataByKey=>>", sortDataByKey(data, "group"));
//=========================Дженерик в классах=========================
class Resp {
    constructor(data, error) {
        //Проверку можно не делать и ошибки не будет,
        // если в tsconfig указать exactOptionalPropertyTypes: false
        if (data) {
            this.data = data;
        }
        if (error) {
            this.error = error;
        }
    }
}
const res = new Resp("data", 0);
//=========================Дженерик в классах наследниках=========================
class HTTPResp extends Resp {
    setCode(code) {
        this.code = code;
    }
}
const res2 = new HTTPResp();
class List {
    constructor(items) {
        this.items = items;
    }
}
/**
 * Метод, если использовать extends(наследование)
 */
class ExtendedListClass extends List {
    first() {
        return this.items[0];
    }
}
/**
 * Миксин - это функция, которая принимает класс и возвращает новый класс
 * с реализацией дополнительного функционала. Миксины позволяют реализовать
 * множественное наследование классов в TypeScript.
 */
function ExtendedList(Base) {
    return class ExtendedList extends Base {
        first() {
            return this.items[0];
        }
    };
}
const list = ExtendedList(List);
const arr = new list(["a", "b", "c"]);
//Для понимания преимуществ мы создадим новый класс
class Accordion {
}
class AccordionList {
    constructor(items) {
        this.items = items;
    }
}
function ExtendedListWithAccordion(Base) {
    return class ExtendedList extends Base {
        first() {
            return this.items[0];
        }
    };
}
const newList = ExtendedListWithAccordion(AccordionList);
const arr5 = new newList(["a", "b", "c"]);
console.log("arr5.first()", arr5.first());
