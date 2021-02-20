import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Menu, Row } from 'antd';
import { appStores } from '@src/store';
// eslint-disable-next-line no-unused-vars
import * as api from '@services/index';
import { IRoute, TRoutes } from '@src/router/config';
import logoDo from '@assets/image/logo-do.png';
import logo2 from '@assets/image/logo2.png';

interface IRouteX extends IRoute {
    code?: string;
}

import './style.scss';
import '@assets/fonts/iconfont.css';
import { useRequest } from 'ahooks';
// import _logo from '@assets/image/logo-do.png';
const renderMenuItem = (target: any, authcode: string[], collapsed: boolean) => {
    return target
        .filter((item: IRoute) => item.path && item.name)
        .map((subMenu: IRouteX) => {
            const hasAuth = authcode.find((ele) => ele === String(subMenu?.code));
            if (hasAuth) {
                if (
                    subMenu.children &&
                    !!subMenu.children.find((child) => child.path && child.name) &&
                    !subMenu.hideChild
                ) {
                    return (
                        <Menu.SubMenu
                            key={subMenu.path}
                            title={
                                <div>
                                    {/* {subMenu.icon ? React.createElement(subMenu.icon) : null} */}
                                    {subMenu.icon ? (
                                        <i
                                            className={`iconfont ${subMenu.icon}`}
                                            title={subMenu.name}
                                        />
                                    ) : null}
                                    {!collapsed && <span className="ml10">{subMenu.name}</span>}
                                </div>
                            }
                        >
                            {renderMenuItem(subMenu.children, authcode, collapsed)}
                        </Menu.SubMenu>
                    );
                }

                return (
                    <Menu.Item key={subMenu.path}>
                        <Link to={subMenu.path}>
                            <span>
                                {subMenu.icon ? (
                                    <i
                                        className={`iconfont ${subMenu.icon}`}
                                        title={subMenu.name}
                                    />
                                ) : null}
                                {collapsed && subMenu.isIndex ? null : (
                                    <span className="ml10">{subMenu.name}</span>
                                )}
                            </span>
                        </Link>
                    </Menu.Item>
                );
            }

            return null;
        });
};
interface ISiderMenu {
    routes: TRoutes;
    // children?: React.ReactNode;
}
const SiderMenu: React.FC<ISiderMenu> = ({ routes }) => {
    const { globalStore } = appStores();
    const { pathname } = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const { userInfo, collapsed } = globalStore;

    let authCodes: string[] = [];
    // if (!!userInfo && !!userInfo.authCodes && Array.isArray(userInfo.authCodes)) {
    //     authCodes = userInfo?.authCodes?.slice();
    // }
    authCodes = JSON.parse(sessionStorage.getItem('AUTHS_CODE') || '[]');
    useEffect(() => {
        const list = pathname.split('/').splice(1);
        setOpenKeys(
            list.map((item: string, index: number) => `/${list.slice(0, index + 1).join('/')}`)
        );
    }, [pathname]);

    const getSelectedKeys = useMemo(() => {
        const list = pathname.split('/').splice(1);
        return list.map((item: string, index: number) => `/${list.slice(0, index + 1).join('/')}`);
    }, [pathname]);

    const onOpenChange = (keys: any) => {
        setOpenKeys(keys);
    };
    const [logoImg, setlogoImg] = useState<any>();
    const roleId = sessionStorage.getItem('roleId');
    const channelCustId = sessionStorage.getItem('channelCustId');
    const custId = sessionStorage.getItem('custId');
    const _custId = Number(roleId) === 5000 ? custId : channelCustId;
    const logo = useRequest(() => api.getLogoByCustId({ custId: _custId }), {
        onSuccess: (resault: any) => {
            if (
                Object.keys(resault).length !== 0 &&
                resault?.logo !== null &&
                resault?.logo !== ''
            ) {
                setlogoImg(
                    <img
                        src={resault.logo}
                        alt="logo"
                        style={{
                            marginRight: 10,
                            marginLeft: 10,
                            height: 30,
                            width: 170
                        }}
                    />
                );
            }
        }
    });
    return (
        <Layout.Sider
            trigger={null}
            collapsible
            collapsed={globalStore.collapsed}
            className="main-left-slider"
        >
            <Row align="middle" className="main-logo">
                {logo.loading === false ? (
                    logoImg ? (
                        !globalStore.collapsed ? (
                            logoImg
                        ) : null
                    ) : !globalStore.collapsed ? (
                        <img
                            src={logoDo}
                            alt="logo"
                            style={{
                                marginRight: 10,
                                marginLeft: 10,
                                height: 'auto',
                                width: '85%'
                            }}
                        />
                    ) : (
                        <img
                            src={logo2}
                            alt="logo"
                            style={{
                                marginRight: 10,
                                marginLeft: 10,
                                height: 'auto',
                                width: '40%'
                            }}
                        />
                    )
                ) : null}
            </Row>
            <Menu
                mode="inline"
                theme="light"
                style={{ paddingLeft: 0, marginBottom: 0 }}
                className="main-menu"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                selectedKeys={getSelectedKeys}
            >
                {authCodes.length > 0 && renderMenuItem(routes, authCodes, collapsed)}
            </Menu>
        </Layout.Sider>
    );
};

export default observer(SiderMenu);
