interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

class UserService implements IUserService {
  users: number;

  getUsersInDataBase(): number {
    throw this.users;
  }

  setUsersInDatabase(@Positive() num: number, @Positive() num2: number): void {
    this.users = num;
  }
}

function Positive() {
  return (
    target: Object, // Целевой объект
    propertyKey: string | symbol, // Название метода, в котором находится параметр
    parameterIndex: number // Порядковый номер параметра(индекс)
  ) => {
    console.log("target", target);
    console.log("propertyKey", propertyKey);
    console.log("parameterIndex", parameterIndex);
  };
}

const userService = new UserService();
userService.users = 10;
console.log("userService", userService.users);
