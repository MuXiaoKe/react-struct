import { observable, action } from 'mobx';
// import request from '@/services/request';
interface Iglobal {
    [propName: string]: any;
}
export default class GlobalStore implements Iglobal {
    [propName: string]: any;

    @observable public loading = false;

    @observable public appTitle = '管理平台';

    @observable public collapsed = false; // 菜单收起展开

    @observable public userInfo = {
        // 当前用户信息
        loginName: 'zhou'
    };

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
}
