import React from "react";
import "../../http/config";

import { Layout } from 'antd';

import Zhead from './Header' // 头部
import Zbreadcrumb from './Breadcrumb' // 面包屑
import Zsider from './Sider' // 侧边栏
import Zcontent from './Content' // 侧边栏
import "antd/dist/antd.css";
import "./index.scss";

const IndexPage = () => {
    return (
        <Layout>
            <Zhead />
            <Layout>
                <Zsider />
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Zbreadcrumb />
                    <Zcontent />
                </Layout>
            </Layout>
        </Layout>
    );
};
export default IndexPage;
