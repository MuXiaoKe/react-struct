import React, { Suspense } from 'react';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LoadingPage from '@src/components/LoadingPage';
import config from './config';

const renderRoutes = (routes) => {
    if (!Array.isArray(routes)) {
        return null;
    }

    return (
        <Switch>
            {routes.map((route, index) => {
                if (route.redirect) {
                    return (
                        <Redirect
                            key={route.path || index}
                            exact={route.exact}
                            strict={route.strict}
                            from={route.path}
                            to={route.redirect}
                        />
                    );
                }

                return (
                    <Route
                        key={route.path || index}
                        path={route.path}
                        exact={route.exact}
                        strict={route.strict}
                        render={() => {
                            const renderChildRoutes = renderRoutes(route.children);
                            if (route.component) {
                                return (
                                    <Suspense fallback={<LoadingPage />}>
                                        <route.component route={route}>
                                            {renderChildRoutes}
                                        </route.component>
                                    </Suspense>
                                );
                            }
                            return renderChildRoutes;
                        }}
                    />
                );
            })}
        </Switch>
    );
};

const AppRouter = () => {
    console.log(renderRoutes(config));
    return <Router>{renderRoutes(config)}</Router>;
};

export default AppRouter;
