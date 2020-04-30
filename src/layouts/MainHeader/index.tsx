import React from 'react';
import { Layout, Dropdown, Menu, Row, Col, Button, message } from 'antd';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { appStores } from '@src/store';
import './style.scss';
import { useRequest } from '@umijs/hooks';
import * as api from '@services/index';
// import { CollapsedContext } from '../BasicLayout';

const MainHeader: React.SFC = () => {
    // const { state, dispatch } = React.useContext(CollapsedContext);
    const { globalStore } = appStores();
    const history = useHistory();
    // 登出
    const doLogin = useRequest(api.logout, {
        manual: true,
        onSuccess: (result, params) => {
            message.success('登出');
            history.push('./login');
        },
        onError: (error, params) => {}
    });
    const menu = (
        <Menu>
            <Menu.Item key="0">个人信息</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
                <Button onClick={doLogin.run}>退出登录</Button>
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
                        <div className="user-info">
                            <span className="user-img" />
                            <span className="user-name">zhou</span>
                        </div>
                    </Dropdown>
                </Col>
            </Row>
        </Layout.Header>
    );
};

export default observer(MainHeader);
