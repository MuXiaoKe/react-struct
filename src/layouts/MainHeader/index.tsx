import React, { useEffect, useState } from 'react';
import { Layout, Dropdown, Menu, Row, Col, Divider, message, Space, Button } from 'antd';
import { observer } from 'mobx-react';
import { useHistory, Link } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    QuestionCircleOutlined,
    BellOutlined,
    UserOutlined
} from '@ant-design/icons';
import { appStores } from '@src/store';
import { useRequest } from 'ahooks';
import * as api from '@services/index';
import avatar from '@assets/image/avatar.png';
import { useIntl } from 'react-intl';
import UploadFileModal from './components/UploadLogoModal';
import moment from 'moment';
import './style.scss';
const MainHeader: React.FC = () => {
    const { formatMessage: f } = useIntl();
    const { globalStore } = appStores();
    const RoleId = sessionStorage.getItem('roleId');

    // const userInfo = globalStore.userInfo; // 得到一个 proxy对象
    const history = useHistory();
    // 登出
    const logout = useRequest(api.logout, {
        manual: true,
        onSuccess: (result, params) => {
            // globalStore.setUserInfo(null);
            // globalStore.setLoginState(false);
            sessionStorage.setItem('access_token', '');
            sessionStorage.setItem('roleId', '');
            sessionStorage.setItem('loginName', '');
            // 清空权限码
            sessionStorage.setItem('AUTHS_TYPE', '');
            sessionStorage.setItem('AUTHS_CODE', '');
            message.success(f({ id: 'user.login.logoutSuccess' }));
            history.push('/login');
        }
    });
    // 公告 getNewNotification
    const getNewNotification = useRequest(api.getNewNotification, {
        onSuccess: () => {
            setTimeout(function() {
                setScrollWidth(domref.current?.offsetWidth);
            }, 200);
        }
    });
    // 权限
    const AUTHS_TYPE = JSON.parse(sessionStorage.getItem('AUTHS_TYPE') || '[]');
    // 用户下拉菜单
    const menu = (
        <Menu>
            {/* <Menu.Item key="changePassword">
                <div className="" onClick={() => logout.run({})}>
                    {f({ id: 'common.changePassword' })}
                </div>
            </Menu.Item>
            <Menu.Divider /> */}
            {sessionStorage.getItem('roleId') !== '5000' && (
                <Menu.Item key="accountManage">
                    <Link to="/home/account" className="lineheight-32">
                        {f({ id: 'common.accountManage' })}
                    </Link>
                </Menu.Item>
            )}
            {sessionStorage.getItem('roleId') !== '5000' && (
                <Menu.Item key="customerManage">
                    <Link to="/home/customer" className="lineheight-32">
                        {f({ id: 'common.customerManage' })}
                    </Link>
                </Menu.Item>
            )}

            {AUTHS_TYPE.logoSetting && (
                <Menu.Item key="logoSetting" className="lineheight-32">
                    <UploadFileModal />
                </Menu.Item>
            )}
            <Menu.Divider />
            <Menu.Item key="sign-out">
                <div
                    className="sign-out"
                    onClick={() =>
                        logout.run({ token: sessionStorage.getItem('access_token') || '' })
                    }
                >
                    {f({ id: 'user.login.logout' })}
                </div>
            </Menu.Item>
        </Menu>
    );

    // 下载用户指南
    const downloadFile = () => {
        if (RoleId === '1000' || RoleId === '2000') {
            location.href = `${window.location.origin}/template/UserGuide-manager.docx`;
        } else {
            location.href = `${window.location.origin}/template/UserGuide-customer.docx`;
        }
    };
    // 帮助下拉菜单
    const docMenu = (
        <Menu>
            <Menu.Item key="apiManager">
                <Link to="/home/doc/api-manager" className="lineheight-32">
                    {f({ id: 'common.apiManager' })}
                </Link>
            </Menu.Item>
            <Menu.Item key="userGuide">
                <span onClick={downloadFile} className="lineheight-32">
                    {f({ id: 'common.userGuide' })}
                </span>
            </Menu.Item>
            <Menu.Item key="FAQ">
                <Link to="/home/doc/faq" className="lineheight-32">
                    {f({ id: 'common.FAQ' })}
                </Link>
            </Menu.Item>
        </Menu>
    );
    const domref: any = React.createRef();
    const [scrollWidth, setScrollWidth] = useState(0);
    return (
        <Layout.Header className="main-header">
            <Row style={{ paddingRight: 20 }}>
                <Col style={{ flex: 1 }} xl={2} xxl={1}>
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
                <Col xl={10} xxl={11} className="overflow-hidden">
                    {/* 公告截止日期需要大于当前日期 */}
                    {getNewNotification?.data?.endDate ? (
                        moment(getNewNotification?.data?.endDate).valueOf() >
                        moment(new Date()).valueOf() ? (
                            <div className="newNotification">
                                <div
                                    className={
                                        scrollWidth > 600
                                            ? 'animate notification-div'
                                            : 'notification-div'
                                    }
                                    ref={domref}
                                    style={{
                                        animationDuration: scrollWidth
                                            ? String(scrollWidth / 20) + 's'
                                            : '20s'
                                    }}
                                    title={getNewNotification?.data?.content}
                                >
                                    {getNewNotification?.data?.content}
                                </div>
                            </div>
                        ) : null
                    ) : null}
                </Col>
                <Col xl={12} xxl={12} style={{ textAlign: 'right' }}>
                    <Space size="large">
                        <Dropdown
                            overlay={docMenu}
                            trigger={['click', 'hover']}
                            placement="bottomCenter"
                        >
                            <div className="user-info text-right">
                                <QuestionCircleOutlined style={{ color: '#4674D4' }} />
                            </div>
                        </Dropdown>
                        <Link to="/card/downloadtask" title={f({ id: 'menu.downloadTask' })}>
                            <BellOutlined />
                        </Link>
                        <Dropdown
                            overlay={menu}
                            trigger={['click', 'hover']}
                            placement="bottomCenter"
                        >
                            <div className="user-info text-right">
                                <img src={avatar} className="user-img" />
                                <span className="pl10">{sessionStorage.getItem('loginName')}</span>
                            </div>
                        </Dropdown>
                    </Space>
                </Col>
            </Row>
        </Layout.Header>
    );
};

export default observer(MainHeader);
