import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, message, Spin } from 'antd';
import { observer } from 'mobx-react';
import { useRequest } from '@umijs/hooks';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as api from '@services/index';
import './Register.scss';
import { useForm } from 'antd/lib/form/util';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 }
};
const Register: React.FC = () => {
    const history = useHistory();
    // 登录
    const doRegister = useRequest(api.login, {
        manual: true,
        onSuccess: (result, params) => {
            message.success('注册成功');
            history.push('./login');
        },
        onError: (error, params) => {}
    });
    // 登录提交
    const onFinish = (values: any) => {
        doRegister.run({ ...values });
    };
    const [form] = useForm();
    const onFinishFailed = (errorInfo: any) => {
        form.scrollToField(errorInfo.errorFields[0].name);
        console.log('Failed:', errorInfo.errorFields);
    };
    useEffect(() => {
        console.log('login effect');
    }, []);
    return (
        <Spin spinning={doRegister.loading}>
            <div className="login-wrap">
                <Form
                    {...layout}
                    name="register"
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
                            placeholder="设置用户名"
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
                            placeholder="设置你的登录密码"
                        />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="再次输入你的登录密码"
                        />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};
export default observer(Register);
