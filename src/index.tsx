import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./index.css";
import AppRouter from './router';

const RenderDom = () => (
    <AppRouter />
)

ReactDOM.render(<RenderDom />, document.getElementById('app') as HTMLElement);

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept();
}
