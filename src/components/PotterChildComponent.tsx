import { PotterState } from "potter-nf";
import React, { ReactElement } from "react";
import AdhocPotter from "./AdhocPotter";
import PotterRepositoryBase from "./PotterRepositoryBase";
import PotterUiBinder from "./PotterUiBinder";
import Pottery from "./Pottery";

export interface IPotterChildComponentProps<
  TRepository extends PotterRepositoryBase,
  TModel,
  TLogic extends PotterState<TRepository, TModel>
> {
  potter: AdhocPotter<TRepository, TModel, TLogic>;
}
export default abstract class PotterChildComponent<
  TRepository extends PotterRepositoryBase,
  TModel,
  TLogic extends PotterState<TRepository, TModel>,
  TProps extends IPotterChildComponentProps<TRepository, TModel, TLogic>
> extends React.PureComponent<TProps> {
  protected get repository(): TRepository {
    return this.pottery.repository;
  }
  protected get model(): TModel {
    return this.pottery.model;
  }
  protected get logic(): TLogic {
    return this.pottery.state;
  }

  protected potter: AdhocPotter<
    TRepository,
    TModel,
    TLogic
  > = {} as AdhocPotter<TRepository, TModel, TLogic>;
  protected get pottery(): Pottery<
    TRepository,
    TModel,
    TLogic,
    AdhocPotter<TRepository, TModel, TLogic>
  > {
    return new Pottery(this.potter);
  }

  protected abstract onRender(): ReactElement;

  protected pushToRepository(value: Partial<TRepository>) {
    this.potter.pushToRepository(value);
  }

  protected pushToModel(value: Partial<TModel>) {
    this.potter.pushToModel(value);
  }

  render() {
    this.potter = this.props.potter;
    return (
      <PotterUiBinder
        loadingDisplayLabel={""}
        currentPotter={this.potter}
        newPotter={this.potter}
        onStarted={(_) => {}}
        onRender={() => {
          return this.onRender();
        }}
        history={undefined}
      />
    );
  }
}
