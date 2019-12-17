import React from "react";
import "./index.scss";
import { Layout, Icon } from "antd";

// const { SubMenu } = Menu;
const { Header } = Layout;
// interface Istate {
//     collapsed: boolean
// }
// interface Itype {
//     type: string
// }

const Zhead = () => {
    // const menuInitState:Istate = { collapsed: false };

    // function menuReducer(state:Istate, action:Itype):Istate {
    //     switch (action.type) {
    //         case "toggle":
    //             return { collapsed: !state.collapsed };
    //         default:
    //             throw new Error();
    //     }
    // }
    // const [state, dispatch] = useReducer(menuReducer, menuInitState);
    // const {state, dispatch} = useMenu()
    return (
        // state.collapsed ? 'menu-unfold' : 'menu-fold'
        <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
                className="menuTrigger"
                type='menu-fold'
                // onClick={() =>{dispatch({type:'toggle'})}}
            />
        </Header>
    );
};
export default Zhead;
