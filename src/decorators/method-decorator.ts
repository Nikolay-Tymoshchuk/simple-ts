interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

class UserService implements IUserService {
  users: number;

  @Log
  getUsersInDataBase(): number {
    throw new Error("Error");
  }
}

/**
 * Декоратор метода применяется, когда нам нужно получить какие-то метаданные,
 * переопределить сам метод или дополнить его
 * @param target - объект, к которому относится этот метод
 * @param propertyKey - название метода
 * @param descriptor - объект со свойствами
 *  {
 *      enumerable?: boolean;
 *      configurable?: boolean;
 *      writable?: boolean;
 *      value?: T;
 *      get?: () => T;
 *      set?: (value: T) => void;
 *  }
 */
function Log(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
) {
  /**
   * Переопределяем метод так, как нам нужно
   */
  const oldValue = descriptor.value;

  Math.random() > 0.5
    ? (descriptor.value = oldValue)
    : (descriptor.value = () => console.log("no error"));
}
