class Notify {
  send(template: string, to: string) {
    console.log(`Send ${template} to ${to}`);
  }
}

class Log {
  log(message: string) {
    console.log(message);
  }
}

class Template {
  private templates = [
    { name: "template1", template: "<h1>Template1!</h1>" },
    { name: "template2", template: "<h1>Template2!</h1>" },
  ];

  getByName(name: string) {
    return this.templates.find((t) => t.name === name);
  }
}
/**
 * Реализация фасада. На выходе мы имеем один метод,
 * который делает всю работу и нам не нужно знать о том,
 * какая логика внутри.
 */
class NotificationFacade {
  private notify: Notify;
  private logger: Log;
  private template: Template;

  constructor() {
    this.notify = new Notify();
    this.logger = new Log();
    this.template = new Template();
  }

  send(to: string, templateName: string) {
    const data = this.template.getByName(templateName);
    if (!data) {
      this.logger.log("Template not found");
      return;
    }
    this.notify.send(data.template, to);
    this.logger.log("Message sent");
  }
}

const a = new NotificationFacade();
a.send("user1", "template1");
