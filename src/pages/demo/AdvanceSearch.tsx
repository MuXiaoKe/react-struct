/**
 * title: Form and Table data binding
 * desc: useAntdTable returns a search object after receiving a form instance.
 *
 * title.zh-CN: Form 与 Table 联动
 * desc.zh-CN: useAntdTable 接收 form 实例后，会返回 search 对象。
 */

import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Row, Table } from 'antd';
// import { useRequest } from 'ahooks';
import { useIntl } from 'react-intl';
import * as api from '@services/index';

import { observer } from 'mobx-react';
import SearchBtns from '@components/SearchBtns';
import useFormTable from '@utils/hooks/useFormTable';
import TableColSetting from '@components/TableColSetting';
import useTableHead from '@components/TableColSetting/useTableHead';

import ModalC from '@components/Modal/index';

const SEARCH_ITEM = {
    labelCol: {
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 8 },
        xl: { span: 8 },
        xxl: { span: 6 }
    },
    wrapperCol: {
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 16 },
        xl: { span: 16 },
        xxl: { span: 18 }
    }
};
export default observer(() => {
    const [form] = Form.useForm();
    const { formatMessage: f } = useIntl();
    // 表格搜索数据
    const { tableProps, search } = useFormTable(api.queryProductList, form);
    const { type } = search;
    const columns = [
        {
            title: '产品名称',
            dataIndex: 'pdName',
            key: 'pdName',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: '产品分类',
            dataIndex: 'pdTypeName',
            key: 'pdTypeName',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: '设备类型',
            dataIndex: 'nodeTypeName',
            key: 'nodeTypeName',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text: string, record: any) => <Button>删除</Button>
        }
    ];
    // 公共搜索项
    const commonSeachForm = (
        <>
            <Col span={6}>
                <Form.Item label="pdName" name="pdName">
                    <Input placeholder="pdName" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="pdId" name="pdId">
                    <Input placeholder="pdId" />
                </Form.Item>
            </Col>
        </>
    );
    // 高级搜索
    const advanceSearchForm = (
        <div className="search-form">
            <Form form={form} {...SEARCH_ITEM}>
                <Row gutter={10}>
                    {commonSeachForm}
                    <SearchBtns search={search} length={2} />
                </Row>
            </Form>
        </div>
    );
    // 简易搜索
    const searchFrom = (
        <div className="search-form">
            <Form form={form} {...SEARCH_ITEM}>
                <Row gutter={10}>
                    {commonSeachForm}
                    <SearchBtns search={search} length={2} />
                </Row>
            </Form>
        </div>
    );
    // 表格头设置
    const { store, tableSetting } = useTableHead(columns);
    return (
        <div className="search-container">
            {type === 'simple' ? searchFrom : advanceSearchForm}
            <div className="searchTable-toolbar">
                <ModalC title="test" btnName="test">
                    <div>1231</div>
                </ModalC>
                {/* 表格设置 */}
                <span className="fr">
                    {store.tableHead.length > 0 && (
                        <TableColSetting
                            title={f({ id: 'components.tableColSetting.TableSetting' })}
                            initData={columns}
                            currentData={store.tableHead}
                            onOk={tableSetting}
                        />
                    )}
                </span>
            </div>
            <div className="searchTable-wrap">
                <Table columns={store.tableHead} rowKey={(record) => record.pdId} {...tableProps} />
            </div>
        </div>
    );
});
