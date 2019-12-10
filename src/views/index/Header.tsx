import React from "react";
import "./index.scss";
import { Layout, Menu } from "antd";

// const { SubMenu } = Menu;
const { Header } = Layout;

const Zhead = () => {
    return (
        <Header className="header">
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                style={{ lineHeight: "64px" }}
            >
                <Menu.Item key="1">每日清单</Menu.Item>
                <Menu.Item key="2">记账</Menu.Item>
                <Menu.Item key="3">备忘</Menu.Item>
            </Menu>
        </Header>
    );
};
export default Zhead;
