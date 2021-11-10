import React, { useState, useEffect, ReactElement } from "react";
import Potter, { PotterState } from "potter-nf";
import { useHistory } from "react-router-dom";

interface IProps<
  TRepository,
  TModel,
  TState extends PotterState<TRepository, TModel>,
  TPotter extends Potter<TRepository, TModel, TState>
> {
  currentPotter: TPotter;
  newPotter: TPotter;
  onStarted: (potter: TPotter) => void;
  onExiting?: () => void;
  onRender: () => ReactElement;
  loadingDisplayLabel: string;
  loadingElement?: ReactElement;
  history: any | undefined;
  rerenderValue?: any;
}

let unlistenToRouteChanged: any;

export default function PotterUiBinder<
  TRepository,
  TModel,
  TState extends PotterState<TRepository, TModel>,
  TPotter extends Potter<TRepository, TModel, TState>
>(props: IProps<TRepository, TModel, TState, TPotter>) {
  const initialPotterId = 0;

  const [potterChangeId, setPotterChangeId] = useState(initialPotterId);
  const [jsxElement, setJsxElement] = useState(
    props.loadingElement ? (
      props.loadingElement
    ) : (
      <>{props.loadingDisplayLabel}</>
    )
  );
  const [started, setStarted] = useState(false);
  const [addedExitListener, setAddedExitListener] = useState(false);

  const potterInstance = props.currentPotter ?? props.newPotter;
  const history = useHistory();
  if (history && props.onExiting && !addedExitListener) {
    setAddedExitListener(true);
    unlistenToRouteChanged = history.listen((_location, _action) => {
      if (props.onExiting) {
        unlistenToRouteChanged();
        props.onExiting();
      }
    });
  }

  useEffect(
    () => {
      const initializePotter = (): (() => void) => {
        const potterCleanup = potterInstance.subscribe(() =>
          setPotterChangeId(potterInstance.context.changeId)
        );

        return function cleanup() {
          potterCleanup();
        };
      };
      if (props.onRender && started === true) {
        setJsxElement(props.onRender());
      }
      return initializePotter();
    },
    // eslint-disable-next-line
    [potterChangeId, props.rerenderValue]
  );
  if (!started) {
    setStarted(true);
    props.onStarted(potterInstance);
    potterInstance.broadcastContextChanged();
  }
  return jsxElement;
}
