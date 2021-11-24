import { ReactElement } from "react";
import { PotterComponent } from "react-potter";
import TodoListLogic from "../Potter/TodoListLogic";
import TodoListRepository from "../Potter/TodoListRepository";
import MasterPane from "./MasterPane";
import DetailPane from "./DetailPane";
import TodoModel from "../../Todo/Potter/TodoModel";

interface IProps {}
export default class TodoList extends PotterComponent<
  TodoListRepository,
  TodoModel,
  TodoListLogic,
  IProps
> {
  constructor() {
    //Initialize your potter structure
    super(new TodoListRepository(), new TodoModel(), new TodoListLogic());
  }

  /**
   * This method is called exactly once, when your component is first mounted.
   * This is a nice place to trigger initialization of your UI.
   */
  async onStartedAsync() {}

  /** Just like React's onRender, called very time your UI changes */
  onRender(): ReactElement {
    return (
      <table>
        <tr>
          <td>
            <MasterPane potter={this.potter} />
          </td>
          <td>
            <DetailPane
              potter={this.potter}
              key={this.getChildKeyFromObject(this.model)}
            />
          </td>
        </tr>
      </table>
    );
  }
}
