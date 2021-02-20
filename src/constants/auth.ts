import { deepClone } from '@utils/index';
import * as subAuth from './subAuth';

const MenuBase = {
    Home: '1000000', // 主页
    Card: '2000000', // 号卡管理
    Commserv: '3000000', // 通信服务
    Billing: '4000000', // 计费
    AutoRule: '5000000', // 自动化规则
    ShortCuts: '6000000', // 快捷操作
    Operator: '7000000', // 运营商管理
    Business: '8000000', // 企业管理
    Financial: '9000000' // 财务管理
};

// 所有得页面权限
const ActionBaseCode = {
    /* 首页 */
    HomeBase: MenuBase.Home,
    HomeCustomer: '1010000', // 客户管理
};

// 按钮权限
const ButtonCode = {
    editCard: '2010101', // 编辑号卡
};

// 平台角色
// 1000 admin 管理员
// 2000 readOnlyAdmin 管理员 -只读
// 3000 fstLevelCustomer 企业客户
// 4000 readOnlyfstLevelCustomer 企业客户 -只读
// 5000 secLevelCustomer 二级客户

// 平台根据roleid复制给当前用户一个校色
const RoleType = {
    admin: {
        
    },
    readOnlyAdmin: {
        
    },
    // 3000 fstLevelCustomer 企业客户
    fstLevelCustomer: {
        
    },
    readOnlyfstLevelCustomer: {
        
    },
    secLevelCustomer: {
        
    }
};
// delete RoleType.secLevelCustomer.CardBatch;
// 用户角色code
const RoleTypeCode = {
    admin: [...Object.values(RoleType.admin)],
    readOnlyAdmin: [...Object.values(RoleType.readOnlyAdmin)],
    fstLevelCustomer: [...Object.values(RoleType.fstLevelCustomer)],
    readOnlyfstLevelCustomer: [...Object.values(RoleType.readOnlyfstLevelCustomer)],
    secLevelCustomer: [...Object.values(RoleType.secLevelCustomer)]
};
// 根据roleid来存储 用户权限到sessionStorage
function auths(roleId: number) {
    switch (roleId) {
        case 1000:
            sessionStorage.setItem('AUTHS_TYPE', JSON.stringify(RoleType.admin));
            sessionStorage.setItem('AUTHS_CODE', JSON.stringify(RoleTypeCode.admin));
            break;
        case 2000:
            sessionStorage.setItem('AUTHS_TYPE', JSON.stringify(RoleType.readOnlyAdmin));
            sessionStorage.setItem('AUTHS_CODE', JSON.stringify(RoleTypeCode.readOnlyAdmin));
            break;
        case 3000:
            sessionStorage.setItem('AUTHS_TYPE', JSON.stringify(RoleType.fstLevelCustomer));
            sessionStorage.setItem('AUTHS_CODE', JSON.stringify(RoleTypeCode.fstLevelCustomer));
            break;
        case 4000:
            sessionStorage.setItem('AUTHS_TYPE', JSON.stringify(RoleType.readOnlyfstLevelCustomer));
            sessionStorage.setItem(
                'AUTHS_CODE',
                JSON.stringify(RoleTypeCode.readOnlyfstLevelCustomer)
            );
            break;
        case 5000:
            sessionStorage.setItem('AUTHS_TYPE', JSON.stringify(RoleType.secLevelCustomer));
            sessionStorage.setItem('AUTHS_CODE', JSON.stringify(RoleTypeCode.secLevelCustomer));
            break;
        default:
            return null;
    }
}
export { MenuBase, ActionBaseCode, SubPageCode, ButtonCode, RoleType, RoleTypeCode, auths };
