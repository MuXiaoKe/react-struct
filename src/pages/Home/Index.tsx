import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import '../../services/config';
import Store from './store';
import { appStores } from '@src/store';
import { Table } from 'antd';
import useSWR from 'swr'; // , { mutate }

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

    const { data: list, error } = useSWR('api/getList');
    // const res = list?.data;
    // console.log(list);
    // useSWR('api/addList', undefined);
    if (error) return <div>failed to load</div>;
    if (!list) return <div>loading...</div>;
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
            {list.map((item: { _id: number; content: string }) => (
                <span key={item._id}>{item.content}</span>
            ))}
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
});
