import { PotterState } from "potter-nf";
import React, { ReactElement } from "react";
import { getAdhocPotter } from "./AdhocPotter";
import AdhocPotter from "./AdhocPotter";
import PotterRepositoryBase from "./PotterRepositoryBase";
import PotterUiBinder from "./PotterUiBinder";
//import Pottery from "./Pottery";

export default abstract class PotterComponent<
  TRepository extends PotterRepositoryBase,
  TModel,
  TLogic extends PotterState<TRepository, TModel>,
  TProps
> extends React.Component<TProps> {
  public repository: TRepository;
  public model: TModel;
  public logic: TLogic;
  public potter: AdhocPotter<TRepository, TModel, TLogic>;

  constructor(repository: TRepository, model: TModel, logic: TLogic) {
    super((undefined as unknown) as TProps);
    this.repository = repository;
    this.model = model;
    this.logic = logic;

    this.potter = getAdhocPotter(repository, model, () => logic);
  }

  protected abstract onRender(): ReactElement;

  protected onStartedAsync(): Promise<void> {
    return Promise.resolve();
  }

  protected getChildKeyFromObject(obj: any): string {
    return JSON.stringify(obj);
  }
  protected getChildKey(dependancies: any[]): string {
    let key = "";
    for (const specificDependancy of dependancies) {
      key += JSON.stringify(specificDependancy);
    }
    return key;
  }

  protected pushToRepository(value: Partial<TRepository>) {
    this.potter.pushToRepository(value);
  }

  protected pushToModel(value: Partial<TModel>) {
    this.potter.pushToModel(value);
  }

  render() {
    return (
      <PotterUiBinder
        loadingDisplayLabel={""}
        currentPotter={this.potter}
        newPotter={this.potter}
        onStarted={async (_: AdhocPotter<TRepository, TModel, TLogic>) => {
          this.logic.initialize(this.potter.context,this.potter);
          await this.onStartedAsync();
        }}
        onRender={() => {
          return this.onRender();
        }}
        history={undefined}
      />
    );
  }
}
