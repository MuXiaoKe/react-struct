import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Menu, Row } from 'antd';
import { appStores } from '@src/store';
import { IRoute, TRoutes } from '@src/router/config';
import { RadarChartOutlined } from '@ant-design/icons';

import './style.scss';
import '@assets/fonts/iconfont.css';

const renderMenuItem = (target: any) => {
    return target
        .filter((item: IRoute) => item.path && item.name)
        .map((subMenu: IRoute) => {
            if (subMenu.children && !!subMenu.children.find((child) => child.path && child.name)) {
                return (
                    <Menu.SubMenu
                        key={subMenu.path}
                        title={
                            <div>
                                {/* {subMenu.icon ? React.createElement(subMenu.icon) : null} */}
                                {subMenu.icon ? <i className={`iconfont ${subMenu.icon}`} /> : null}
                                <span>{subMenu.name}</span>
                            </div>
                        }
                    >
                        {renderMenuItem(subMenu.children)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item key={subMenu.path}>
                    <Link to={subMenu.path}>
                        <span>
                            {subMenu.icon ? <i className={`iconfont ${subMenu.icon}`} /> : null}
                            <span>{subMenu.name}</span>
                        </span>
                    </Link>
                </Menu.Item>
            );
        });
};
interface ISiderMenu {
    routes: TRoutes;
    // children?: React.ReactNode;
}
const SiderMenu: React.FC<ISiderMenu> = ({ routes }) => {
    const { globalStore } = appStores();
    const { pathname } = useLocation();
    // console.log(pathname);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

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

    const onOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    return (
        <Layout.Sider
            trigger={null}
            collapsible
            collapsed={globalStore.collapsed}
            className="main-left-slider"
        >
            <Link to="/">
                <Row align="middle" className="main-logo">
                    <RadarChartOutlined />
                    {!globalStore.collapsed && (
                        <span className="app-name">{globalStore.appTitle}</span>
                    )}
                </Row>
            </Link>
            <Menu
                mode="inline"
                theme="light"
                style={{ paddingLeft: 0, marginBottom: 0 }}
                className="main-menu"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                selectedKeys={getSelectedKeys}
            >
                {renderMenuItem(routes)}
            </Menu>
        </Layout.Sider>
    );
};

export default observer(SiderMenu);
