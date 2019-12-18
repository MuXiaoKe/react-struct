import React from 'react';
import '../../http/config';

import { Layout } from 'antd';

import {HeadWidthMenu} from './Header'; // 头部
import Zbreadcrumb from './Breadcrumb'; // 面包屑
// import Zsider from './Sider'; // 侧边栏
import Zcontent from './Content'; // 侧边栏

import './index.scss';

interface Istate {
    collapsed?: boolean;
}
interface Itype {
    type: string;
}
interface IContextProps {
    state?: Istate;
    dispatch?: React.Dispatch<Itype>
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

export default function IndexPage() {
    const [state, dispatch] = React.useReducer(menuReducer, menuInitState);
    return (
        <CollapsedContext.Provider value={{ state, dispatch }}>
            <Layout>
                {/* <Zsider /> */}
                {/* <Layout> */}
                    <HeadWidthMenu />
                    <Layout style={{ padding: '0 50px', marginTop: 64 }}>
                        <Zbreadcrumb />
                        <Zcontent />
                        <Layout.Footer style={{ textAlign: 'center' }}>Created by ZH</Layout.Footer>
                    </Layout>
                {/* </Layout> */}
            </Layout>
        </CollapsedContext.Provider>
    );
}
