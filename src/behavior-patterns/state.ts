// State pattern

class DocumentItem {
  public text: string;
  private state: DocumentItemState;

  constructor() {
    this.setState(new DraftDocumentItemState());
  }

  getState() {
    return this.state;
  }

  setState(state: DocumentItemState) {
    this.state = state;
    /**
     * Привязываем контекст к стейту, потому что DocumentItemState не знает о DocumentItem,
     * в котором он находится и не может взаимодействовать с ним напрямую
     */
    this.state.setContext(this);
  }

  /**
   * Логика стейта вынесена в отдельные классы, что позволяет легко добавлять новые состояния
   * и избегать многочисленных if-else конструкций
   */

  publishDoc() {
    this.state.publish();
  }

  deleteDoc() {
    this.state.delete();
  }
}

/**
 * Абстрактный класс состояния
 */

abstract class DocumentItemState {
  public name: string;
  public item: DocumentItem;

  public setContext(item: DocumentItem) {
    this.item = item;
  }

  public abstract publish(): void;
  public abstract delete(): void;
}

/**
 * Конкретные состояния
 */
class DraftDocumentItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = "DraftDocument";
  }

  public publish(): void {
    console.log("Publishing document");

    this.item.setState(new PublishDocumentItemState());
  }

  public delete(): void {
    console.log("Deleting document");
  }
}

class PublishDocumentItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = "PublishDocument";
  }

  public publish(): void {
    console.log("Document is already published");
  }

  public delete(): void {
    console.log("Deleting document");
    this.item.setState(new DraftDocumentItemState());
  }
}

const item = new DocumentItem();
item.text = "Some text";
console.log(item.getState()); // DraftDocument
item.publishDoc();
console.log(item.getState()); // PublishDocument
item.deleteDoc();
console.log(item.getState()); // DraftDocument
