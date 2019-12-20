import React from 'react';
import '../../http/config';
import { Breadcrumb } from 'antd';
import routes from '../../router/config';
import {Link} from "react-router-dom";
function itemRender (route: any, params:any, routes:any[], paths:string[])  {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
}
const Zbreadcrumb = () => {
    return <Breadcrumb style={{ margin: '16px 0' }} itemRender={itemRender} routes={routes} />;
};
export default Zbreadcrumb;
