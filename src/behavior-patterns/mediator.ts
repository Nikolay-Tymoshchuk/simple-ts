//Mediator pattern

/**
 * Интерфейс Посредника предоставляет метод, используемый компонентами для
 * уведомления посредника о различных событиях. Посредник может реагировать на
 * эти события и передавать исполнение другим компонентам.
 */
interface Mediator {
  notify(sender: object, event: string): void;
}

/**
 * Базовый Компонент обеспечивает базовую функциональность хранения экземпляра
 * посредника внутри объектов компонентов.
 */
abstract class Mediated {
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
    this.mediator = mediator!;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

/**
 * Конкретные Компоненты реализуют различную функциональность. Они не зависят от
 * других компонентов. Они также не зависят от каких-либо конкретных классов
 * посредников.
 */
class Notifications extends Mediated {
  sendA() {
    console.log("component Notifications does Send A");
    this.mediator.notify(this, "Send A");
  }
  sendB() {
    console.log("component Notifications does Send B");
    this.mediator.notify(this, "Sent B");
  }
}

class Logger extends Mediated {
  logA() {
    console.log("component Logger does Log A");
    this.mediator.notify(this, "Log A");
  }
  logB() {
    console.log("component Logger does Log B");
    this.mediator.notify(this, "Log B");
  }
}

class EventHandler extends Mediated {
  meEventA() {
    console.log("component EventHandler does Event A");
    this.mediator.notify(this, "Event A");
  }
  myEventB() {
    console.log("component EventHandler does Event B");
    this.mediator.notify(this, "Event B");
  }
}

/**
 * Конкретные Посредники реализуют совместное поведение, координируя отдельные
 * компоненты.
 */
class NotificationMediator implements Mediator {
  constructor(
    public notifications: Notifications,
    public logger: Logger,
    public handler: EventHandler
  ) {
    notifications.setMediator(this);
    logger.setMediator(this);
    handler.setMediator(this);
  }

  notify(_: object, event: string) {
    switch (event) {
      case "Send A":
        console.log("Mediator reacts on Send A");
        break;
      case "Send B":
        console.log("Mediator reacts on Send A");
        break;
      case "Log A":
        console.log("Mediator reacts on Log A");
        break;
      case "Log B":
        console.log("Mediator reacts on Log B");
        break;
      case "Event A":
        console.log("Mediator reacts on Event A");
        break;
      case "Event B":
        console.log("Mediator reacts on Event A");
        break;
      default:
        console.log("Unknown event");
        break;
    }
  }
}

const handler = new EventHandler();
const logger = new Logger();
const notifications = new Notifications();

new NotificationMediator(notifications, logger, handler);

handler.meEventA();
