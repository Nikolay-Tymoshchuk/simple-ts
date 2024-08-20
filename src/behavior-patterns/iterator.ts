//Iterator pattern

class Task {
  constructor(public priority: number) {}
}

class TaskList {
  private tasks: Task[] = [];

  // Сортировка по приоритету. Дальше могут быть другие методы сортировки
  public sortBuPriority() {
    this.tasks = this.tasks.sort((a, b) => {
      if (a.priority < b.priority) {
        return 1;
      } else if (a.priority > b.priority) {
        return -1;
      }
      return 0;
    });
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  getTasks() {
    return this.tasks;
  }

  public count() {
    return this.tasks.length;
  }

  /**
   * Получение итератора, с помощью которого можно будет проходить по списку задач
   * @returns IIterator<Task>
   */
  public getIterator() {
    return new PriorityTaskIterator(this);
  }
}

/**
 * Объявляем общий интерфейс итератора
 */

interface IIterator<T> {
  getAll(): T[];
  current(): T | undefined;
  next(): T | undefined;
  prev(): T | undefined;
  index(): number;
}

/**
 * Реализация итератора сортировки по приоритету для списка задач
 */
class PriorityTaskIterator implements IIterator<Task> {
  private taskList: TaskList;
  private position: number = 0;

  constructor(taskList: TaskList) {
    taskList.sortBuPriority();
    this.taskList = taskList;
  }

  getAll(): Task[] {
    return this.taskList.getTasks();
  }

  current(): Task | undefined {
    return this.taskList.getTasks()[this.position];
  }

  next(): Task | undefined {
    return this.taskList.getTasks()[(this.position += 1)];
  }

  prev(): Task | undefined {
    return this.taskList.getTasks()[(this.position -= 1)];
  }

  index(): number {
    return this.position;
  }
}

const taskList = new TaskList();
taskList.addTask(new Task(8));
taskList.addTask(new Task(1));
taskList.addTask(new Task(3));
const iterator = taskList.getIterator();
console.log(iterator.getAll()); // [ Task { priority: 8 }, Task { priority: 3 }, Task { priority: 1 } ]
console.log(iterator.current()); // Task { priority: 8 }
console.log(iterator.next()); // Task { priority: 3 }
console.log(iterator.next()); // Task { priority: 1 }
console.log(iterator.prev()); // Task { priority: 3 }
console.log(iterator.index()); // 1
