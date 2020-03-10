import React, { SFC } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
// import { Switch, Route } from "react-router-dom";
// import routes from "../../router/config";

// export const ContentRoute:SFC = () => {
//     console.log(routes)
//     return (
//         <Switch>
//             {routes.map((route, index) => (
//                 <Route
//                     key={index}
//                     path={route.path}
//                     exact={route.exact}
//                     render={props => (
//                         <route.component {...props} routes={route.routes} />
//                     )}
//                 />
//             ))}

//         </Switch>

//     );
// };
const Zcontent: SFC = () => {
    return (
        <Content
            style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280
            }}
        >
            {/* <ContentRoute />  */}
        </Content>
    );
};
export default Zcontent;
