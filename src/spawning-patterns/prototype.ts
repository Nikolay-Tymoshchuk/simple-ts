interface IPrototype<T> {
  clone(): T;
}

/**
 * Пример использования паттерна Прототип.
 * Класс UserHistory позволяет клонировать себя.
 */
class UserHistory implements IPrototype<UserHistory> {
  createdAt: Date = new Date();
  constructor(public email: string, public name: string) {
    this.createdAt = new Date();
  }

  clone(): UserHistory {
    const target = new UserHistory(this.email, this.name);
    target.createdAt = this.createdAt;
    return target;
  }
}

const user = new UserHistory("saint@gmail.com", "Saint");

console.log("user", user);

const user2 = user.clone();
console.log("user2", user2);
