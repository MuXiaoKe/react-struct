import React from 'react';
import './index.scss';
import { Layout, Icon, Menu } from 'antd';

const { Header } = Layout;

import { CollapsedContext } from '../index';
import { NavLink } from 'react-router-dom';
// 有sider侧边栏时 的头部
export const HeadWidthSider: React.SFC = () => {
    const { state, dispatch } = React.useContext(CollapsedContext);
    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
                className="menuTrigger"
                type={!!state && state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => {
                    !!dispatch && dispatch({ type: 'toggle' });
                }}
            />
        </Header>
    );
};
// 菜单在头部，没有sider时的header
export const HeadWidthMenu: React.SFC = () => {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div
                className="logo"
                style={{
                    width: '200px',
                    height: '64px',
                    lineHeight: '64px',
                    color: '#FFF',
                    textAlign: 'center',
                    float: 'left'
                }}
            >
                My App
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['todolist']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="todolist"><NavLink to='/app/todolist'>每日清单</NavLink></Menu.Item>
                <Menu.Item key="keepAccount">记账</Menu.Item>
                <Menu.Item key="memo">备忘</Menu.Item>
            </Menu>
        </Header>
    );
};
