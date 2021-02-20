import React, { Suspense } from 'react';
import _ from 'lodash';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LoadingPage from '@src/components/LoadingPage';
import routes, { IRoute, TRoutes } from './config';

import NoMatch from '@src/pages/exception/404';
import { appStores } from '@store/index';

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
            <Route component={NoMatch} />
        </Switch>
    );
};
// 路由的格式化
const buildRouter = (): TRoutes => {
    // const { globalStore } = appStores();
    // const { userInfo } = globalStore;
    let authCodes: any[] = [];
    // if (!!userInfo && !!userInfo.authCodes && Array.isArray(userInfo.authCodes)) {
    //     authCodes = userInfo?.authCodes?.slice();
    // }
    authCodes = JSON.parse(sessionStorage.getItem('AUTHS_CODE') || '[]');
    const _routes = _.cloneDeep(routes);
    const newRouter: TRoutes = [];
    // const hasChild = (obj: IRoute): boolean => {
    //     const _children = (Reflect.has(obj, 'children') ? obj?.children : []) as any[];
    //     return obj.hasOwnProperty('children') && _children.length > 0;
    // };
    const hasRedirect = (obj: IRoute): boolean => {
        return obj.hasOwnProperty('needRedirect') && obj.needRedirect === true;
    };
    // 没有authCode 全都可见或者 有权限
    const hasAuth = (obj: any): boolean => {
        return !obj.hasOwnProperty('code') || authCodes.indexOf(String(obj.code)) !== -1;
    };
    // 遍历路由列表
    const pushArray = (list: TRoutes) => {
        list.forEach((item, index) => {
            // item router
            const router = { ...item };
            // 有子路由
            if (router.children) {
                // 有子路由的时候其本身的地址 会重定向到第一个子路由
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
            // console.log(item.children, hasRedirect(item));
            // if (item.children) {
            //     if (hasRedirect(item)) {
            //         item.redirect = item.children[0].path;
            //         item.exact = true;
            //     }
            //     pushArray(item.children);
            // }
            // 有权限访问的地址
            if (hasAuth(router)) {
                newRouter.push(router);
                // list.splice(index, 1);
            } else {
                // list.splice(index, 1);
                // console.log(router, list, index);
            }
        });
    };
    pushArray(_routes);
    return _routes; //  newRouter
};
const AppRouter = () => {
    const _routes = buildRouter();
    // console.log('route', _routes, routes);
    return <Router>{renderRoutes(_routes)}</Router>;
};

export default AppRouter;
