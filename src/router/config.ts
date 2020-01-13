import { lazy } from 'react';

import BasicLayout from '@src/layouts/BasicLayout';
import BlankLayout from '@src/layouts/BlankLayout';

import TodoList from '../pages/todoList/TodoList';
// import MainPage from '../pages/index/Main';
// import { BASE_URL } from '../constants/index';

const routes = [
    {
        path: '/',
        component: BlankLayout, // 空白页布局
        breadcrumbName: '',
        children: [
            // 子菜单路由
            {
                path: '/login', // 路由路径
                name: '登录页', // 菜单名称 (不设置,则不展示在菜单栏中）
                breadcrumbName: '登录页',
                icon: 'setting', // 菜单图标
                component: lazy(() => import('@src/pages/Login')) // 懒加载 路由组件
            },
            {
                path: '/',
                // exact: true,
                component: BasicLayout, // 基本布局
                breadcrumbName: '',
                children: [
                    {
                        path: '/home',
                        name: 'home主页',
                        breadcrumbName: 'home',
                        icon: 'home',
                        component: lazy(() => import('@src/pages/Home/index'))
                    },
                    {
                        path: '/exception',
                        name: '异常页',
                        breadcrumbName: '异常页',
                        // exact: true,
                        icon: 'warning',
                        children: [
                            {
                                path: '/exception/403',
                                name: '403',
                                icon: 'frown',
                                component: lazy(() => import('@src/pages/Exception/403'))
                            },
                            {
                                path: '/exception/404',
                                name: '404',
                                exact: true,
                                icon: 'frown',
                                component: lazy(() => import('@src/pages/Exception/404'))
                            },
                            {
                                path: '/exception/500',
                                name: '500',
                                icon: 'frown',
                                component: lazy(() => import('@src/pages/Exception/500'))
                            }
                        ]
                    },
                    { path: '/', exact: true, redirect: '/home', breadcrumbName: 'home' },
                    { path: '*', exact: true, redirect: '/exception/404', breadcrumbName: '404' }
                ]
            }
        ]
    }
];
export default routes;
