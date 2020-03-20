import { createContext } from 'react';
import { observable } from 'mobx';

class HomeStore {
    @observable
    public pageTitle = 'Home主页';

    @observable
    public loading = false;
}

export default createContext(new HomeStore());
