import React, { useState, useCallback } from 'react';
import { useLocation, useHistory, Redirect, Link } from 'react-router-dom';
import { Form, Input, Button, message, Spin } from 'antd';
import { observer } from 'mobx-react';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { appStores } from '@store/index';
import * as api from '@services/index';
import './style/Login.scss';

import CommonHeader from './components/CommonHeader';
const defaultCaptchaUrl = () => `./servlet/captchaCode?d=${new Date().getTime()}`;

const LoginPage: React.FC = (props) => {
    const history = useHistory();
    const { globalStore } = appStores();
    const [form] = Form.useForm();

    const [captchaUrl, setCaptchaUrl] = useState(defaultCaptchaUrl());
    // 登录
    const doLogin = useRequest(api.login, {
        manual: true,
        onSuccess: (result, params) => {
            message.success('登录成功');
            globalStore.setLoginState(true);
            history.push('./');
        },
        onError: (err: any, params) => {
            setCaptchaUrl(defaultCaptchaUrl());
            handleCaptcha(document.getElementById('captchaImg'));
            message.error(`登录失败, ${err?.msg}!`);
        }
    });
    // 请求验证码
    const handleCaptcha = useCallback(
        (img) => {
            if (captchaUrl && img) {
                const xmlHHttp = new XMLHttpRequest();
                xmlHHttp.open('GET', captchaUrl, true);
                xmlHHttp.responseType = 'blob';
                xmlHHttp.onload = () => {
                    if (xmlHHttp.status === 200) {
                        const blob = xmlHHttp.response;
                        if (img) {
                            img.onload = () => {
                                window.URL.revokeObjectURL(img.src);
                            };
                            img.src = window.URL.createObjectURL(blob);
                        }
                        // 赋值 captchaid
                        // setSate会导致重渲染， 组件卸载 时可判断 不进行 setState；不然会循环，内存溢出
                        // !ignore && setCaptchaId(xmlHHttp.getResponseHeader('captchaid') || '');
                    }
                };
                xmlHHttp.send();
            }
        },
        [captchaUrl]
    );
    // 登录提交
    const onFinish = (values: any) => {
        doLogin.run({ ...values });
    };
    const onFinishFailed = (errorInfo: any) => {
        form.scrollToField(errorInfo.errorFields[0].name);
        console.log('Failed:', errorInfo.errorFields);
    };
    // 是否70000 超时登出了
    const isTimeout = () => {
        const paramsArr = location.hash?.split('?')[1]?.split('=');
        return paramsArr?.[0] === 'status' && paramsArr?.[1] === '70000';
    };
    const result = useLocation()?.state;
    // 有用户信息跳转到首页
    if (globalStore?.loginState && globalStore?.userInfo && !isTimeout()) {
        return <Redirect to={result?.from || './'} />;
    }
    return (
        <Spin spinning={doLogin.loading}>
            <CommonHeader />
            <div className="login-wrap">
                <div className="pj-text">
                    <p className="pj-title">让连接充满魔力</p>
                    <p className="pj-explain">汇聚全球连接及服务资源，为万物智能互联赋能</p>
                </div>
                <div className="login-box">
                    <h1>账号登录</h1>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '必填项，请输入登录帐号' }
                                // {
                                //     pattern: /^([A-Za-z0-9]{6,20})$/,
                                //     message: '登录帐号由6-20个字母数字组合'
                                // }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="请输入用户名"
                                className="login-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: '必填项，请输入密码' }
                                // {
                                //     pattern: /[0-9a-zA-Z]{6,20}/,
                                //     message: '密码由6-20个字母数字组合'
                                // },
                                // { max: 20, message: '长度不可超过20' }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请输入密码"
                                className="login-input"
                            />
                        </Form.Item>

                        <Form.Item className="captcha-wrap">
                            <Form.Item
                                name="captcha"
                                rules={[{ required: true, message: 'Please输入验证码!' }]}
                            >
                                <Input
                                    prefix={<SafetyOutlined />}
                                    placeholder="请输入验证码"
                                    id="captcha"
                                    className="login-input captcha-input"
                                />
                            </Form.Item>

                            <img
                                id="captchaImg"
                                className="captchaImg"
                                ref={handleCaptcha}
                                onClick={() => handleCaptcha(document.getElementById('captchaImg'))}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="navToRegister">
                        <Link to="/register">免费注册</Link>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default observer(LoginPage);
