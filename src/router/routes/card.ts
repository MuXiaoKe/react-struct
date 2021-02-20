// 号卡管理
import { lazy } from 'react';
import { ActionBaseCode } from '../../constants/auth';
import { intl } from '@assets/locale/intl';
const f_list = intl.formatMessage({
    id: 'menu.list',
    defaultMessage: '列表'
});
const f_detail = intl.formatMessage({
    id: 'menu.detail',
    defaultMessage: '详情'
});

const billingRoute = {
    path: '/card',
    name: f_card,
    breadcrumbName: f_card,
    icon: 'icon-icon2',
    needRedirect: true,
    code: ActionBaseCode.CardBase,
    children: [
        {
            path: '/card/card-list', // 路由路径
            name: f_cardList, // 菜单名称 (不设置,则不展示在菜单栏中）
            breadcrumbName: f_cardList,
            needRedirect: true,
            hideChild: true,
            code: ActionBaseCode.CardList,
            children: [
                {
                    path: '/card/card-list/list',
                    name: f_list,
                    breadcrumbName: f_list,
                    code: ActionBaseCode.CardList,
                    component: lazy(() => import('@src/pages/card/cardList/index'))
                }
            ]
        },
        
    ]
};
export default billingRoute;
