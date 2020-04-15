import React, { useEffect } from 'react';
import { stringify } from 'querystring';
import { appStores } from '@store/index';
import { Redirect } from 'react-router-dom';
import { useRequest } from '@umijs/hooks';
import * as api from '@services/index';
import { message } from 'antd';
import LoadingPage from '@src/components/LoadingPage';

const SecurityLayout = ({ children }) => {
    // 获取用户信息
    const _userInfo = useRequest(api.getUserInfo, {
        manual: true,
        onSuccess: (result, params) => {
            message.success('获取用户信息成功');
            console.log(result);
            globalStore.setUserInfo(result);
        },
        onError: (error, params) => {
            // 用于解决无线跳转的问题
            globalStore.setUserInfo(null);
        }
    });
    useEffect(() => {
        // 获取用户信息
        const getUserInfo = (cache = true) => {
            const { userInfo } = globalStore;
            if (!cache || !userInfo) {
                _userInfo.run({});
            }
        };
        getUserInfo(false);
    }, []);
    const { globalStore } = appStores();

    const queryString = stringify({
        redirect: window.location.href
    });

    console.log(children, queryString);

    if (!globalStore.userInfo) {
        return <Redirect to={`/login?${queryString}`} />;
    }
    if (_userInfo.loading) {
        return <LoadingPage />;
    }
    return <div>{children}</div>;
};
export default SecurityLayout;
