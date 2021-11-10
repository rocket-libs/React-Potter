import { PotterState } from "potter-nf";
import React, { ReactElement } from "react";
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
  /*private get pottery(): Pottery<
    TRepository,
    TModel,
    TLogic,
    AdhocPotter<TRepository, TModel, TLogic>
  > {
    return new Pottery(this.potter);
  }*/

  constructor(repository: TRepository, model: TModel, logic: TLogic) {
    super((undefined as unknown) as TProps);
    this.repository = repository;
    this.model = model;
    this.logic = logic;

    this.potter = new AdhocPotter(repository, model, logic);
  }

  protected abstract onRender(): ReactElement;

  protected abstract onStartedAsync(): Promise<void>;

  protected getChildKeyFromObject(obj: any): string {
    return JSON.stringify(obj);
  }
  protected getChildKey(dependancies: any[]): string {
    let key = "";
    for (const specificDependancy of dependancies) {
      key += specificDependancy;
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
        newPotter={new AdhocPotter(this.repository, this.model, this.logic)}
        onStarted={async (p: AdhocPotter<TRepository, TModel, TLogic>) => {
          this.potter = p;
          this.logic.potter = p;
          this.logic.context = p.context;
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