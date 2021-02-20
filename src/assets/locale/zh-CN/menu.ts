import billing from './menus/billing';
import home from './menus/home';
import financial from './menus/financial';
import operator from './menus/operator';
import business from './menus/business';
import card from './menus/card';
import commserv from './menus/commserv';
import shortcuts from './menus/shortcuts';
import autoRule from './menus/autoRule';
export default {
    'menu.list': '列表',
    'menu.edit': '编辑',
    'menu.add': '新建',
    'menu.detail': '详情',
    'menu.changeLog': '变更记录',
    ...billing,
    ...home,
    ...financial,
    ...operator,
    ...business,
    ...card,
    ...commserv,
    ...shortcuts,
    ...autoRule
};
