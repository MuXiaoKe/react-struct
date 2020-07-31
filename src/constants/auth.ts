const MenuBase = {
    Home: 1000000, // 主页
    PersonalCenter: 5000000, // 个人中心
    SystemSetting: 6000000 // 系统设置
};
const ActionBaseCode = {
    /* 首页 */
    HomeBase: MenuBase.Home,
    /* 个人中心 */
    PersonalBase: MenuBase.PersonalCenter,
    PersonalInfo: 5010000, // 基本信息
    PersonalSecurity: 5020000, // 安全设置
    /* 系统管理 */
    SystemBase: MenuBase.SystemSetting,
    SystemAccount: 6010000, // 帐号管理
    SystemRole: 6020000 // 角色管理
};
const ActionCode = {};
export { ActionBaseCode, MenuBase, ActionCode };
