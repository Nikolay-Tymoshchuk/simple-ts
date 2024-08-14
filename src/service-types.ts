//LABEL: =================================Partially, Required, Readonly===============================

interface User {
  name: string;
  age?: number;
  email: string;
  gender: "male" | "female";
}

type P = Partial<User>;

type R = Required<User>;

type RO = Readonly<User>;

type RequiredAndReadOnly = Required<Readonly<User>>;

//LABEL: =================================Pick, Omit, Extract, Exclude===============================

/**
 * Первый аргумент - тип, из которого нужно удалить поля
 * Второй аргумент - поля, которые нужно удалить
 * Получаем новый тип, в котором отсутствуют поля из второго аргумента
 */

type Payment = Omit<User, "name" | "gender">;

/**
 * Первый аргумент - тип, из которого нужно взять поля
 * Второй аргумент - поля, которые нужно взять
 * Получаем новый тип, в котором присутствуют только поля из второго аргумента
 */

type UserBaseInfo = Pick<User, "name" | "email">;

/**
 * Экстракт подразумевает вытаскикавание из юнион  типа
 * какой-то части определенного типа
 *
 * Первый аргумент - это то, откуда нам нужно взять те поля,
 * которые являются подмножеством второго аргумента
 * Второй аргумент - это тип, который мы хотим извлечь
 */

type Extracted = Extract<"age" | UserBaseInfo, string>;

/**
 * Эксклюд подразумевает исключение из юнион типа
 * какой-то части определенного типа
 *
 * Первый аргумент - это то, откуда нам нужно взять те поля,
 * которые не являются подмножеством второго аргумента
 * Второй аргумент - это тип, который мы хотим исключить
 */

type Excluded = Exclude<"age" | UserBaseInfo, string>;

//LABEL: ====================ReturnType, Parameters, ConstructorParameters=================
class User {
  constructor(public id: number, public name: string) {}
}

function getData(id: number): User {
  return new User(id, "John");
}

/**
 * ReturnType - возвращает тип возвращаемого значения функции
 * Удобно при работе с функциями, которые возвращают сложные типы
 * Например при сервер сайд рендеринге и получении статичных пропсов
 */
type RT = ReturnType<typeof getData>;

/**
 * Parameters - возвращает тип аргументов функции
 * То, что мы получаем - это картеж, к которому можно обратиться по индексу
 */
type PT = Parameters<typeof getData>;

type first = PT[0];

/**
 * ConstructorParameters - возвращает тип аргументов конструктора класса
 * То, что мы получаем - это картеж из значений,
 * которые нужны для инициализации класса
 */
type CP = ConstructorParameters<typeof User>;

//LABEL ======================Awaited=========================

type A = Awaited<Promise<string>>;
type B = Awaited<Promise<Promise<string>>>;

interface IMenu {
  name: string;
  url: string;
}

async function getMenu(): Promise<IMenu[]> {
  return [{ name: "Home", url: "/" }];
}

/**
 * Как получить IMenu из getMenu?
 * Нужно использовать Awaited
 * Без него получим Promise<IMenu[]>
 */
type Return = Awaited<ReturnType<typeof getMenu>>;

//Читаемость кода
async function getArray<T>(x: T): Promise<Awaited<T>[]> {
  return [await x];
}
