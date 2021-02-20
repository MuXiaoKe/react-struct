import { lazy } from 'react';
// 基本页面
import BasicLayout from '@src/layouts/BasicLayout';
import BlankLayout from '@src/layouts/BlankLayout';
import SecurityLayout from '@src/layouts/SecurityLayout';
// 相关模块路由
// import accountRoute from './routes/account';
import billing from './routes/billing';
import autoRule from './routes/autoRule';
import business from './routes/business';
import card from './routes/card';
import commserv from './routes/commserv';
import financial from './routes/financial';
import operator from './routes/operator';
import shortCuts from './routes/shortCuts';
import { intl } from '@assets/locale/intl';
const f_home = intl.formatMessage({
    id: 'menu.home',
    defaultMessage: '首页'
});
const f_overview = intl.formatMessage({
    id: 'menu.home.overview',
    defaultMessage: '概览'
});

const f_customer = intl.formatMessage({
    id: 'menu.home.customer',
    defaultMessage: '二级客户管理'
});
const f_account = intl.formatMessage({
    id: 'menu.home.account',
    defaultMessage: '账号管理'
});
const f_list = intl.formatMessage({
    id: 'menu.list',
    defaultMessage: '列表'
});
const f_doc = intl.formatMessage({
    id: 'menu.home.doc',
    defaultMessage: '文档中心'
});
const f_apiManager = intl.formatMessage({
    id: 'menu.home.apiManager',
    defaultMessage: 'API管理'
});
const f_faq = intl.formatMessage({
    id: 'menu.home.faq',
    defaultMessage: 'FAQ'
});

const f_freeze = intl.formatMessage({
    id: 'menu.home.account.freeze',
    defaultMessage: '冻结记录'
});
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
        name: f_home,
        breadcrumbName: f_home,
        icon: 'icon-icon1',
        code: ActionBaseCode.HomeBase,
        isIndex: true,
        hideChild: true,
        needRedirect: true,
        // component: lazy(() => import('@src/pages/home/index')),
        children: [
            {
                path: '/home/index', // 路由路径
                name: f_overview, // 菜单名称 (不设置,则不展示在菜单栏中）
                breadcrumbName: f_overview,
                code: ActionBaseCode.HomeBase,
                component: lazy(() => import('@src/pages/home/index')) // 懒加载 路由组件
            },
            {
                path: '/home/customer', // 客户管理
                name: f_customer,
                breadcrumbName: f_customer,
                code: ActionBaseCode.HomeCustomer,
                component: lazy(() => import('@src/pages/home/customer'))
            },
            {
                path: '/home/account', // 账户管理
                name: f_account,
                breadcrumbName: f_account,
                code: ActionBaseCode.HomeBase,
                needRedirect: true,
                hideChild: true,
                children: [
                    {
                        path: '/home/account/list/:channelCustId?', // 路由路径
                        name: f_list,
                        breadcrumbName: f_list,
                        code: ActionBaseCode.HomeBase,
                        component: lazy(() => import('@src/pages/home/account'))
                    },
                    {
                        path: '/home/account/freeze/:loginName', // 路由路径
                        name: f_freeze,
                        breadcrumbName: f_freeze,
                        code: ActionBaseCode.HomeBase,
                        component: lazy(() => import('@src/pages/home/freeze'))
                    }
                ]
            },
            {
                path: '/home/doc', // 文档中心
                name: f_doc,
                breadcrumbName: f_doc,
                code: ActionBaseCode.HomeBase,
                needRedirect: true,
                hideChild: true,
                children: [
                    {
                        path: '/home/doc/api-manager',
                        name: f_apiManager,
                        breadcrumbName: f_apiManager,
                        code: ActionBaseCode.HomeBase,
                        component: lazy(() => import('@src/pages/home/ApiManager/index'))
                    },
                    // {
                    //     path: '/home/doc/guide',
                    //     name: f_userGuide,
                    //     breadcrumbName: f_userGuide,
                    //     code: ActionBaseCode.HomeBase,
                    //     component: lazy(() => import('@src/pages/home/UserGuide/index'))
                    // },
                    {
                        path: '/home/doc/faq',
                        name: f_faq,
                        breadcrumbName: f_faq,
                        code: ActionBaseCode.HomeBase,
                        component: lazy(() => import('@src/pages/home/FAQ/index'))
                    }
                ]
            }
        ]
    },
    // {
    //     path: '/demo',
    //     name: 'demo',
    //     breadcrumbName: '例子',
    //     icon: 'icon-icon7',
    //     code: ActionBaseCode.HomeBase,
    //     needRedirect: true,
    //     children: [
    //         {
    //             path: '/demo/table', // 路由路径
    //             name: '表格', // 菜单名称 (不设置,则不展示在菜单栏中）
    //             breadcrumbName: '表格',
    //             code: ActionBaseCode.HomeBase,
    //             component: lazy(() => import('@src/pages/demo/AdvanceSearch')) // 懒加载 路由组件
    //         },
    //         {
    //             path: '/demo/charts', // 路由路径
    //             name: '图表', // 菜单名称 (不设置,则不展示在菜单栏中）
    //             breadcrumbName: '图表',
    //             code: ActionBaseCode.HomeBase,
    //             component: lazy(() => import('@src/pages/demo/Charts')) // 懒加载 路由组件
    //         }
    //     ]
    // },
    { ...card },
    { ...commserv },
    { ...billing },
    { ...autoRule },
    { ...shortCuts },
    { ...operator },
    { ...business },
    { ...financial }
];
const routes: TRoutes = [
    {
        path: '/',
        component: BlankLayout, // 空白页布局
        // breadcrumbName: '',
        children: [
            {
                path: '/',
                component: SecurityLayout,
                children: [
                    {
                        path: '/login', // 路由路径
                        name: '登录页', // 菜单名称 (不设置,则不展示在菜单栏中）
                        exact: true,
                        component: lazy(() => import('@src/pages/user/login')) // 懒加载 路由组件
                    },
                    {
                        path: '/register', // 路由路径
                        name: '注册页',
                        exact: true,
                        component: lazy(() => import('@src/pages/user/register')) // 懒加载 路由组件
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
