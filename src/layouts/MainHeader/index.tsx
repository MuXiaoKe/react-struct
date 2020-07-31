import React from 'react';
import { Layout, Dropdown, Menu, Row, Col, Divider, message } from 'antd';
import { observer } from 'mobx-react';
import { useHistory, Link } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, KeyOutlined } from '@ant-design/icons';
import { appStores } from '@src/store';
import './style.scss';
import { useRequest } from 'ahooks';
import * as api from '@services/index';

import defaultHandsome from '@src/assets/image/default_handsome.jpg';

const MainHeader: React.SFC = () => {
    // const { state, dispatch } = React.useContext(CollapsedContext);
    const { globalStore } = appStores();

    const userInfo = globalStore.userInfo; // 得到一个 proxy对象
    const history = useHistory();
    // 登出
    const doLogin = useRequest(api.logout, {
        manual: true,
        onSuccess: (result, params) => {
            globalStore.setUserInfo(null);
            globalStore.setLoginState(false);
            message.success('登出');
            history.push('/login');
        },
        onError: (error, params) => {}
    });

    const accessKeyManage = () => {};

    const menu = (
        <Menu>
            <div className="user-info user-info-card-logo">
                <img src={defaultHandsome} className="user-img" />
                <span className="user-name">{userInfo?.accountName}</span>
            </div>
            <div className="personal-menu">
                <Link to="/account/baseinfo">基本资料</Link>
                <Divider type="vertical" className="personal-menu-divider" />
                <Link to="#">实名认证</Link>
                <Divider type="vertical" className="personal-menu-divider" />
                <Link to="/account/scuritysetting">安全设置</Link>
            </div>
            <Menu.Divider />
            <Menu.Item key="0" icon={<KeyOutlined />} onClick={accessKeyManage}>
                <span className="ge-14px">AccessKey管理</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
                <div className="sign-out" onClick={() => doLogin.run({})}>
                    退出登录
                </div>
            </Menu.Item>
        </Menu>
    );
    return (
        <Layout.Header className="main-header">
            <Row style={{ paddingRight: 20 }}>
                <Col style={{ flex: 1 }} span={20}>
                    {globalStore.collapsed ? (
                        <MenuUnfoldOutlined
                            className="menuTrigger"
                            onClick={() => {
                                globalStore.toggleCollapsed();
                            }}
                        />
                    ) : (
                        <MenuFoldOutlined
                            className="menuTrigger"
                            onClick={() => {
                                globalStore.toggleCollapsed();
                            }}
                        />
                    )}
                </Col>
                <Col span={4}>
                    <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
                        <div className="user-info text-right">
                            <img src={defaultHandsome} className="user-img" />
                        </div>
                    </Dropdown>
                </Col>
            </Row>
        </Layout.Header>
    );
};

export default observer(MainHeader);
