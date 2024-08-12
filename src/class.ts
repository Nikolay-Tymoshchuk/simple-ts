/**
 * Если отключена опция "strictPropertyInitialization": false,
 * то при компиляции будет ошибка. Но если добавить "!" в свойстве role,
 * то ошибка пропадет.
 */
class User {
  name!: string;
  age: number;

  constructor();
  constructor(name: string);
  constructor(age: number);
  constructor(name: string, age: number);
  constructor(nameOfAge?: string | number, age?: number) {
    if (typeof nameOfAge === "string") {
      this.name = nameOfAge;
    } else if (typeof nameOfAge === "number") {
      this.age = nameOfAge;
    }
    if (typeof age === "number") {
      this.age = age;
    }
  }
}

const user = new User("Alex");
const user2 = new User();
const user3 = new User(33);
const user4 = new User("Alex", 33);

//LABEL ====================Методы============================

enum PaymentStatus {
  Holden,
  Processed,
  Reserved,
}

class Payment {
  id: number;
  status: PaymentStatus = PaymentStatus.Holden;
  createdAt: Date = new Date();
  updatedAt: Date;

  constructor(id: number) {
    this.id = id;
  }

  getPaymentLifeTime(): number {
    return new Date().getTime() - this.createdAt.getTime();
  }

  unholdPayment(): void {
    if (this.status == PaymentStatus.Processed) {
      throw new Error("Payment can't be unholded");
    }
    this.status = PaymentStatus.Reserved;
    this.updatedAt = new Date();
  }
}

const payment = new Payment(1);
payment.unholdPayment();

//LABEL ====================Перегрузка методов============================

class User1 {
  skill: string[] = [];

  addSkill(skill: string): void;
  addSkill(skill: string[]): void;
  addSkill(skill: string | string[]): void {
    if (typeof skill === "string") {
      this.skill.push(skill);
    } else if (Array.isArray(skill)) {
      this.skill.push(...skill);
    } else {
      throw new Error("Unexpected type");
    }
  }
}

//============================Перегрузка функций=============================

function run(distance: string): string;
function run(distance: number): number;
function run(distance: string | number): number | string {
  if (typeof distance === "string") {
    return "1";
  } else {
    return 1;
  }
}

//LABEL ============================Геттеры и сеттеры=============================

class User2 {
  _login: string;
  password: string;
  createdAt: Date = new Date();

  //Getter and setter не могут быть асинхронными, так как это заблокирует основной поток выполнения кода.
  set login(value: string | number) {
    this._login = `${value} - login`;
    this.createdAt = new Date();
  }

  get login(): string {
    return this._login;
  }
  //Методы могут быть асинхронными
  async getPassword(): Promise<string> {
    return this.password;
  }
}

const user5 = new User2();
user5.login = "Alex";

//LABEL ======================Имплементация классом интерфейса=======================

interface ILogger {
  //Типизировать методы можно двумя способами
  log(...args: any): void;
  // error: (...args: any) => void;
  error(...args: any): void;
}

class Logger implements ILogger {
  log(...args: any): void {
    console.log(...args);
  }

  // Асинхронный метод так же удовлетворяет имплементации интерфейса
  async error(...args: any): Promise<void> {
    console.error(...args);
  }
}

interface IPayable {
  pay(paymentId: number): void;
  price?: number;
}

interface IDeletable {
  delete(): void;
}

class U implements IPayable, IDeletable {
  delete(): void {
    throw new Error("Method not implemented.");
  }
  // Если убрать типизацию paymentId, то будет ошибка, так как несмотря на то, что класс имплементирует интерфейс, paymentId будет any. Тип аргумента в классе всегда должен быть шире того, что реализовано в интерфейсе
  pay(paymentId: number | string): void {
    console.log(paymentId);
  }
  price?: number | undefined;
}

//LABEL ======================Наследование=======================

//Используем, когда одна и та же сущность имеет несколько различных видов

type PaymentSt = "new" | "paid";

class PaymentClass {
  id: number;
  status: PaymentSt = "new";

  constructor(id: number) {
    this.id = id;
  }

  pay(): void {
    this.status = "paid";
  }
}

class PersistedPayment extends PaymentClass {
  databaseId: number;
  paidAt: Date;

  //Если мы наследуемся и хотим переопределить конструктор, то нужно обязательно вызвать конструктор родителя через super
  constructor() {
    const id = Math.random();
    super(id);
  }

  save(): void {
    console.log("save");
  }

  //Переопределение метода

  //Старая, но рабочая запись

  // pay(date?: Date): void {
  //   super.pay();
  //   if (date) {
  //     this.paidAt = date;
  //   }
  // }

