interface Role {
  name: string;
}

interface Permission {
  endDate: Date;
}

interface User {
  name: string;
  roles: Role[];
  permission: Permission;
}

const user: User = {
  name: "Alex",
  roles: [],
  permission: {
    endDate: new Date(),
  },
};

const nameUser = user["name"];

type toleType = User["roles"];

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

type rolesType2 = User[typeof rolesNames]; //Валидно

//let roleNames: "roles" = "roles"; //тоже будет валидно, если явно типизируем

/**
 * number - специальный тип, который можно положить в индексное обращение,
 * сказав, что мы хотим получить элемент массива. Удобно, когда мы из массива
 * хотим вытащить тип
 */
type roleType = User["roles"][number]; // roleType = Role

//Конвертация в ридонли
const roles = ["admin", "user", "super-user"] as const;

/**
 * Конвертируем в юнион-тайп. Полезно, когда в рантайме надо какие-то данные
 * из рантайм строк преобразовать в строковые типы. Например узнать тип юзера
 * и проверить его на соответствие с типом rules
 */
type roleTypes = (typeof roles)[number];

//Многоуровневая вложенность
type dateType = User["permission"]["endDate"];

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
