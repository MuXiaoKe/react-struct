import React from "react";
import "../../http/config";
import { Breadcrumb } from 'antd';

const Zbreadcrumb = () => {
    return (
        <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
    )
}
export default Zbreadcrumb