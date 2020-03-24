import React from 'react';

const context: any = {};

const req = require.context('.', true, /Store$/);
console.log(req);
req.keys().forEach((key) => {
    const name = key.match(/([a-zA-Z0-9].*)$/)?.[1]; // 通过可选链来优化null和undefined的情况
    const Store = req(key).default;
    name && (context[name] = new Store());
});

export const storesContext = React.createContext(context);

export function appStores() {
    return React.useContext(storesContext);
}
