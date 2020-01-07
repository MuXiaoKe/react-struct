import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./index.css";
import 'antd/dist/antd.css';
import AppRouter from './router';
ReactDOM.render(<AppRouter />, document.getElementById('app') as HTMLElement);

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept();
}
