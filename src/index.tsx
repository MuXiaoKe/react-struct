import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import AppRouter from './router';

const App = () => (
    <ConfigProvider locale={zhCN}>
        <AppRouter />
    </ConfigProvider>
);
ReactDOM.render(<App />, document.getElementById('app') as HTMLElement);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}
