interface IUser {
  name: string;
  age: number;
}

type KeysOfUser = keyof IUser;

const key: KeysOfUser = "age";

function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const user: IUser = {
  name: "Alex",
  age: 30,
};

const userName = getValue(user, "name");

// LABEL: функция группировки

interface IData {
  group: number;
  name: string;
}

const data: IData[] = [
  {
    group: 1,
    name: "a",
  },
  {
    group: 2,
    name: "b",
  },
  {
    group: 1,
    name: "c",
  },
  {
    group: 1,
    name: "d",
  },
  {
    group: 5,
    name: "a",
  },
];

type Key = string | number | symbol;

interface IGroup<T> {
  [key: string]: T[];
}

function group<T extends Record<Key, any>>(
  arr: Array<T>,
  key: keyof T
): IGroup<T> {
  return arr.reduce<IGroup<T>>((map: IGroup<T>, item: T) => {
    const itemKey = item[key];
    if (!(itemKey in map)) {
      map[itemKey] = [item];
    } else {
      map[itemKey].push(item);
    }
    return map;
  }, {});
}

const result = group<IData>(data, "name");

console.log(result);

//LABEL ===========================Typeof =================

let strOrNum: string | number = 5;

if (Math.random() > 0.5) {
  strOrNum = 5;
} else {
  strOrNum = "5";
}

if (typeof strOrNum === "string") {
  console.log("strOrNum", strOrNum);
} else {
  console.log("strOrNum", strOrNum);
}

let str2OrNum: typeof strOrNum;

const person = {
  name: "Alex",
};

//Ошибка будет, потому что person не типизирован, person - это константа, а не тип
// type keyofPerson = keyof person;

//Чтоб обратиться к типу person мы преобразовываем его к типу.
type keyOfPerson = keyof typeof person; // работает

interface IPerson {
  name: string;
}

type keyOfIPerson = keyof IPerson; // работает;

enum Direction {
  Up,
  Down,
}

type d = keyof typeof Direction;
