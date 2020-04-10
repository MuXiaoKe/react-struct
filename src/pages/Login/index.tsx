import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { useRequest } from '@umijs/hooks';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

const LoginPage = () => {
    const [allowEnter, setAllowEnter] = useState(false); // 是否可登陆
    const [captchaUrl, setCaptchaUrl] = useState(`./servlet/captchaCode?d=${new Date().getTime()}`);
    let captchaid = '';

    // const { loading, run } = useRequest(changeUsername, {
    //     manual: true,
    //     onSuccess: (result, params) => {
    //       if (result.success) {
    //         setState('');
    //         message.success(`The username was changed to "${params[0]}" !`);
    //       }
    //     }
    //   });
    // 请求验证码
    const handleCaptcha = (img) => {
        // const that = this;
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
                    captchaid = xmlhttp.getResponseHeader('captchaid') || '';
                }
            };
            xmlhttp.send();
        }
    };
    const login = async (param) => {
        try {
            // await this.api.doLogin(param);
            // getUserInfo();
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

    return (
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

            <Form.Item>
                <Input
                    placeholder="请输入验证码"
                    id="captcha"
                    onChange={() => setAllowEnter(true)}
                />
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
    );
};

export default LoginPage;
