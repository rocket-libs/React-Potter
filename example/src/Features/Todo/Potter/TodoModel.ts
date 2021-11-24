export default class TodoModel {
  displayLabel: string;
  status: string = "Pending";
  addedDate: Date = new Date();
  id: number = 0;

  constructor(displayLabel: string = "") {
    this.displayLabel = displayLabel;
  }
}
