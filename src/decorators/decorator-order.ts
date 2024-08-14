function Uni(name: string): any {
  console.log(`Initialization ${name}`);
  return function () {
    console.log(`Call ${name}`);
  };
}

@Uni("Класса")
class MyClass {
  @Uni("Property")
  props?: any;

  @Uni("Static Property")
  static props2?: any;

  @Uni("Method")
  method(@Uni("Parameter") _: any) {}

  @Uni("Static method")
  static method2(@Uni("Static Method Parameter") _: any) {}

  constructor(@Uni("Constructor Parameter") _: any) {}
}

/**
 * Result:
 * Инициализация Свойства
 * Вызов Свойства
 * Инициализация Метода
 * Инициализация Параметра
 * Вызов Параметра
 * Вызов Метода
 * Инициализация Статического Свойства
 * Вызов Статического Свойства
 * Инициализация Статического Метода
 * Инициализация Статического Метода Параметра
 * Вызов Статического Метода Параметра
 * Вызов Статического Метода
 * Инициализация Класса
 * Инициализация Параметра Конструктора
 * Вызов Параметра Конструктора
 * Вызов Класса
 */
