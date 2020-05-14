import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { Form, Input, Button, message, Spin } from 'antd';
import { observer } from 'mobx-react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';
import { appStores } from '@store/index';
import * as api from '@services/index';
import './index.scss';
import { useForm } from 'antd/lib/form/util';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 }
};
const defaultCaptchaUrl = () => `./servlet/captchaCode?d=${new Date().getTime()}`;
const LoginPage = (props) => {
    const [captchaUrl, setCaptchaUrl] = useState(defaultCaptchaUrl());
    const [captchaid, setCaptchaId] = useState('');
    const history = useHistory();
    const { globalStore } = appStores();
    let ignore = false;

    // 登录
    const doLogin = useRequest(api.login, {
        manual: true,
        onSuccess: (result, params) => {
            message.success('登陆成功');
            // getUserInfo();
            globalStore.setLoginState(true);
            history.push('./');
        },
        onError: (error, params) => {
            setCaptchaUrl(defaultCaptchaUrl());
            handleCaptcha(document.getElementById('captchaImg'));
        }
    });
    // 请求验证码
    const handleCaptcha = useCallback(
        (img) => {
            if (captchaUrl && img) {
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.open('GET', captchaUrl, true);
                xmlhttp.responseType = 'blob';
                xmlhttp.onload = () => {
                    if (xmlhttp.status === 200) {
                        const blob = xmlhttp.response;
                        if (img) {
                            img.onload = () => {
                                window.URL.revokeObjectURL(img.src);
                            };
                            img.src = window.URL.createObjectURL(blob);
                        }
                        // 赋值 captchaid
                        // captchaid = xmlhttp.getResponseHeader('captchaid') || '';
                        // setSate会导致重渲染， 组件卸载 时可判断 不进行 setState；不然会循环，内存溢出
                        !ignore && setCaptchaId(xmlhttp.getResponseHeader('captchaid') || '');
                    }
                };
                xmlhttp.send();
            }
        },
        [captchaUrl]
    );
    // 获取用户信息
    // const getUserInfo = (cache = true) => {
    //     const { userInfo } = globalStore;
    //     if (!cache || !userInfo) {
    //         _userInfo.run({});
    //     }
    // };
    // 登录提交
    const onFinish = (values: any) => {
        doLogin.run({ ...values, captchaid });
        // console.log(doLogin);
    };
    const [form] = useForm();
    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        form.scrollToField(errorFields[0].name);
        console.log('Failed:', errorFields);
    };
    useEffect(() => {
        console.log('login effect');
        globalStore.setLoginState(false);
        globalStore.setUserInfo(null);
        return () => {
            ignore = true;
        };
    }, []);
    // console.log(globalStore.userInfo?.userName);
    // 有用户信息跳转到首页
    if (globalStore.loginState && globalStore.userInfo) {
        return <Redirect to={useLocation()?.state?.from || './'} />;
    }
    // if (_userInfo.loading) {
    //     return <LoadingPage />;
    // }
    return (
        <Spin spinning={doLogin.loading}>
            <div className="login-wrap">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="用户名"
                        />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item label="验证码">
                        <Form.Item
                            name="captcha"
                            rules={[{ required: true, message: 'Please输入验证码!' }]}
                        >
                            <Input placeholder="请输入验证码" id="captcha" />
                        </Form.Item>

                        <img
                            id="captchaImg"
                            ref={handleCaptcha}
                            onClick={() => handleCaptcha(document.getElementById('captchaImg'))}
                        />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};

export default observer(LoginPage);
