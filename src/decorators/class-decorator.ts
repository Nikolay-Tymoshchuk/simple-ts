interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

/**
 * Порядок выполнения фабрики декораторов:
 * 1. Инициализация seUsers
 * 2. Инициализация setUsersAdvanced
 * 3. Выполнение setUsersAdvanced
 * 4. Выполнение seUsers
 */
@CreatedAt
@SetUsersAdvanced(100)
class UserService implements IUserService {
  users: number;

  getUsersInDataBase(): number {
    return this.users;
  }
}

/**
 * Плохая запись декоратора, так как сначала отработает декоратор,
 * а потом уже создастся экземпляр класса, и users будет равен 100,
 * хотя нам нужно, чтоб декоратор сделал его равным 0
 */
function nullUser(target: Function) {
  target.prototype.users = 0;
}

/**
 * Здесь будет работать правильно, так как с точки зрения типизации
 * мы заменили тип параметра с функции на конструируемый тип (new)
 * и возвращаем анонимный класс, который наследуется от конструктора
 */
function threeUser<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    users = 3;
  };
}

/**
 * Фабрика декораторов. Возвращает декоратор c параметром
 */
function SetUsers(users: number) {
  return (target: Function) => {
    target.prototype.users = users;
  };
}

function SetUsersAdvanced(users: number) {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
      users = users;
    };
  };
}

function CreatedAt<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdAt = new Date();
  };
}

type CreatedAtType = {
  createdAt: Date;
};

console.log((new UserService() as IUserService & CreatedAtType).createdAt);
