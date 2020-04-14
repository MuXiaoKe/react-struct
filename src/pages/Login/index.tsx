import React, { useState, useCallback } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Form, Input, Button, message, Spin } from 'antd';
import { observer } from 'mobx-react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';
import { appStores } from '@store/index';
import * as api from '@services/index';
import './index.scss';
interface UserInfo {
    userName?: string;
    authCodes?: any[];
    acconutId?: string;
    loginName?: string;
    deptId?: string;
    deptName?: string;
    roleName?: string;
    roleId?: string;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};
const defaultCaptchaUrl = `./servlet/captchaCode?d=${new Date().getTime()}`;
const LoginPage = (props) => {
    const [allowEnter, setAllowEnter] = useState(false); // 是否可登陆
    const [captchaUrl, setCaptchaUrl] = useState(defaultCaptchaUrl);
    const { globalStore } = appStores();
    let captchaid = '';

    const { loading, run } = useRequest(api.login, {
        manual: true,
        onSuccess: (result, params) => {
            if (result.success) {
                message.success('登陆成功');
            }
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
                        captchaid = xmlhttp.getResponseHeader('captchaid') || '';
                    }
                };
                xmlhttp.send();
            }
        },
        [captchaUrl]
    );
    const getUserInfo = async (cache = true) => {
        if (!cache || !globalStore.userInfo) {
            try {
                const res: Promise<UserInfo> = await api.getUserInfo({});
                if (!res) {
                    setCaptchaUrl(defaultCaptchaUrl); // 更新验证码
                }

                globalStore.setUserInfo(res);
            } catch {
                // 用于解决无线跳转的问题
                globalStore.setUserInfo(null);
            }
        }
    };
    const login = async (param) => {
        try {
            await run(param);
            getUserInfo();
            setAllowEnter(true);
        } catch (err) {
            setCaptchaUrl(`./servlet/captchaCode?d=${new Date().getTime()}`);
            setAllowEnter(false);
            handleCaptcha(document.getElementById('captchaImg'));
        }
    };
    const onFinish = (values: any) => {
        console.log('Success:', values);
        if (allowEnter) {
            login({ ...values, captchaid });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // useEffect(() => {
    //     // 有用户信息跳转到首页
    //     if (globalStore.userInfo) {
    //         useHistory().goBack();
    //     }
    // }, [globalStore.userInfo]);
    console.log(globalStore.userInfo);
    // 有用户信息跳转到首页
    if (globalStore.userInfo) {
        return <Redirect to={useLocation()?.state?.from || './'} />;
    }
    return (
        <Spin spinning={loading}>
            <div className="login-wrap">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item label="验证码">
                        <Form.Item
                            name="captcha"
                            rules={[{ required: true, message: 'Please输入验证码!' }]}
                        >
                            <Input
                                placeholder="请输入验证码"
                                id="captcha"
                                onChange={() => setAllowEnter(true)}
                            />
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