  //Новая запись (достигаем безопасности в случае, если метод pay в родительском классе изменится)
  override pay(date?: Date): void {
    if (date) {
      this.paidAt = date;
    }
  }
}

class User3 {
  name: string = "user";

  constructor() {
    console.log(this.name);
  }
}

class Admin extends User3 {
  name: string = "admin";
  constructor() {
    //super всегда в конструкторе должен быть первым, когда мы обращаемся к this. Если не обращаемся к свойствам класса, то может стоять  где-угодно в конструкторе
    super();
    console.log(this.name);
  }
}

new Admin();

//Кастомный класс ошибки
class HttpError extends Error {
  code: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = "HttpError";
    this.code = code ?? 500;
  }
}

//LABEL ======================Композиция против наследования=======================

class User6 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

//Incorrect
class Users extends Array<User6> {
  searchByName(name: string): User6 | undefined {
    // return this.filter((user) => user.name === name);
  }

  override toString(): string {
    return this.map((user) => user.name).join(", ");
  }
}

const users = new Users();
users.push(new User6("Alex"));
users.push(new User6("John"));
console.log(users.toString());

//Correct
class UserList {
  users: User[] = [];

  push(user: User): void {
    this.users.push(user);
  }
}

class Payments {
  date: Date;
}

//Incorrect
class UserWithPayment extends Payment {
  name: string;
}

//Correct
class UserWithPayment2 {
  user: User;
  payment: Payment;

  constructor(user: User, payments: Payments) {
    this.user = user;
    this.payment = payment;
  }
}

//LABEL ==================================Видимость свойств и методов=============================

class Vehicle {
  make: string;

  //Это равносильно такой записи
  // public make: string;

  private damages: string[] = [];
  private _model: string;
  protected run: number;
  #price: number;

  set model(m: string) {
    this._model = m;
    this.#price = 1000;
  }

  get model(): string {
    return this._model;
  }
  //Проверка на эквивалентность двух свойств
  isPriceEqual(v: Vehicle) {
    return this.#price === v.#price;
  }
  addDamage(damage: string): void {
    this.damages.push(damage);
  }
}

class EuroTruck extends Vehicle {
  setDamage(): void {
    //можем модифицировать только публичные свойства и методы
  }

  setRun(km: number): void {
    //можем достучаться к protected свойству в дочернем классе
    this.run = km / 0.621371;
  }
}

//LABEL ======================Корзина товаров=======================
// Необходимо сделать корзину (Cart) на сайте,
// которая имеет список продуктов (Product), добавленных в корзину
// и параметры доставки (Delivery). Для Cart реализовать методы:
// - Добавить продукт в корзину
// - Удалить продукт из корзины по ID
// - Посчитать стоимость товаров в корзине
// - Задать доставку
// - Checkout - вернуть что всё ок, если есть продукты и параметры доставки
// Product: id, название и цена
// Delivery: может быть как до дома (дата и адрес) или до пункта выдачи (дата = Сегодня и Id магазина)

//My decision
// interface IProduct {
//   id: number;
//   name: string;
//   price: number;
// }

// interface IHomeDelivery {
//   date: Date;
//   address: string;
// }

// interface IShopDelivery {
//   date: Date;
//   shopId: string;
// }

// class Cart {
//   id: string;
//   products: Array<IProduct> = [];
//   delivery: IHomeDelivery | IShopDelivery;

//   constructor() {
//     this.id = "1";
//   }

//   addProduct(product: IProduct) {
//     this.products.push(product);
//   }
//   removeProduct(product: IProduct) {
//     this.products = this.products.filter((p) => p.id !== product.id);
//   }

//   getPrice() {
//     return this.products.reduce((acc: number, p: IProduct) => {
//       acc + p.price;
//       return acc;
//     }, 0);
//   }

//   orderDelivery(d: IHomeDelivery | IShopDelivery): void {
//     this.delivery = d;
//   }

//   checkout(): Cart {
//     if (this.products.length > 0 && this.delivery) {
//       return this;
//     } else {
//       throw new Error("non completed order");
//     }
//   }
// }

class Product {
  constructor(public id: number, public title: string, public price: number) {}
}

class Delivery {
  constructor(public date: Date) {}
}

class HomeDelivery extends Delivery {
  constructor(date: Date, public address: string) {
    super(date);
  }
}
class ShopDelivery extends Delivery {
  constructor(public shopId: string) {
    super(new Date());
  }
}

type DeliveryOptions = HomeDelivery | ShopDelivery;

class Cart {
  private products: Product[] = [];
  private delivery: DeliveryOptions;

  public addProduct(product: Product) {
    this.products.push(product);
  }

  public deleteProduct(productId: number) {
    this.products = this.products.filter((p: Product) => p.id !== productId);
  }

