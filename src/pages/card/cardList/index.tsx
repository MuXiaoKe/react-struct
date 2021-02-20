import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Table, Form, Modal, Button, Space, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';
import * as api from '@services/index';
import { useRequest, useSetState } from 'ahooks';
import { useIntl } from 'react-intl';
import { axiosDownload } from '@utils/download';
import useFormTable from '@utils/hooks/useFormTable';
import CardSearch from './components/CardSearch';
import DownloadQrcodeModal from './components/DownloadQrcode';
import { appStores } from '@store/index';
import { formatDate, authFilter } from '@utils/index';
import ExcelExport from '@components/ExcelExport';
interface State {
    visible: boolean;
    btnLoading: boolean;
    [key: string]: any;
}
const CardListPage = () => {
    const [form] = Form.useForm();
    const { formatMessage: f } = useIntl();
    const { cardStore } = appStores();
    const history = useHistory();
    const [state, setState] = useSetState<State>({
        visible: false,
        btnLoading: false
    });
    const { _channelCustId, _custId } = useMemo(authFilter, []);
    // 表格搜索数据
    const { tableProps, search } = useFormTable(api.querySimCard, form, (formData: any) => ({
        ..._channelCustId,
        ..._custId,
        ...formData
    }));
    // 号卡分配校验
    const selectNum = useRequest(api.selectNum, {
        manual: true,
        onSuccess: () => {
            history.push('/card/card-list/numcard');
        }
    });
    
    const columns = [
        {
            title: 'ICCID',
            dataIndex: 'iccid',
            key: 'iccid',
            render: (text: string, record: any) =>
                text ? <Link to={`/card/card-list/detail/${text}`}>{text}</Link> : '-'
        },
        {
            title: 'MSISDN',
            dataIndex: 'msisdn',
            key: 'msisdn',
            render: (text: string) => <span>{text ?? '-'}</span>
        },
        {
            title: 'IMSI',
            dataIndex: 'imsi',
            key: 'imsi',
            render: (text: string) => <span>{text ?? '-'}</span>
        },
        {
            title: f({ id: 'common.thestatus' }),
            dataIndex: 'stateCode',
            key: 'stateCode',
            render: (text: string) => <span>{text ?? '-'}</span>
        },
        {
            title: f({ id: 'common.firstCallTime' }),
            dataIndex: 'firstCallTime',
            key: 'firstCallTime',
            render: (text: string) => <span>{text ? formatDate(text) : '-'}</span>
        },
        {
            title: f({ id: 'common.goodsReleaseName' }),
            dataIndex: 'goodsReleaseName',
            key: 'goodsReleaseName',
            render: (text: string) => <span>{text ?? '-'}</span>
        },
        {
            title: f({ id: 'card.useTotal' }),
            dataIndex: 'useTotal',
            key: 'useTotal',
            render: (text: string) => <span>{text ?? '-'}</span>
        },
        // {
        //     title: f({ id: 'card.tag' }),
        //     dataIndex: 'tag',
        //     key: 'tag'
        // },
        {
            title: f({ id: 'card.qrcode' }),
            dataIndex: 'qrcode',
            key: 'qrcode',
            render: (text: string, record: any) => <DownloadQrcodeModal iccid={record.iccid} />
        }
    ];
    // 权限
    const AUTHS_TYPE = JSON.parse(sessionStorage.getItem('AUTHS_TYPE') || '');
    return (
        <div className="cardListPage">
            <CardSearch search={search} form={form} />
            <div className="searchTable-toolbar">
                
            </div>
            <div className="searchTable-wrap">
                <Table
                    columns={columns}
                    rowKey={(record) => record.iccid}
                    scroll={{ x: 980 }}
                    {...tableProps}
                    pagination={{
                        current: tableProps?.pagination?.current,
                        pageSize: tableProps?.pagination?.pageSize,
                        total: tableProps?.pagination?.total,
                        showTotal: (total) => {
                            return `${f({ id: 'common.total' })} ${total} ${f({
                                id: 'common.strip'
                            })}`;
                        }
                    }}
                />
            </div>
            <Modal
                visible={state.visible}
                title={f({ id: 'common.prompt' })}
                onOk={handleOk}
                onCancel={() => {
                    setState({
                        visible: false,
                        btnLoading: false
                    });
                }}
                confirmLoading={state.btnLoading}
            >
                <p>
                    {f({ id: 'card.promptContext' }, { cardNumber: tableProps?.pagination?.total })}
                </p>
            </Modal>
        </div>
    );
};

export default observer(CardListPage);
