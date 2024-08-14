interface Role {
  name: string;
}

interface Permission {
  endDate: Date;
}

interface U {
  name: string;
  roles: Role[];
  permission: Permission;
}

const user: U = {
  name: "Alex",
  roles: [],
  permission: {
    endDate: new Date(),
  },
};

const nameUser = user["name"];

type toleType = U["roles"];

/**
 * Так работать не будет, так как мы работаем с типами, а не константами
 */

const rolesNames = "roles";

// type roleType2 = User[roleNames];

/**
 * Чтоб это исправить, конвертируем roleNames в тип
 * при помощи typeof. При чем это будет работать только потому,
 * что roleNames - это константа, а она принимает стринг-литеральный тип("roles"),
 * а не string. Если определим ее через let, то будет ошибка, если не типизируем явно
 * let roleNames: "roles" = "roles"
 */

type rolesType2 = U[typeof rolesNames]; //Валидно

//let roleNames: "roles" = "roles"; //тоже будет валидно, если явно типизируем

/**
 * number - специальный тип, который можно положить в индексное обращение,
 * сказав, что мы хотим получить элемент массива. Удобно, когда мы из массива
 * хотим вытащить тип
 */
type roleType = U["roles"][number]; // roleType = Role

//Конвертация в ридонли
const roles = ["admin", "user", "super-user"] as const;

/**
 * Конвертируем в юнион-тайп. Полезно, когда в рантайме надо какие-то данные
 * из рантайм строк преобразовать в строковые типы. Например узнать тип юзера
 * и проверить его на соответствие с типом rules
 */
type roleTypes = (typeof roles)[number];

//Многоуровневая вложенность
type dateType = U["permission"]["endDate"];

//LABEL ===========================Кондишенал тайп ==============================

interface HTTPResponse<T extends "success" | "failed"> {
  code: number;
  data: T extends "success" ? string : Error;
}

const success: HTTPResponse<"success"> = {
  code: 200,
  data: "done",
};

const err: HTTPResponse<"failed"> = {
  code: 200,
  data: new Error(),
};

class User {
  id: number;
  name: string;
}

class UserPersisted extends User {
  dbId: string;
}

//Удобно для перегрузок
function getUser(id: number): User;
function getUser(dbId: string): UserPersisted;
function getUser(dbIdOrId: string | number): User | UserPersisted {
  if (typeof dbIdOrId === "number") {
    return new User();
  } else {
    return new UserPersisted();
  }
}

//Упрощаем

type UserOrUserPersisted<T extends string | number> = T extends number
  ? User
  : UserPersisted;

function getUser2<T extends string | number>(
  id: number
): UserOrUserPersisted<T> {
  if (typeof id === "number") {
    return new User() as UserOrUserPersisted<T>;
  } else {
    return new UserPersisted() as UserOrUserPersisted<T>;
  }
}

//LABEL: ============================Infer===============================

function runTransaction(transaction: { fromTo: [string, string] }) {
  console.log();
}

/**
 * В дженерик мы передали тип runTransaction - это функция и она удовлетворят
 * условию, прописанному в GetFirstArg. Ошибки нет.
 * То есть с помощью infer мы вытащили тип в рантайме, который нигде не задан
 */
const transaction: GetFirstArg<typeof runTransaction> = {
  fromTo: ["1", "2"],
};

runTransaction(transaction);

/**
 * Infer вытаскивает тип. В функции ниже мы говорим:
 * Если T экстендит описанную функцию, то верни первый аргумент функции
 */
type GetFirstArg<T> = T extends (first: infer FirstArg, ...args: any[]) => any
  ? FirstArg
  : never;

//LABEL: ================================Mapped Types=========================

type Modifier = "read" | "update" | "create";

type UserRoles = {
  customer?: Modifier;
  projects: Modifier;
  adminPanel?: Modifier;
};

type UserAccess1 = {
  customer?: boolean;
  projects?: boolean;
  adminPanel?: boolean;
};

/**
 * Запись ниже означает, что мы хотим пройтись по всем ключам
 * передаваемого типа и преобразовать их в boolean
 * -? - это модификатор, который говорит, что все свойства обязательны
 * +? - это модификатор, который говорит, что все свойства не обязательны
 */
type ModifierToAccess<T> = {
  [Property in keyof T]-?: boolean;
};

type UserAccess2 = ModifierToAccess<UserRoles>;

/**
 * Более сложный пример. Мы хотим преобразовать ключи типа в булевые значения,
 * но при этом исключить ключ adminPanel.
 * При этом ключи должны быть в camelCase, все типы внутри объекта должны быть
 * обязательными и readonly
 */

/**
 * Преобразование первой буквы в заглавную. Вытаскиваем первую букву и оставшуюся
 * часть строки. Если строка пустая, то возвращаем ее же
 * Uppercase - это встроенный тип, который преобразует строку в верхний регистр
 */
type CapitalizeFirstLetter<S extends string> =
  S extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : S;

type ModifierToAccess2<T> = {
  +readonly [Property in keyof T as Exclude<
    `canAccess${CapitalizeFirstLetter<string & Property>}`,
    `canAccessAdminPanel`
  >]-?: boolean;
};

type UserAccess3 = ModifierToAccess2<UserRoles>;

//LABEL: ================================Валидация форм=========================

interface IForm {
  name: string;
  password: string;
  age: number;
}

const form: IForm = {
  name: "Alex",
  password: "123",
  age: 1,
};

const formValidation: Validation<IForm> = {
  name: { isValid: true },
  password: { isValid: false, errorMessage: "Password is required" },
  age: { isValid: true },
};

type Validation<T> = {
  [K in keyof T]:
    | {
        isValid: true;
      }
    | {
        isValid: false;
        errorMessage: string;
      };
};

//LABEL: ===============================Template literal types=======================

type ReadOrWrite = "read" | "write";
type Bulk = "bulk" | "";

type Access = `can${Uppercase<ReadOrWrite>}${Capitalize<Bulk>}`;

type ErrorOrSuccess = "error" | "success";

type ResponseType = {
  result: `http${Capitalize<ErrorOrSuccess>}`;
};

const a: ResponseType = {
  result: "httpSuccess",
};

/**
 * Обратная распаковка. Вытягиваем все, обрезая "can"
 */
type ReadOrWriteBulk<T> = T extends `can${infer R}` ? R : never;

type t = ReadOrWriteBulk<Access>;
