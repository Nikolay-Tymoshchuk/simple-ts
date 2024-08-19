interface IProvider {
  sendMessage(message: string): void;
  connect(config: unknown): void;
  disconnect(): void;
}

class TelegramProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(`Telegram: ${message}`);
  }
  connect(config: string) {
    console.log(`Telegram connected with ${JSON.stringify(config)}`);
  }
  disconnect() {
    console.log(`Telegram disconnected`);
  }
}

class WhatsUpProvider implements IProvider {
  /**
   * В каждом классе есть своя реализация методов интерфейса
   * и взаимодействия с API. Все это спрятано за IProvider,
   * который через мост будет прокинут в управляющий компонент.
   */
  sendMessage(message: string): void {
    console.log(`WhatsUp: ${message}`);
  }
  connect(config: string) {
    console.log(`WhatsUp connected with ${JSON.stringify(config)}`);
  }
  disconnect() {
    console.log(`WhatsUp disconnected`);
  }
}

class NotificationSender {
  constructor(private provider: IProvider) {}

  send() {
    this.provider.connect("config");
    this.provider.sendMessage("message");
    this.provider.disconnect();
  }
}

/**
 * Если мы хотим реализовать отложенную отправку сообщения,
 * то нам не нужно менять код выше, а просто создать новый
 * класс, который расширяет NotificationSender.
 */

class DelayNotificationSender extends NotificationSender {
  constructor(provider: IProvider) {
    super(provider);
  }

  sendDelayed() {
    setTimeout(() => {
      super.send();
    }, 1000);
  }
}

const sender = new NotificationSender(new TelegramProvider());
sender.send();

const sender2 = new DelayNotificationSender(new WhatsUpProvider());
sender2.sendDelayed();
