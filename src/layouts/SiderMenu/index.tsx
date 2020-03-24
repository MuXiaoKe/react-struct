import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Menu, Row } from 'antd';
import { appStores } from '@src/store';
import './style.scss';
import { RadarChartOutlined } from '@ant-design/icons';

const renderMenuItem = (target) => {
    return target
        .filter((item) => item.path && item.name)
        .map((subMenu) => {
            if (
                subMenu.childRoutes &&
                !!subMenu.childRoutes.find((child) => child.path && child.name)
            ) {
                return (
                    <Menu.SubMenu
                        key={subMenu.path}
                        title={
                            <div>
                                {/* {subMenu.icon && <Icon type={subMenu.icon} />} */}
                                <span>{subMenu.name}</span>
                            </div>
                        }
                    >
                        {renderMenuItem(subMenu.childRoutes)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item key={subMenu.path}>
                    <Link to={subMenu.path}>
                        <span>
                            {/* {subMenu.icon && <Icon type={subMenu.icon} />} */}
                            <span>{subMenu.name}</span>
                        </span>
                    </Link>
                </Menu.Item>
            );
        });
};

const SiderMenu = ({ routes }) => {
    const { globalStore } = appStores();
    const { pathname } = useLocation();
    // console.log(pathname);
    const [openKeys, setOpenKeys] = useState([]);

    useEffect(() => {
        const list = pathname.split('/').splice(1);
        setOpenKeys(list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`));
    }, []);

    const getSelectedKeys = useMemo(() => {
        console.log('getSelectedKeys');
        const list = pathname.split('/').splice(1);
        return list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`);
    }, [pathname]);

    const onOpenChange = (keys) => {
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
                theme="dark"
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
