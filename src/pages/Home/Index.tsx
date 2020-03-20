import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import '../../services/config';
import Store from './store';

export default observer(function IndexPage() {
    // useContext 订阅mobx数据
    const { pageTitle } = useContext(Store);
    return <div>{pageTitle}</div>;
});
