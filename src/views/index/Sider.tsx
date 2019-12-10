import React from "react";
import "../../http/config";
import { Layout, Menu, Icon } from 'antd';
const {  Sider } = Layout;
const { SubMenu } = Menu;
const Zsider = () => {
    return (
        <Sider width={200} style={{ background: "#fff" }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="user" />
                            subnav 1
                        </span>
                    }
                >
                    <Menu.Item key="1">option1</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="laptop" />
                            subnav 2
                        </span>
                    }
                >
                    <Menu.Item key="5">option5</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={
                        <span>
                            <Icon type="notification" />
                            subnav 3
                        </span>
                    }
                >
                    <Menu.Item key="9">option9</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
}
export default Zsider