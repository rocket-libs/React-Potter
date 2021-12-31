import { PotterState } from "potter-nf";
import { PotterRepositoryBase } from "..";
import AdhocPotter from "./AdhocPotter";

export default interface IPotterChildComponentProps<
  TRepository extends PotterRepositoryBase,
  TModel,
  TLogic extends PotterState<TRepository, TModel>
> {
  potter: AdhocPotter<TRepository, TModel, TLogic>;
}