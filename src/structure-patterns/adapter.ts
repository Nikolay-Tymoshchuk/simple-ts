class KVDatabase {
  private db: Map<string, string> = new Map();

  save(key: string, value: string) {
    this.db.set(key, value);
  }
}

class PersistentDB {
  savePersistent(data: Object) {
    console.log(data);
  }
}

/**
 * Ключевая идея адаптера - преобразовать интерфейс одного класса в интерфейс другого.
 * Экстендим тот интерфейс, к которому хотим сделать адаптер.
 * В качестве параметра принимаем объект, который хотим адаптировать.
 */
class PersistentDBAdapter extends KVDatabase {
  constructor(public database: PersistentDB) {
    super();
  }

  override save(key: string, value: string) {
    this.database.savePersistent({ key, value });
  }
}

function run(base: KVDatabase) {
  base.save("key", "value");
}

run(new PersistentDBAdapter(new PersistentDB()));
