interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

class UserService implements IUserService {
  users: number;

  @Catch({ rethrow: true })
  getUsersInDataBase(): number {
    throw new Error("Error");
  }
}

function Catch({ rethrow }: { rethrow: boolean } = { rethrow: false }) {
  return (
    target: Object,
    _: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ) => {
    const method = descriptor.value;
    descriptor.value = async (...args: any[]) => {
      try {
        /**
         * Если нет ошибки, то просто вызываем дефолтный метод
         * apply - вызывает функцию с указанным контекстом и аргументами
         * target - это объект, к которому применяется метод
         */
        return await method?.apply(target, args);
      } catch (error) {
        if (error instanceof Error) {
          console.log("ERROR==>", error.message);
          if (rethrow) {
            throw error;
          }
        }
      }
    };
  };
}

console.log(new UserService().getUsersInDataBase());
