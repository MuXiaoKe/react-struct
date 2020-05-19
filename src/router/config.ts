import { lazy } from 'react';

import BasicLayout from '@src/layouts/BasicLayout';
import BlankLayout from '@src/layouts/BlankLayout';
import SecurityLayout from '@src/layouts/SecurityLayout';
export interface IRoute {
    path: string;
    name?: string;
    breadcrumbName?: string;
    icon?: string;
    component?: React.ReactNode;
    needRedirect?: boolean;
    redirect?: string;
    exact?: boolean;
    children?: TRoutes;
}
export type TRoutes = IRoute[];
// import { BASE_URL } from '../constants/index';
// 主要配置路由，面包屑路由
export const breadcrumbRoutes = [
    {
        path: '/home',
        name: 'home主页',
        breadcrumbName: '首页',
        icon: 'iconshouye',
        component: lazy(() => import('@src/pages/Home/index'))
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
                component: lazy(() => import('@src/pages/DeciveManage/Product'))
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
                        component: lazy(() => import('@src/pages/User/Login')) // 懒加载 路由组件
                    },
                    {
                        path: '/register', // 路由路径
                        name: '注册页',
                        exact: true,
                        component: lazy(() => import('@src/pages/User/Register')) // 懒加载 路由组件
                    },
                    // 子菜单路由
                    {
                        path: '/',
                        component: BasicLayout, // 基本布局
                        breadcrumbName: '',
                        children: [
                            ...breadcrumbRoutes,
                            { path: '/', exact: true, redirect: '/home', breadcrumbName: 'home' }
                        ]
                    }
                ]
            }
        ]
    }
];
export default routes;
