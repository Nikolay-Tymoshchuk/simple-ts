interface IPaymentApi {
  getPaymentDetails(id: number): IPaymentDetail | undefined;
}

interface IPaymentDetail {
  id: number;
  sum: number;
}

class PaymentAPI implements IPaymentApi {
  private data = [
    { id: 1, sum: 100 },
    { id: 2, sum: 200 },
  ];

  getPaymentDetails(id: number): IPaymentDetail | undefined {
    return this.data.find((item) => item.id === id);
  }
}
/**
 * В данном случае мы создаем прокси, который будет проверять доступ к данным.
 * Если пользователь с id 1, то он получит доступ к данным, иначе - нет.
 */
class PaymentAccessProxy implements IPaymentApi {
  constructor(private api: PaymentAPI, private userId: number) {}

  getPaymentDetails(id: number): IPaymentDetail | undefined {
    if (this.userId === 1) {
      return this.api.getPaymentDetails(id);
    }
    console.log("Access denied");
    return undefined;
  }
}

const proxy = new PaymentAccessProxy(new PaymentAPI(), 1);
console.log(proxy.getPaymentDetails(1));

const proxy2 = new PaymentAccessProxy(new PaymentAPI(), 2);
console.log(proxy2.getPaymentDetails(1));
