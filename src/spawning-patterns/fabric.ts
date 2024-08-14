/**
 * Общий интерфейс для всех фабрик
 */
interface IInsurance {
  id: number;
  status: string;
  setVehicle(vehicle: any): void;
  submit(): Promise<boolean>;
}

/**
 * Один из конкретных классов, имплементирующих интерфейс IInsurance
 */
class TFInsurance implements IInsurance {
  id: number;
  status: string;
  private vehicle: any;

  setVehicle(vehicle: any) {
    this.vehicle = vehicle;
  }

  async submit() {
    const res = await fetch("tf-address", {
      method: "POST",
      body: JSON.stringify({ vehicle: this.vehicle }),
    });
    const data = await res.json();
    return data.isSuccess;
  }
}

/**
 * Один из конкретных классов, имплементирующих интерфейс IInsurance
 */
class ABInsurance implements IInsurance {
  id: number;
  status: string;
  private vehicle: any;

  setVehicle(vehicle: any) {
    this.vehicle = vehicle;
  }

  async submit() {
    const res = await fetch("ab-address", {
      method: "POST",
      body: JSON.stringify({ vehicle: this.vehicle }),
    });
    const data = await res.json();
    return data.yes;
  }
}

/**
 * Абстрактная фабрика, от которой наследуются все конкретные фабрики.
 * Как видим, у нее есть абстрактный метод createInsurance,
 * который должен быть реализован во всех конкретных фабриках.
 * А так же есть набор готовых методов, который реализован в базовом классе.
 *
 * Необходимость абстрактной фабрики именно в наборе готовых методов
 */

abstract class InsuranceFactory {
  db: any;
  abstract createInsurance(): IInsurance;

  saveHistory(ins: IInsurance) {
    this.db.save(ins.id, ins.status);
  }
}

/**
 * Конкретная фабрика, создающая объекты класса TFInsurance
 */

class TFInsuranceFactory extends InsuranceFactory {
  createInsurance() {
    return new TFInsurance();
  }
}

class ABInsuranceFactory extends InsuranceFactory {
  createInsurance() {
    return new ABInsurance();
  }
}

const tfInsuranceFactory = new TFInsuranceFactory();
const ins = tfInsuranceFactory.createInsurance();

/**
 * методы как абстрактной фабрики, так и конкретной фабрики реализации
 */
tfInsuranceFactory.saveHistory(ins);

//LABEL: ========================Альтернативный способ реализации=====================

const INSURANCE_TYPE = {
  tf: TFInsurance,
  ab: ABInsurance,
};

type IT = typeof INSURANCE_TYPE;

class InsuranceFactoryAlt {
  db: any;

  createInsurance<T extends keyof IT>(type: T): IT[T] {
    return INSURANCE_TYPE[type];
  }

  saveHistory(ins: IInsurance) {
    this.db.save(ins.id, ins.status);
  }
}

const insuranceFactoryAlt = new InsuranceFactoryAlt();
const ins2 = new (insuranceFactoryAlt.createInsurance("tf"))();
insuranceFactoryAlt.saveHistory(ins2);
