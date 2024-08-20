//Command pattern
class User {
  constructor(public userId: number) {}
}

class CommandHistory {
  public commands: Command[] = [];
  push(command: Command) {
    this.commands.push(command);
  }
  remove(command: Command) {
    this.commands = this.commands.filter(
      (c) => c.commandId !== command.commandId
    );
  }
}

/**
 * Абстрактная команда, которая имеет свою логику
 */
abstract class Command {
  /**
   * Идентификатор команды
   */
  public commandId: number;

  /**
   * Обязательный метод для выполнения команды. Сценарий выполнения команды.
   */
  public abstract execute(): void;

  /**
   * Ссылка на историю команд
   */
  constructor(public history: CommandHistory) {
    this.commandId = Math.floor(Math.random() * 1000);
  }
}

/**
 * Конкретная команда, которая реализует логику, прописанную в абстрактной команде
 * В данном случае, добавление пользователя. А так же дополнительную логику отмены действия
 */
class AddUserCommand extends Command {
  constructor(
    private user: User,
    private receiver: UserService,
    history: CommandHistory
  ) {
    super(history);
  }

  execute() {
    this.receiver.saveUser(this.user);
    this.history.push(this);
  }

  undo() {
    this.receiver.deleteUser(this.user.userId);
    this.history.remove(this);
  }
}

class UserService {
  saveUser(user: User) {
    console.log(`User ${user.userId} saved`);
  }

  deleteUser(userId: number) {
    console.log(`User ${userId} deleted`);
  }
}

class Controller {
  receiver: UserService;
  history: CommandHistory = new CommandHistory();

  addReceiver(receiver: UserService) {
    this.receiver = receiver;
  }

  run() {
    /**
     * Создаем команду добавления пользователя
     */
    const addUserCommand = new AddUserCommand(
      new User(1),
      this.receiver,
      this.history
    );
    addUserCommand.execute();
    console.log(addUserCommand.history);
    addUserCommand.undo();
    console.log(addUserCommand.history);
  }
}

const controller = new Controller();
controller.addReceiver(new UserService());
controller.run();
