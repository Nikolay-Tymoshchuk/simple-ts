import "reflect-metadata";

const POSITIVE_METADATA_KEY = Symbol("POSITIVE_METADATA_KEY");

interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

class UserService implements IUserService {
  users: number;

  getUsersInDataBase(): number {
    throw this.users;
  }

  @Validate()
  setUsersInDatabase(@Positive() num: number): void {
    this.users = num;
  }
}

function Positive() {
  return (
    target: Object, // Целевой объект
    propertyKey: string | symbol, // Название метода, в котором находится параметр
    parameterIndex: number // Порядковый номер параметра(индекс)
  ) => {
    /**
     * Можем получить всю типизацию в рантайме.
     * Reflect.getOwnMetadata - метод, который позволяет получить метаданные
     * Первым параметром передается ключ, по которому мы хотим получить метаданные
     * или установить их
     * Вторым параметром передается объект, к которому относится метаданные
     * Третьим параметром передается название метода, в котором находится параметр
     *
     */
    /**
     * [Function: Function] - потому что метод setUsersInDatabase является функцией
     */
    console.log(Reflect.getOwnMetadata("design:type", target, propertyKey));

    /**
     * [ [Function: Number] ] - потому что параметр num является числом
     */
    console.log(
      Reflect.getOwnMetadata("design:paramtypes", target, propertyKey)
    );

    /**
     * undefined - потому что метод setUsersInDatabase ничего не возвращает
     */
    console.log(
      Reflect.getOwnMetadata("design:returntype", target, propertyKey)
    );

    /**
     * После того, как отработает декоратор Positive,
     * у нас появится метаданные на POSITIVE_METADATA_KEY ключе
     * в котором будут храниться индексы параметров,
     * которые были помечены декоратором Positive
     * То есть к существующим параметрам функции setUsersInDatabase
     * В таргете, в свойстве propertyKey, появится уникальный ключ
     * POSITIVE_METADATA_KEY с существующими параметрами.
     */
    let existParams: number[] =
      Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || [];

    existParams.push(parameterIndex);

    Reflect.defineMetadata(
      POSITIVE_METADATA_KEY,
      existParams,
      target,
      propertyKey
    );
  };
}

/**
 * За счет двух декораторов смогли сделать универсальный инструмент,
 * который валидирует данные, передаваемые в метод в рамках рантайма.
 */
function Validate() {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ) => {
    let method = descriptor.value;
    descriptor.value = function (...args: any) {
      let positiveParams: number[] = Reflect.getOwnMetadata(
        POSITIVE_METADATA_KEY,
        target,
        propertyKey
      );

      if (positiveParams) {
        for (let index of positiveParams) {
          if (args[index] <= 0) {
            throw new Error("Parameter is not positive");
          }
        }
      }
      /**
       * Если валидация пройдена, то применяем метод класса
       */
      return method?.apply(this, args);
    };
  };
}

const userService = new UserService();
console.log("userService", userService.setUsersInDatabase(10));
