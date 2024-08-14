class MyMap {
  private static instance: MyMap;

  map: Map<string, string> = new Map();

  private constructor() {}

  clean() {
    this.map = new Map();
  }

  /**
   * Основная логика реализации синглтона в этом методе.
   * Если объект еще не создан, то создаем его и сохраняем
   * в статическом поле instance.
   * В ином случае возвращаем объект из статического поля.
   */
  public static get() {
    if (!MyMap.instance) {
      MyMap.instance = new MyMap();
    }
    return MyMap.instance;
  }
}

class Service1 {
  addMap(key: string, value: string) {
    const myMap = MyMap.get();
    myMap.map.set(key, value);
  }
}

class Service2 {
  getValue(key: string) {
    const myMap = MyMap.get();
    console.log(" myMap.map.get(key);", myMap.map.get(key));
    myMap.clean();
    console.log(" myMap.map.get(key);", myMap.map.get(key));
  }
}

new Service1().addMap("key", "Work");
new Service2().getValue("key");
