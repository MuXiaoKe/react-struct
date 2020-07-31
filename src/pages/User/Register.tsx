import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, message, Spin, Checkbox, Modal } from 'antd';
import { observer } from 'mobx-react';
import { useRequest } from 'ahooks';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import * as api from '@services/index';
import './style/Register.scss';

import CommonHeader from './components/CommonHeader';
import iconRight from '@assets/image/icon4.png';
const Register: React.FC = () => {
    // const history = useHistory();
    // 注册
    const doRegister = useRequest(api.register, {
        manual: true,
        onSuccess: (result, params) => {
            message.success('注册成功');
            // history.push('./login');
            setVisible(true);
        },
        onError: (error, params) => {}
    });

    const [visible, setVisible] = useState(false);
    const handleCancel = () => {
        setVisible(false);
    };
    // 登录提交
    const onFinish = (values: any) => {
        console.log({ values });
        doRegister.run({ ...values });
    };
    const [form] = Form.useForm();
    const onFinishFailed = (errorInfo: any) => {
        form.scrollToField(errorInfo.errorFields[0].name);
        console.log('Failed:', errorInfo.errorFields);
    };
    useEffect(() => {
        console.log('login effect');
    }, []);
    // 确认密码认证
    const checkPassword = (rule: any, value: string) => {
        if (value && value !== form.getFieldValue('password')) {
            return Promise.reject('两次输入必须一致');
        } else {
            return Promise.resolve();
        }
    };
    return (
        <Spin spinning={doRegister.loading}>
            <CommonHeader />
            <Modal visible={visible} footer={null} onCancel={handleCancel}>
                <div className="_modal-wrap modal-center">
                    <img src={iconRight} alt="checked" className="tips-img" />
                    <div className="tips-text">
                        <span>{form.getFieldValue('username')}</span>
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>注册成功</span>
                    </div>
                    <Button className="big-button">
                        <Link to="/login">去登录</Link>
                    </Button>
                </div>
            </Modal>
            <div className="resgister-wrap">
                <div className="resgister-box">
                    <h1>欢迎注册</h1>
                    <Form
                        name="register"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '必填项，请输入登录帐号' },
                                // {validator: this.checkName}, // 验证是否同名
                                {
                                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,50}$/,
                                    message: '登录帐号由5-50个字母数字组合'
                                },
                                { max: 50, message: '长度不可超过50' },
                                { min: 5, message: '长度不可少于5' }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="设置用户名"
                                className="login-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: '必填项，请输入密码' },
                                {
                                    pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,20}$/,
                                    message: '密码由6-20个字母、数字、标点符号组合'
                                },
                                { max: 20, message: '长度不可超过20' }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="设置你的登录密码"
                                className="login-input"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: '必填项，请确认密码' },
                                { validator: checkPassword }
                            ]}
                        >
                            <Input
                                prefix={<SafetyOutlined />}
                                type="password"
                                placeholder="再次输入你的登录密码"
                                className="login-input"
                            />
                        </Form.Item>
                        <Form.Item
                            name="agree"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject('请勾选同意协议')
                                }
                            ]}
                        >
                            <Checkbox>
                                <span>我已阅读并同意</span> <a href="#">《Pandora系统服务条款》</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-register">
                                同意条款并注册
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="navToLogin">
                        <Link to="/login">使用已有账户登录</Link>
                    </div>
                </div>
            </div>
        </Spin>
    );
};
export default observer(Register);
