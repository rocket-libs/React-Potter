import TodoListRepository from "./TodoListRepository";
import { PotterLogicBase } from "react-potter";
import TodoModel from "../../Todo/Potter/TodoModel";

export default class TodoListLogic extends PotterLogicBase<
  TodoListRepository,
  TodoModel
> {}
