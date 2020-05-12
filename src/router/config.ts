import { lazy } from 'react';

import BasicLayout from '@src/layouts/BasicLayout';
import BlankLayout from '@src/layouts/BlankLayout';
import SecurityLayout from '@src/layouts/SecurityLayout';

// import { BASE_URL } from '../constants/index';
export const breadcrumbRoutes = [
    {
        path: '/home',
        name: 'home主页',
        breadcrumbName: '首页',
        icon: 'iconshouye',
        component: lazy(() => import('@src/pages/Home/index'))
    },
    {
        path: '/404',
        name: '404',
        exact: true,
        breadcrumbName: '错误页',
        component: lazy(() => import('@src/pages/Exception/404'))
    },
    {
        path: '/table',
        name: '测试页111',
        breadcrumbName: '测试页',
        icon: 'iconxitongguanli',
        component: lazy(() => import('@src/pages/Table/index'))
    },
    {
        path: '/decive',
        name: 'deciveManage',
        breadcrumbName: '设备运维',
        icon: 'iconxitongguanli',
        needRedirect: true,
        children: [
            {
                path: '/decive/product',
                name: 'product',
                breadcrumbName: '产品',
                icon: 'iconxitongguanli',
                component: lazy(() => import('@src/pages/deciveManage/product'))
            }
        ]
    }
];
const routes = [
    {
        path: '/',
        component: BlankLayout, // 空白页布局
        breadcrumbName: '',
        children: [
            {
                path: '/',
                component: SecurityLayout,
                children: [
                    {
                        path: '/login', // 路由路径
                        name: '登录页', // 菜单名称 (不设置,则不展示在菜单栏中）
                        exact: true,
                        component: lazy(() => import('@src/pages/Login')) // 懒加载 路由组件
                    },
                    // 子菜单路由
                    {
                        path: '/',
                        component: BasicLayout, // 基本布局
                        breadcrumbName: '',
                        children: [
                            ...breadcrumbRoutes,
                            { path: '/', exact: true, redirect: '/home', breadcrumbName: 'home' },
                            { path: '*', exact: true, redirect: '/404', breadcrumbName: '404' }
                        ]
                    }
                ]
            }
        ]
    }
];
export default routes;
