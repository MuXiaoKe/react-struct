import { lazy } from 'react';
import { ActionBaseCode } from '../../constants/auth';

const accountRoute = {
    path: '/account',
    name: '个人中心',
    breadcrumbName: '个人中心',
    icon: 'icongerenzhongxin',
    needRedirect: true,
    code: ActionBaseCode.PersonalBase,
    children: []
};
export default accountRoute;
