//Observer pattern

/**
 * Интерфейс наблюдателя (подписчика)
 */
interface IObserver {
  update(subject: ISubject): void;
}

/**
 * Интерфейс субъекта (издателя), эмиттера событий
 */
interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}

/**
 * Класс, который будет передаваться в качестве аргумента при уведомлении подписчиков
 */
class Lead {
  constructor(public name: string, public phone: string) {}
}

/**
 * Конкретный наблюдатель
 */
class NewLead implements ISubject {
  private observers: IObserver[] = [];
  public state: Lead;

  attach(observer: IObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
  detach(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

/**
 * Конкретные подписчики
 */

class SalesDepartment implements IObserver {
  update(subject: ISubject): void {
    console.log(`Sales department is notified about new lead: ${subject}`);
  }
}

class MarketingDepartment implements IObserver {
  update(subject: ISubject): void {
    console.log(`Marketing department is notified about new lead: ${subject}`);
  }
}

const subject = new NewLead();
subject.state = new Lead("John Doe", "+1234567890");
const s1 = new SalesDepartment();
const s2 = new MarketingDepartment();

subject.attach(s1);
subject.attach(s2);
subject.notify();
subject.detach(s2);
subject.notify();
