//Chain of Command Pattern
interface IMiddleware {
  next(mid: IMiddleware): IMiddleware;
  handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
  private nextMiddleware: IMiddleware;

  /**
   * Метод для установки следующего обработчика в цепочке вызовов.
   */
  next(mid: IMiddleware): IMiddleware {
    this.nextMiddleware = mid;
    return mid;
  }

  /**
   * Метод для обработки запроса.
   */
  handle(request: any): any {
    if (this.nextMiddleware) {
      return this.nextMiddleware.handle(request);
    }

    return;
  }
}

class AuthMiddleware extends AbstractMiddleware {
  override handle(request: any): any {
    console.log("Auth middleware");

    if (request.userId === 1) {
      return super.handle(request);
    }
    return { error: "Access denied" };
  }
}
class ValidateMiddleware extends AbstractMiddleware {
  override handle(request: any): any {
    console.log("ValidateMiddleware middleware");

    if (request.body) {
      return super.handle(request);
    }
    return { error: "Body is empty" };
  }
}

class Controller extends AbstractMiddleware {
  override handle(request: any): any {
    console.log("Controller");
    return { success: "Data is saved" };
  }
}

const controller = new Controller();
const validate = new ValidateMiddleware();
const auth = new AuthMiddleware();

auth.next(validate).next(controller);
console.log(auth.handle({ userId: 1, body: "data" }));
