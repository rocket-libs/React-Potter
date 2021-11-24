import { PotterChildComponent } from "react-potter";
import { IPotterChildComponentProps } from "react-potter/build/components/PotterChildComponent";
import TodoModel from "../../Todo/Potter/TodoModel";

import TodoListLogic from "../Potter/TodoListLogic";
import TodoListRepository from "../Potter/TodoListRepository";

interface IProps
  extends IPotterChildComponentProps<
    TodoListRepository,
    TodoModel,
    TodoListLogic
  > {}
export default class MasterPane extends PotterChildComponent<
  TodoListRepository,
  TodoModel,
  TodoListLogic,
  IProps
> {
  onRender() {
    return (
      <div
        style={{
          borderRight: "solid 1px #DFDFDF",
          padding: "20px",
          marginRight: "40px",
        }}
      >
        <div style={{ fontSize: "21px", fontWeight: "bold" }}>Your Todos</div>
        <table>
          {this.repository.allTodos.map((todo, index) => {
            return (
              <tr key={index}>
                <td>
                  <input type="checkbox" checked={todo.status !== "Pending"} />
                </td>
                <td>{todo.displayLabel}</td>
                <td>
                  <input
                    type="button"
                    value="edit"
                    onClick={() => {
                      this.pushToModel(todo);
                    }}
                  />
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={3}>
              <hr />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input type="text" placeholder="Add A Todo"></input>
            </td>
            <td>
              <input type="button" value="Add"></input>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
