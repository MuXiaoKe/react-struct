import { observable, action } from 'mobx';

interface Iglobal {
    [propName: string]: any;
}
interface IUserInfo {
    userName?: string;
    authCodes?: any[];
    acconutId?: string;
    loginName?: string;
    deptId?: string;
    deptName?: string;
    roleName?: string;
    roleId?: string;
}
export default class GlobalStore implements Iglobal {
    [propName: string]: any;

    @observable public loading = false;

    @observable public appTitle = 'Pandora';

    @observable public collapsed = false; // 菜单收起展开

    @observable public loginState = false; // 登录状态 默认没有登录

    @observable public userInfo: IUserInfo | null = null;
    @observable public allAuthList: any[] = []; // 权限表

    @action
    public toggleCollapsed = () => {
        this.collapsed = !this.collapsed;
    };

    @action.bound // 设置属性隐射 -》 data -> this
    public setData(data = {}) {
        // data => {key: value}
        // Object.entries(data).forEach((item: [any, any]) => {
        //     this[item[0]] = item[1];
        // });
        console.log(data);
        for (let [key, value] of Object.entries(data)) {
            this[key] = value;
        }
    }
    @action
    public setUserInfo = (info: IUserInfo) => {
        this.userInfo = info;
    };
    @action
    public setLoginState = (state: boolean) => {
        this.loginState = state;
    };
}
