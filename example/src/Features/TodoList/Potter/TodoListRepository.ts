import { PotterRepositoryBase } from "react-potter";
import TodoModel from "../../Todo/Potter/TodoModel";

export default class TodoListRepository extends PotterRepositoryBase {
  allTodos: TodoModel[] = [
    new TodoModel("Build Awesome App"),
    new TodoModel("Get Lots Of Users"),
    new TodoModel("Profit 😊"),
  ];
}
