import { PotterState } from "potter-nf";
import PotterRepositoryBase from "./PotterRepositoryBase";

export default abstract class PotterLogicBase<
  TRepository extends PotterRepositoryBase,
  TModel
> extends PotterState<TRepository, TModel> {
  protected async runAsync<TResult>(args: {
    fn: () => Promise<TResult>;
  }): Promise<TResult> {
    try {
      this.context.repository.busy = true;
      this.potter.pushToRepository({});

      return await args.fn();
    } finally {
      this.context.repository.busy = false;
      this.potter.pushToRepository({});
    }
  }
}
