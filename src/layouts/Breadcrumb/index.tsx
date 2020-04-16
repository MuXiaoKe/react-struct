import React from 'react';
import '../../services/config';
import { Breadcrumb } from 'antd';
import { breadcrumbRoutes } from '../../router/config';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line max-params
function itemRender(route: any, params: any, routes: any[], paths: string[]) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>;
}
function getRoutes(path: string): any[] {
    const url = path?.replace('#', '');
    const newRouter: object[] = [];
    const hasIndex = (obj): boolean => {
        const curPath = '/' + obj.path.split('/:')[0];
        return url.includes(curPath); // TODO incluedes会有bug，如果url有部分字段和path相同会返回true
    };
    const pushArray = (list) => {
        list.forEach((item, index) => {
            const router = { ...item };
            if (hasIndex(router)) {
                newRouter.push(router);
                pushArray(router.children || []);
            }
        });
    };
    pushArray(breadcrumbRoutes);
    return newRouter;
}

const Zbreadcrumb = () => {
    let location = useLocation();
    const _breadcrumbRoutes = getRoutes(location.pathname);
    return <Breadcrumb itemRender={itemRender} routes={_breadcrumbRoutes} />;
};
export default Zbreadcrumb;