  public getSum(): number {
    return this.products
      .map((p: Product) => p.price)
      .reduce((p1: number, p2: number) => p1 + p2);
  }

  public setDelivery(delivery: DeliveryOptions) {
    this.delivery = delivery;
  }

  public checkOut() {
    if (this.products.length == 0) {
      throw new Error("Cart is empty");
    }
    if (!this.delivery) {
      throw new Error("Delivery is not set");
    }
    return { success: true };
  }
}

const cart = new Cart();

cart.addProduct(new Product(1, "product1", 100));
cart.addProduct(new Product(2, "product2", 200));
cart.addProduct(new Product(3, "product3", 300));
cart.deleteProduct(2);
cart.setDelivery(new HomeDelivery(new Date(), "address"));

//LABEL ==============Статические методы и свойства================

class UserService {
  // зарезервированное слово name не может быть static
  // static name: string = "User service";
  static db: any;

  //Здесь мы можем использовать асинхронные методы
  static async getUser(id: number) {
    return UserService.db.findById(id);
  }

  constructor(id: number) {}

  //Микс статичных и обычных методов
  create() {
    UserService.db.save(this);
  }

  //Статичное инициализируемое свойство. Будет выполнено сразу, как мы запустим наш код. UserService будет иметь дополнительную логику, которую мы тут пропишем. Не можем использовать в нем ничего асинхронного
  static {
    UserService.db = "init";
  }
}

// UserService.db;
// UserService.getUser(1);

// const inst = new UserService(1);

//======================Работа с this=======================
class P {
  private date: Date = new Date();

  //Чтоб не потерять контекст this, типизируем this как P или используем стрелочную функцию. параметр a здесь второй, но при вызове он будет первым
  getDate(this: P, a: number): Date {
    return this.date;
  }

  //Контекст всегда привязан к P
  getDateArrow = (a: number): Date => {
    return this.date;
  };
}

const p = new P();

console.log("p.getDate()", p.getDate(1));

const user8 = {
  id: 1,
  //paymentDate: p.getDate,  Потеряли контекст this
  paymentDate: p.getDate.bind(p), // Сохранили контекст
  paymentDateArrow: p.getDateArrow, // Сохранили контекст
};

console.log("user8.", user8.paymentDate(1));
console.log("user8.", user8.paymentDateArrow(1));

class PaymentPersistent extends P {
  save() {
    //Будет работать
    return super.getDate(1);

    //Будет ошибка, так как стрелочная функция так как в прототипе объекта P не будет такой функции и ме не можем получить ее
    // return super.getDateArrow(1);

    //Будет работать
    // return this.getDateArrow(1);
  }
}

console.log("new", new PaymentPersistent().save());

//LABEL ======================Типизация this=======================
class UserBuilder {
  name: string;

  //Типизировать возвращаемый тип можно через this, чтоб потомки возвращали свой тип, а не тип родителя, если бы мы вернули UserBuilder
  setName(name: string): this {
    this.name = name;
    return this;
  }

  // тайпгард для определения, что это админ
  isAdmin(): this is AdminBuilder {
    return this instanceof AdminBuilder;
  }
}

class AdminBuilder extends UserBuilder {
  // role: string;
  // setRole(role: string): this {
  //   this.role = role;
  //   return this;
  // }
}

const res = new UserBuilder().setName("Alex");

let user9: UserBuilder | AdminBuilder = new UserBuilder();

if (user9.isAdmin()) {
  console.log(user9);
} else {
  console.log(user9);
}

//LABEL ======================Абстрактные классы, свойства, методы=======================

abstract class Controller {
  //Обязательный метод, который должен быть реализован в наследниках
  abstract handle(req: any): void;

  // не абстрактный метод, который будет выполняться во всех наследниках класса
  handleWithLogs(req: any) {
    console.log("start");
    this.handle(req);
    console.log("end");
  }
}

class UserController extends Controller {
  handle(req: any): void {
    console.log(req);
  }
}

const controller = new UserController();
controller.handleWithLogs("Request");

//LABEL ======================Реализация логгера с абстрактным классом=======================
// Необходимо реализовать абстрактный класс Logger с 2-мя методами
// абстрактным - log(message): void
// printDate - выводящий в log дату
// К нему необходимо сделать реальный класс, который бы имел logWithDate,
// выводящий сначала дату, а потом заданное сообщение

//
abstract class MyLogger {
  abstract log(message: string): void;

  printDate(date: Date) {
    this.log(date.toString());
  }
}

class RealLogger extends MyLogger {
  log(message: string): void {
    console.log(message);
  }

  logWithDate(message: string): void {
    this.printDate(new Date());
    this.log(message);
  }
}
