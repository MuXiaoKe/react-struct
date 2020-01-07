import React from 'react';
import { Layout } from 'antd';
import SiderMenu from '../SiderMenu';
import MainHeader from '../MainHeader';
// import MainFooter from "../MainFooter";

import './style.scss';
interface Istate {
    collapsed?: boolean;
}
interface Itype {
    type: string;
}
interface IContextProps {
    state?: Istate;
    dispatch?: React.Dispatch<Itype>;
}
const menuInitState: Istate = { collapsed: false };

function menuReducer(state: Istate, action: Itype): Istate {
    switch (action.type) {
        case 'toggle':
            return { collapsed: !state.collapsed };
        default:
            throw new Error();
    }
}
const _context: IContextProps = {};
export const CollapsedContext = React.createContext(_context);

const BasicLayout = ({ route, children }) => {
    const [state, dispatch] = React.useReducer(menuReducer, menuInitState);
    // console.log(route, children);
    return (
        <CollapsedContext.Provider value={{ state, dispatch }}>
            <Layout className="main-layout">
                <SiderMenu routes={route.children} />
                {/* 左侧菜单导航 */}
                <Layout className="main-layout-right">
                    <MainHeader />
                    <Layout.Content className="main-layout-content">
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>
        </CollapsedContext.Provider>
    );
};

export default BasicLayout;
