import React, { useState, useCallback } from 'react';
import { useLocation, useHistory, Redirect, Link } from 'react-router-dom';
import { Form, Input, Button, message, Spin, Modal } from 'antd';
import { observer } from 'mobx-react';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { appStores } from '@store/index';
import * as api from '@services/index';
import './style/login.scss';
import { useIntl } from 'react-intl';
import { hasUserInfo, getAesString } from '@utils/index';
import { auths } from '@src/constants/auth';

// import CommonHeader from './components/CommonHeader';
import logo from '@assets/image/logo-do.png';
import Policy from './components/Policy';
import Callcenter from './components/Callcenter';
import Business from './components/Business';

const LoginPage: React.FC = () => {
    const { formatMessage: f } = useIntl();
    const history = useHistory();
    const { globalStore } = appStores();
    const [form] = Form.useForm();
    const [token, setToken] = useState();
    // 登录
    const doLogin = useRequest(api.login, {
        manual: true,
        onSuccess: (result, params) => {
            message.success('登录成功');
            // 设置token数据
            const token = result['accessToken'];
            // 用户角色id
            const roleId = result['roleId'];
            // 用户名
            const loginName = result['loginName'];
            // 账户
            const accountId = result['accountId'];
            // 企业客户id
            const channelCustId = result['channelCustId'];
            // 二级客户id
            const custId = result['custId'];
            // console.log(custId);
            token && sessionStorage.setItem('access_token', token);
            roleId && sessionStorage.setItem('roleId', roleId);
            loginName && sessionStorage.setItem('loginName', loginName);
            accountId && sessionStorage.setItem('accountId', accountId);
            sessionStorage.setItem('channelCustId', channelCustId);
            sessionStorage.setItem('custId', custId);
            // 权限码
            auths(Number(roleId));
            history.push('./');
        },
        onError: (err: any, params) => {
            // 重新获取验证码
            getCaptcha.run({});
            message.error(`登录失败, ${err?.msg}!`);
            form.resetFields(['captcha']);
        }
    });
    const getCaptcha = useRequest(api.getCaptcha, {
        // manual: true,
        cacheKey: 'getCaptcha',
        onSuccess: (result) => {
            // message.info('获取验证码成功');
            setToken(result.token);
        }
    });

    // 登录提交
    const onFinish = (values: any) => {
        // console.log(values);
        const username = values.username; // getAesString(values.username, '46cx793c53dc451a', '46cx793c53dc451a');
        const password = getAesString(values.password, '46cx793c53dc451a', '46cx793c53dc451a');
        doLogin.run({ username, password, token, captcha: values.captcha });
    };
    const onFinishFailed = (errorInfo: any) => {
        form.scrollToField(errorInfo.errorFields[0].name);
    };
    // 是否20003 超时登出了
    const isTimeout = () => {
        const paramsArr = location.hash?.split('?')[1]?.split('=');
        return paramsArr?.[0] === 'status' && paramsArr?.[1] === '20003';
    };
    const result = useLocation()?.state;
    // 有用户信息跳转到首页
    if (hasUserInfo() && !isTimeout()) {
        return <Redirect to={result?.from || './'} />;
    }
    return (
        <Spin spinning={doLogin.loading}>
            <div className="login-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="login-wrap">
                <div className="login-box">
                    <h1>{f({ id: 'user.login.login' })}</h1>
                    <p className="sub-h1">{f({ id: 'user.login.welcome' })}</p>
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
                                {
                                    required: true,
                                    message:
                                        f({ id: 'user.login.requiredUser' }) ||
                                        '必填项，请输入登录帐号'
                                }
                                // {
                                //     pattern: /^([A-Za-z0-9]{6,20})$/,
                                //     message: '登录帐号由6-20个字母数字组合'
                                // }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder={f({ id: 'user.login.enterUser' }) || '请输入用户名'}
                                className="login-input"
                                autoFocus
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        f({ id: 'user.login.requiredPassword' }) ||
                                        '必填项，请输入密码'
                                }
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
                                placeholder={f({ id: 'user.login.enterPassword' }) || '请输入密码'}
                                className="login-input"
                            />
                        </Form.Item>

                        <Form.Item className="captcha-wrap">
                            <Form.Item
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            f({ id: 'user.login.enterVerifCode' }) || '请输入验证码'
                                    }
                                ]}
                                noStyle
                            >
                                <Input
                                    prefix={<SafetyOutlined />}
                                    placeholder={
                                        f({ id: 'user.login.enterVerifCode' }) || '请输入验证码'
                                    }
                                    id="captcha"
                                    className="login-input captcha-input"
                                />
                            </Form.Item>
                            <img
                                id="captchaImg"
                                className="captchaImg"
                                src={getCaptcha?.data?.img}
                                onClick={() => getCaptcha.run({})}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-submit">
                                {f({ id: 'user.login.login' }) || '登录'}
                            </Button>
                        </Form.Item>
                        {/* <Form.Item noStyle>
                            <Button type="link" className="forget-password">
                                {f({ id: 'user.login.forgetPassword' }) || '忘记密码？'}
                            </Button>
                        </Form.Item> */}
                    </Form>
                    {/* <div className="navToRegister">
                        <Link to="/register">免费注册</Link>
                    </div> */}
                </div>
            </div>
            <div className="login-footer">
                <ul className="friendly-link">
                    <li>
                        <a href="https://www.lenovoconnect.com/cn/" target="_blank">
                            {f({ id: 'user.login.aboutus' }) || '关于我们'}
                        </a>
                    </li>
                    <li>
                        <Policy />
                    </li>
                    <li>
                        <Callcenter />
                    </li>
                    <li>
                        <Business />
                    </li>
                </ul>
                <div className="cut-off-line" />
                <div className="copyright">
                    {f({ id: 'user.login.copyright' })} © 2019 <br /> lenovoconnect.com
                    <a href="https://beian.miit.gov.cn/" target="_blank">
                        粤ICP备17107023号-1
                    </a>
                </div>
            </div>
        </Spin>
    );
};

export default observer(LoginPage);
