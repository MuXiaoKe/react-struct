import React from "react";
import "../../http/config";
import { Layout } from 'antd';
const { Content } = Layout;

const Zcontent = () => {
    return (
        <Content
            style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
            }}
        >
            Content
        </Content>
    );
};
export default Zcontent;
