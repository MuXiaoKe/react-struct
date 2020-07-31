import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Menu, Row } from 'antd';
import { appStores } from '@src/store';
// eslint-disable-next-line no-unused-vars
import { IRoute, TRoutes } from '@src/router/config';
import logoDo from '@assets/image/logo-do.png';
import logo2 from '@assets/image/logo2.png';

interface IRouteX extends IRoute {
    code?: string;
}

import './style.scss';
import '@assets/fonts/iconfont.css';
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
    if (!!userInfo && !!userInfo.authCodes && Array.isArray(userInfo.authCodes)) {
        authCodes = userInfo?.authCodes?.slice();
    }

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
        console.log(keys);
        setOpenKeys(keys);
    };
    const logoStyle = { height: '5vh', transform: 'scale(0.6)' };
    const logoImg = !globalStore.collapsed ? (
        <img src={logoDo} alt="logo" style={logoStyle} />
    ) : (
        <img src={logo2} alt="logo" style={logoStyle} />
    );
    return (
        <Layout.Sider
            trigger={null}
            collapsible
            collapsed={globalStore.collapsed}
            className="main-left-slider"
        >
            <Row align="middle" className="main-logo">
                {logoImg}
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
