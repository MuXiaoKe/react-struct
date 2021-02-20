import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'antd/dist/antd.less';
import '@src/style/_scrollbar.scss';
import '@src/style/global.scss';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

// import { SWRConfig } from 'swr'; // swr请求库得全局配置
// import request from './utils/http';
import AppRouter from './router';
// https://github.com/mobxjs/mobx-react-lite/#observer-batching
import 'mobx-react-lite/batchingForReactDom';
// ahooks 得全局配置
import { UseRequestProvider } from 'ahooks';

import { IntlProvider } from 'react-intl';
import zh_CN from '@assets/locale/zh_CN';
import errorHandler from '@utils/httpError';
const App = () => (
    <UseRequestProvider
        value={{
            // refreshOnWindowFocus: true,
            throwOnError: true,
            onError: (error: any) => {
                // message.error(error.msg);
                errorHandler(error);
            }
        }}
    >
        <ConfigProvider locale={zhCN}>
            <IntlProvider locale="zh" messages={zh_CN}>
                <AppRouter />
            </IntlProvider>
        </ConfigProvider>
    </UseRequestProvider>
);
ReactDOM.render(<App />, document.getElementById('app') as HTMLElement);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}
