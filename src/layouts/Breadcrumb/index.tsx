import React from 'react';
import '../../services/config';
import { Breadcrumb } from 'antd';
import routes from '../../router/config';
import { Link } from 'react-router-dom';
// eslint-disable-next-line max-params
function itemRender(route: any, params: any, routes: any[], paths: string[]) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>;
}
const Zbreadcrumb = () => {
    return <Breadcrumb itemRender={itemRender} routes={routes} />;
};
export default Zbreadcrumb;
