interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

class UserService implements IUserService {
  private _users: number;

  @Log()
  set users(value: number) {
    this._users = value;
  }

  /**
   * Для accessors(геттеров и сеттеров) мы не может установить
   * один и тот же декоратор одновременно на get и set.
   * Но, поменяв местами декоратор с сеттера на геттер,
   * или наоборот,  ничего не изменится в итоге результате.
   */
  //@Log()
  get users() {
    return this._users;
  }

  getUsersInDataBase(): number {
    throw new Error("Method not implemented.");
  }
}

function Log() {
  return (
    target: Object,
    _: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const set = descriptor.set;

    /**
     * Переопределяем метод так, как нам нужно
     * @param args - аргументы, которые передаются в сеттер
     */
    descriptor.set = (...args: any) => {
      console.log("args", args);
      set?.apply(target, args);
    };
  };
}

const userService = new UserService();
userService.users = 10;
console.log("userService", userService.users);
