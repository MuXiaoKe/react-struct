import React, { useState, useEffect } from 'react';
import { appStores } from '@store/index';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { useRequest } from 'ahooks';
import * as api from '@services/index';
// import { message } from 'antd';
import LoadingPage from '@src/components/LoadingPage';
import { reaction } from 'mobx';

const SecurityLayout: React.FC = ({ children }) => {
    // let hasUserInfo = true;
    // 用户信息状态
    const [userStatus, setuserStatus] = useState(true);

    let loginMatch = useRouteMatch('/login');
    let regMatch = useRouteMatch('/register');
    // 获取用户信息
    const _userInfo = useRequest(api.getUserInfo, {
        manual: true,
        onSuccess: (result, params) => {
            console.log(result);
            if (result) {
                setuserStatus(true);
                globalStore.setUserInfo(result);
                globalStore.setLoginState(true);
            } else {
                setuserStatus(false);
            }
        },
        onError: (error, params) => {
            console.log(error);
            // 用于解决无线跳转的问题
            globalStore.setUserInfo(null);
            globalStore.setLoginState(false);
            setuserStatus(false);
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

    // const queryString = stringify({
    //     redirect: window.location.href
    // });

    // console.log(!userStatus, !globalStore.userInfo, !loginMatch, !regMatch);
    // 没有返回用户信息则代表没有登录态，跳转到login页
    if (!userStatus && !globalStore.userInfo && !loginMatch && !regMatch) {
        return <Redirect to="/login" />; // {`/login?${queryString}`}
    }
    if (_userInfo.loading) {
        return <LoadingPage />;
    }
    return <div>{children}</div>;
};
export default SecurityLayout;
