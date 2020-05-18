import { createContext } from 'react';
import { observable, action } from 'mobx';

class HomeStore {
    @observable
    public pageTitle = 'Home主页';

    @observable
    public loading = false;

    @action
    public setTitle = (title: string) => {
        this.pageTitle = title;
    };
}

export default createContext(new HomeStore());
