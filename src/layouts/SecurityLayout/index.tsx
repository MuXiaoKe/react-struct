import React from 'react';
import { stringify } from 'querystring';
import { appStores } from '@store/index';
import { Redirect } from 'react-router-dom';

const SecurityLayout = ({ children }) => {
    const { globalStore } = appStores();
    const queryString = stringify({
        redirect: window.location.href
    });

    console.log(children, queryString);

    if (!globalStore.userInfo) {
        return <Redirect to={`/login?${queryString}`} />;
    }
    return <div>{children}</div>;
};
export default SecurityLayout;
