/* eslint-disable */
declare let process: {
    env: {
        NODE_ENV: string;
        APP_ENV: string;
        BASEURL: string;
    };
};

declare module '*.css' {
    interface IClassNames {
        [className: string]: string;
    }

    const classNames: IClassNames;
    export = classNames;
}

declare module '*.gif';

declare module '*.png';

declare module '*.jpg';

declare module '*.json';

declare interface PlainObject {
    [propName: string]: any;
}

declare interface BooleanObject {
    [propName: string]: boolean;
}

declare interface StringObject {
    [propName: string]: string;
}

declare interface NumberObject {
    [propName: string]: number;
}

declare global {
    interface Window {
        BMap: typeof BMap;
    }
}
