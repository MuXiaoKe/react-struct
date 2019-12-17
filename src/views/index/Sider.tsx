import React from "react";
import "../../http/config";
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
const { SubMenu } = Menu;

// interface Istate {
//     collapsed: boolean
// }
// interface Itype {
//     type: string
// }

const Zsider = () => {
    // const menuInitState:Istate = { collapsed: false };

    // function menuReducer(state:Istate, action:Itype):Istate {
    //     switch (action.type) {
    //         case "toggle":
    //             return { collapsed: !state.collapsed };
    //         default:
    //             throw new Error();
    //     }
    // }
    // const [state] = useReducer(menuReducer, menuInitState);
    return (
        // state.collapsed
        <Sider width={200} trigger={null} collapsible collapsed={false}>
            <div
                className="logo"
                style={{
                    height: "64px",
                    lineHeight: "64px",
                    color: "#FFF",
                    textAlign: "center"
                }}
            >
                My App
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
                theme="dark"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="user" />
                            每日清单
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
                            记账
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
                            备忘
                        </span>
                    }
                >
                    <Menu.Item key="9">option9</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};
export default Zsider;
