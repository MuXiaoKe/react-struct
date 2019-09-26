import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./index.css";
import { App } from './app';

ReactDOM.render(<App />, document.getElementById('app') as HTMLElement);

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept();
}
