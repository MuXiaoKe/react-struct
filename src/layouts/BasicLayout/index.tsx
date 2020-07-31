import React, { FC } from 'react';
import { Layout } from 'antd';
import SiderMenu from '../SiderMenu';
import MainHeader from '../MainHeader';
// import MainFooter from "../MainFooter";
import ZBreadcrumb from '../Breadcrumb';

import { breadcrumbRoutes } from '@src/router/config.ts';

import './style.scss';
// interface Istate {
//     collapsed?: boolean;
// }
// interface Itype {
//     type: string;
// }
// interface IContextProps {
//     state?: Istate;
//     dispatch?: React.Dispatch<Itype>;
// }
// const menuInitState: Istate = { collapsed: false };

// function menuReducer(state: Istate, action: Itype): Istate {
//     switch (action.type) {
//         case 'toggle':
//             return { collapsed: !state.collapsed };
//         default:
//             throw new Error();
//     }
// }
// const _context: IContextProps = {};
// export const CollapsedContext = React.createContext(_context);

const BasicLayout: FC<{ route: any; children: React.ReactNode }> = ({ route, children }) => {
    // const [state, dispatch] = React.useReducer(menuReducer, menuInitState);
    return (
        // <CollapsedContext.Provider value={{ state, dispatch }}>
        <Layout className="main-layout">
            {/* <SiderMenu routes={route.children} /> */}
            <SiderMenu routes={breadcrumbRoutes} />
            {/* 左侧菜单导航 */}
            <Layout className="main-layout-right">
                <MainHeader />
                <Layout.Content className="main-layout-content">
                    <div className="mb15">
                        <ZBreadcrumb />
                    </div>
                    <div className="mian-container">{children}</div>
                </Layout.Content>
            </Layout>
        </Layout>
        // </CollapsedContext.Provider>
    );
};

export default BasicLayout;
