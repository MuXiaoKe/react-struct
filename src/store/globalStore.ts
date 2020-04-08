import { observable, action } from 'mobx';
// import request from '@/services/request';
interface Iglobal {
    [propName: string]: any;
}
interface UserInfo {
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

    @observable public appTitle = '管理平台';

    @observable public collapsed = false; // 菜单收起展开

    @observable public userInfo: UserInfo = {};

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
        for (let [key, value] of Object.entries(data)) {
            this[key] = value;
        }
    }

    // @action
    // getUserInfo = async (cache = true): Promise<UserInfo> => {
    //     if (!cache || !this.userInfo) {
    //         try {
    //             runInAction(() => {
    //                 this.loading = true;
    //             });
    //             const res = await this.api.getUserInfo({});
    //             if (!res) {
    //                 this.refresh(); // 更新验证码
    //             }

    //             runInAction(() => {
    //                 this.userInfo = res;
    //             });
    //         } catch {
    //             runInAction(() => {
    //                 // 用于解决无线跳转的问题
    //                 this.userInfo = null;
    //             });
    //         }
    //     }
    //     return this.userInfo;
    // };
}
