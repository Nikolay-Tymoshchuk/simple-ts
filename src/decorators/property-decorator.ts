interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

class UserService implements IUserService {
  @Max(100)
  /**
   * Если задать дефолтное значение для users,
   * то декоратор обработает его уже на этапе инициализации класса.
   * В нашем случае, если задать дефолтное значение больше 100, то декоратор
   * сообщит нам, что значение не может быть больше ста.
   * То есть на этапе присвоения значения переменной users, декоратор уже работает
   */
  users: number;

  getUsersInDataBase(): number {
    return this.users;
  }
}

function Max(max: number) {
  return (target: Object, propertyKey: string | symbol) => {
    let value: number;

    const getter = function () {
      return value;
    };
    const setter = function (newValue: number) {
      if (newValue > max) {
        console.log("Value is greater than 100");
      } else {
        value = newValue;
      }
    };
    /**
     * Object.defineProperty первым параметром принимает объект,
     * которому принадлежит свойство, вторым - название свойства.
     * Третьим параметром - набор дескрипторов, которые мы хотим
     * применить к свойству
     */
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}

const userService = new UserService();
userService.users = 10;
console.log("userService.users", userService.users);
userService.users = 1000;
console.log("userService.users", userService.users);
