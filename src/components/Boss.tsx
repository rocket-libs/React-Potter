import React, { ReactElement } from "react";

interface IProps{
    name: string;
}

export default function Boss(props: IProps) : ReactElement{
    return <div>The boss is called {props.name}</div>
}