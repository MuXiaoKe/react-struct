import React, { Suspense } from 'react';
import _ from 'lodash';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LoadingPage from '@src/components/LoadingPage';
import routes from './config';
// import { appStores } from '@store/index';
// const { globalStore } = appStores();
// const { userInfo } = globalStore;
const renderRoutes = (routes: any[]) => {
    if (!Array.isArray(routes)) {
        return null;
    }

    return (
        <Switch>
            {routes.map((route, index) => {
                if (route.redirect) {
                    return (
                        <Redirect
                            key={route.path || index}
                            exact={route.exact}
                            strict={route.strict}
                            from={route.path}
                            to={route.redirect}
                        />
                    );
                }
                return (
                    <Route
                        key={route.path || index}
                        path={route.path}
                        exact={route.exact}
                        strict={route.strict}
                        render={() => {
                            // 递归渲染子路由
                            const renderChildRoutes = renderRoutes(route.children);
                            // 本身有组件则渲染组件
                            if (route.component) {
                                return (
                                    <Suspense fallback={<LoadingPage />}>
                                        <route.component route={route}>
                                            {renderChildRoutes}
                                        </route.component>
                                    </Suspense>
                                );
                            }
                            return renderChildRoutes;
                        }}
                    />
                );
            })}
        </Switch>
    );
};
// 路由的格式化
const buildRouter = (): any[] => {
    // let { authCodes } = userInfo;
    // authCodes = authCodes.slice() || [];
    const _routes = _.cloneDeep(routes);
    // const newRouter: object[] = [];
    const hasChid = (obj): boolean => {
        return obj.hasOwnProperty('children') && obj.children.length > 0;
    };
    const hasRedirect = (obj): boolean => {
        return obj.hasOwnProperty('needRedirect') && obj.needRedirect === true;
    };
    // 没有authcode 或者 不等于-1
    // const hasAauth = (obj): boolean => {
    //     return !obj.hasOwnProperty('authCode') || authCodes.indexOf(String(obj.authCode)) !== -1;
    // };
    // 遍历路由列表
    const pushArray = (list) => {
        list.forEach((item) => {
            // item router
            const router = { ...item };
            // 有子路由
            if (hasChid(router)) {
                // 有子路由的时候其本身的地址 会重定向到第一个子路由
                // router.redirect = `${router.children[0].path}`;
                // 有跳转
                if (hasRedirect(router)) {
                    const _itemRoutes = _.cloneDeep(router.children[0]);
                    _itemRoutes.redirect = _itemRoutes.path;
                    _itemRoutes.path = router.path;
                    _itemRoutes.exact = true;

                    router.children.unshift(_itemRoutes);
                }
                pushArray(router.children);
            }
            // 有权限访问的地址
            // if (hasAauth(router)) {
            //     newRouter.push(router);
            // }
        });
    };
    pushArray(_routes);
    return _routes;
};
const AppRouter = () => {
    const _routes = buildRouter();
    return <Router>{renderRoutes(_routes)}</Router>;
};

export default AppRouter;
