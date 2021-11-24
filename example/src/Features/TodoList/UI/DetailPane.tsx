import { ReactElement } from "react";
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
export default class DetailPane extends PotterChildComponent<
  TodoListRepository,
  TodoModel,
  TodoListLogic,
  IProps
> {
  onRender() {
    return (
      <>
        <div style={{ fontSize: "21px", fontWeight: "bold" }}>Edit Todo</div>
        {this.model.id ? this.todoComponent : this.nothingSelectedComponent}
      </>
    );
  }

  get nothingSelectedComponent(): ReactElement {
    return (
      <>
        No todo selected for editing. Click edit on the pane to the left to
        begin.
      </>
    );
  }

  get todoComponent(): ReactElement {
    return (
      <table>
        <tr>
          <td>
            <input type="text" value={this.model.displayLabel} />
          </td>
        </tr>
      </table>
    );
  }
}
