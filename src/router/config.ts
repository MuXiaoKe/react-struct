import { lazy } from 'react';
// 基本页面
import BasicLayout from '@src/layouts/BasicLayout';
import BlankLayout from '@src/layouts/BlankLayout';
import SecurityLayout from '@src/layouts/SecurityLayout';
// 相关模块路由
// import accountRoute from './routes/account';

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
    hideChild?: boolean; // 子菜单是否需要显示
    isIndex?: boolean; // 是否是首页
    // code?: string;
}
export type TRoutes = IRoute[];
// import { BASE_URL } from '../constants/index';
import { ActionBaseCode } from '../constants/auth';
// 主要配置路由，面包屑路由
export const breadcrumbRoutes = [
    {
        path: '/home',
        name: '概览',
        breadcrumbName: '概览',
        icon: 'iconshouye',
        code: ActionBaseCode.HomeBase,
        isIndex: true,
        component: lazy(() => import('@src/pages/Home/Index'))
    }
    // accountRoute
];
const routes: TRoutes = [
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
