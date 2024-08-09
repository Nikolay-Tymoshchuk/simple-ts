function identity<T>(data: T): T {
  return data;
}

interface ILogLine<T> {
  timestamp: Date;
  data: T;
}

const logLine: ILogLine<{ a: number }> = {
  timestamp: new Date(),
  data: {
    a: 1,
  },
};
// ==================================================================================
class Vehicle {
  run: number;
}

//Ограничение дженерика типом Vehicle
function kmToMiles<T extends Vehicle>(vehicle: T): T {
  vehicle.run = vehicle.run * 0.621371;
  return vehicle;
}

class LCV extends Vehicle {
  capacity: number;
}

const vehicle = kmToMiles(new Vehicle());
const lcv = kmToMiles(new LCV());

//========================================================================

function logId<T extends string | number, Y>(
  id: T,
  additionalData: Y
): { id: T; data: Y } {
  console.log(id);
  console.log(additionalData);
  return { id, data: additionalData };
}

//=========================Функция сортировки с дженерик=========================
interface Data {
  group: number;
  name: string;
}

const data: Data[] = [
  { group: 1, name: "a" },
  { group: 1, name: "b" },
  { group: 2, name: "c" },
];

interface IGroup<T> {
  [key: string]: T[];
}

type key = string | number | symbol;

function sortDataByKey<T extends Record<key, any>>(
  array: Array<T>,
  key: keyof T
): IGroup<T> {
  return array.reduce<IGroup<T>>((acc: IGroup<T>, item: T) => {
    const currentKey = item[key];
    acc[currentKey] ? acc[currentKey].push(item) : (acc[currentKey] = [item]);
    return acc;
  }, {});
}

console.log("sortDataByKey=>>", sortDataByKey<Data>(data, "group"));

//=========================Дженерик в классах=========================

class Resp<D, E> {
  data?: D;
  error?: E;

  constructor(data?: D, error?: E) {
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

const res = new Resp<string, number>("data", 0);

//=========================Дженерик в классах наследниках=========================

class HTTPResp<F> extends Resp<string, number> {
  code!: F;
  setCode(code: F) {
    this.code = code;
  }
}

const res2 = new HTTPResp();

//=========================Миксины=========================

type Constructor = new (...args: any[]) => {};
type GConstructor<T = {}> = new (...args: any[]) => T;

class List {
  constructor(public items: string[]) {}
}

type ListType = GConstructor<List>;

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

function ExtendedList<TBase extends ListType>(Base: TBase) {
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
  isOpened: boolean;
}

type AccordionType = GConstructor<Accordion>;

class AccordionList {
  isOpened: boolean;
  constructor(public items: string[]) {}
}

function ExtendedListWithAccordion<TBase extends ListType & AccordionType>(
  Base: TBase
) {
  return class ExtendedList extends Base {
    first() {
      return this.items[0];
    }
  };
}

const newList = ExtendedListWithAccordion(AccordionList);

const arr5 = new newList(["a", "b", "c"]);
console.log("arr5.first()", arr5.first());
