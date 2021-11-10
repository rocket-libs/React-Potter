import Potter, { PotterState } from "potter-nf";

export default class AdhocPotter<
  TRepository,
  TModel,
  TLogic extends PotterState<TRepository, TModel>
> extends Potter<TRepository, TModel, TLogic> {}

function getAdhocPotter<
  TRepository,
  TModel,
  TLogic extends PotterState<TRepository, TModel>
>(
  repository: TRepository,
  model: TModel,
  newLogic: () => TLogic
): AdhocPotter<TRepository, TModel, TLogic> {
  const logic = newLogic();
  const adhocPotter = new AdhocPotter(repository, model, logic);
  logic.potter = adhocPotter;

  return adhocPotter;
}

export { getAdhocPotter };
