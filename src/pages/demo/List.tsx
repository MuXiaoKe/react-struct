import React from 'react';
import { Button, Form, Table, Switch, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import * as api from '@services/index';
import { useRequest } from 'ahooks';
import { observer } from 'mobx-react';
import useFormTable from '@utils/hooks/useFormTable';
import BasicSearch from './components/Search';
import { UploadOutlined } from '@ant-design/icons';
export default observer(() => {
    const [form] = Form.useForm();
    const { formatMessage: f } = useIntl();
    let history = useHistory();
    // 表格搜索数据
    const { tableProps, search } = useFormTable(api.getBasicGoodsListPage, form);
    // 删除套餐
    const deleteBasicGoods = useRequest(api.deleteBasicGoods, {
        manual: true,
        cacheKey: 'saveBasicGoods',
        onSuccess: (result) => {
            message.info('保存成功');
        }
    });
    const switchOnChange = (checked: boolean) => {};
    // 删除套餐
    const handleDelPackage = (record: any) => {
        deleteBasicGoods.run({ goodsReleaseId: record.goodsReleaseId });
    };
    const columns = [
        {
            title: f({ id: 'common.operation' }),
            dataIndex: 'action',
            key: 'action',
            render: (text: string, record: any) => (
                <Button type="link" onClick={(record) => handleDelPackage(record)}>
                    删除
                </Button>
            )
        },
        {
            title: f({ id: 'common.status' }),
            dataIndex: 'status',
            key: 'status',
            render: (text: string, record: any) => (
                <Switch checkedChildren="开" unCheckedChildren="关" onChange={switchOnChange} />
            )
        },
        {
            title: f({ id: 'common.goodsReleaseId' }),
            dataIndex: 'goodsReleaseId',
            key: 'goodsReleaseId',
            render: (text: string, record: any) => (
                <Link
                    to={`/billing/package/basicdetail/${record.goodsReleaseId}/${record.tariffType}`}
                >
                    {text}
                </Link>
            )
        },
        {
            title: f({ id: 'common.goodsReleaseName' }),
            dataIndex: 'goodsReleaseName',
            key: 'goodsReleaseName',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: f({ id: 'common.channelCustName' }),
            dataIndex: 'channelCustName',
            key: 'channelCustName',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: f({ id: 'common.goodsType' }),
            dataIndex: 'goodsType',
            key: 'goodsType',
            render: (text: string) => <span>{f({ id: 'common.goodsType.' + text })}</span>
        },
        {
            title: f({ id: 'common.tariffType' }),
            dataIndex: 'tariffType',
            key: 'tariffType',
            render: (text: string) => <span>{f({ id: 'common.tariffType.' + text })}</span>
        },
        {
            title: f({ id: 'common.normPrice' }),
            dataIndex: 'normPrice',
            key: 'normPrice',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: f({ id: 'common.releasePrice' }),
            dataIndex: 'releasePrice',
            key: 'releasePrice',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: f({ id: 'common.operatorsName' }),
            dataIndex: 'operatorsName',
            key: 'operatorsName',
            render: (text: string) => <span>{text}</span>
        }
    ];
    const exportSendRecord = useRequest(api.exportSendRecord, {
        manual: true
    });
    return (
        <div className="search-container">
            <BasicSearch search={search} form={form} />
            <div className="searchTable-toolbar">
                <Button type="primary" onClick={() => history.push('/billing/package/addbasic')}>
                    {f({ id: 'common.table.newAdd' })}
                </Button>
                {/* 下载 */}
                <Button
                    type="link"
                    onClick={() => {
                        // 调用下载请求
                        exportSendRecord.run({ ...form.getFieldsValue() });
                    }}
                    className="text-right fr"
                >
                    <UploadOutlined style={{ fontSize: '18px' }} />
                </Button>
            </div>
            <div className="searchTable-wrap">
                <Table
                    columns={columns}
                    rowKey={(record) => record.goodsReleaseId}
                    scroll={{ x: 1300 }}
                    {...tableProps}
                />
            </div>
        </div>
    );
});
