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

//====================Методы============================

enum PaymentStatus {
  Holden,
  Processed,
  Reserved,
}

class Payment {
  id: number;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number) {
    this.id = id;
    this.createdAt = new Date();
    this.status = PaymentStatus.Holden;
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
console.log("payment", payment);
const time = payment.getPaymentLifeTime();
console.log(time);
console.log("<=============TIME=============>", time);
