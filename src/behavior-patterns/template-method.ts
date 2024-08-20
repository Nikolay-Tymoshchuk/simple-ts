//Template method

class Form {
  constructor(public name: string) {}
}

abstract class SaveForm<T> {
  /**
   * Шаблонный метод, который запускает алгоритм сохранения формы.
   * Реализация конкретного шага алгоритма делегируется дочерним классам.
   */
  public save(form: Form): void {
    const res = this.fill(form);
    this.log(res);
    this.send(res);
  }

  protected abstract fill(form: Form): T;

  protected log(data: T): void {
    console.log(data);
  }

  protected abstract send(data: T): void;
}

class FirstAPI extends SaveForm<string> {
  protected fill(form: Form): string {
    return form.name;
  }

  protected send(data: string): void {
    console.log(`Send data from first API: ${data}`);
  }
}

class SecondAPI extends SaveForm<number> {
  protected fill(form: Form): number {
    return form.name.length;
  }

  protected send(data: number): void {
    console.log(`Send data from second API: ${data}`);
  }
}

const form1 = new FirstAPI();
const form2 = new SecondAPI();

form1.save(new Form("First form"));
form2.save(new Form("Second form"));
