import React, { useEffect } from 'react';
import { stringify } from 'querystring';
import { appStores } from '@store/index';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { useRequest } from '@umijs/hooks';
import * as api from '@services/index';
import { message } from 'antd';
import LoadingPage from '@src/components/LoadingPage';
import { reaction } from 'mobx';

const SecurityLayout: React.FC = ({ children }) => {
    let hasUserInfo = true;
    let match = useRouteMatch('/login');
    // 获取用户信息
    const _userInfo = useRequest(api.getUserInfo, {
        manual: true,
        onSuccess: (result, params) => {
            message.success('获取用户信息成功');
            console.log(result);
            hasUserInfo = true;
            globalStore.setUserInfo(result);
        },
        onError: (error, params) => {
            // 用于解决无线跳转的问题
            globalStore.setUserInfo(null);
            hasUserInfo = false;
        }
    });

    const { globalStore } = appStores(); // 全局store

    useEffect(() => {
        // 获取用户信息
        const getUserInfo = (cache = true) => {
            const { userInfo } = globalStore;
            if (!cache || !userInfo) {
                _userInfo.run({});
            }
        };
        getUserInfo(false);
        // loginstate变化时 执行getuserinfo
        reaction(
            () => globalStore.loginState,
            () => {
                console.log('changed');
                if (!globalStore.userInfo) {
                    getUserInfo(false);
                }
            }
        );
    }, []);

    const queryString = stringify({
        redirect: window.location.href
    });

    // console.log(children, queryString, globalStore.userInfo);
    // 没有返回用户信息则代表没有登录态，跳转到login页
    if (!hasUserInfo && !globalStore.userInfo && !match) {
        return <Redirect to={`/login?${queryString}`} />;
    }
    if (_userInfo.loading) {
        return <LoadingPage />;
    }
    return <div>{children}</div>;
};
export default SecurityLayout;
