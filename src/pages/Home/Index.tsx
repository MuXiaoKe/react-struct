import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import '../../services/config';
import Store from './store';
import { appStores } from '@src/store';
import { Table } from 'antd';

export default observer(function IndexPage() {
    // useContext 订阅mobx数据
    const { pageTitle, setTitle } = useContext(Store);

    const { globalStore } = appStores();

    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address'
        }
    ];

    return (
        <div>
            <div>{pageTitle}</div>
            <div>{globalStore.userInfo.loginName}</div>
            <button
                onClick={() => {
                    setTitle('zzzzz');
                }}
            >
                click
            </button>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
});
