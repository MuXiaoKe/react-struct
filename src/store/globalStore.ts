import { observable, action } from 'mobx';
// import request from '@/services/request';

export default class GlobalStore {
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

    @action.bound
    public setData(data = {}) {
        Object.entries(data).forEach((item) => {
            this[item[0]] = item[1];
        });
    }
}
