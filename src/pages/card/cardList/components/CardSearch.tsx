import React, { useState } from 'react';
import { Col, Form, Input, Row, Select, DatePicker } from 'antd';
import { useIntl } from 'react-intl';
import { observer, useLocalStore } from 'mobx-react';
import * as api from '@services/index';
import { useRequest } from 'ahooks';
import SearchBtns from '@components/SearchBtns';
import { SEARCH_ITEM, CARD_STATUS, PATTERN } from '@src/constants/index';
import FormCommonItems from '@components/FormCommonItems/index';
import { authFilter } from '@utils/index';
const { Option } = Select;

interface ICardSearch {
    search: { type: string };
    form: any;
}
interface LooseObject {
    [key: string]: any;
}
const CardSearch: React.FC<ICardSearch> = observer((props) => {
    const { formatMessage: f } = useIntl();
    const { search, form } = props;
    const { type } = search;
    const { noChannelCustId, noCustId, _channelCustId } = authFilter();
    const SEARCH_COUNT = noChannelCustId ? 15 : noCustId ? 13 : 12; // 搜索数量
    // store
    const cardSearchStore: LooseObject = useLocalStore(() => ({
        channelCustId: _channelCustId?.channelCustId,
        goodsType: undefined,
        modeType: undefined,
        setVal(property: string, val: string | number) {
            cardSearchStore[property] = val;
        }
    }));
    // 企业变动
    const handleChannelCustChange = (value: string | number) => {
        cardSearchStore.setVal('channelCustId', value);
    };
    const [startIccid, setStartIccid] = useState();
    // 判断
    const handleIccidChange = (e: any) => {
        setStartIccid(e.target.value);
    };
    // 公共搜索项
    const commonSeachForm = (
        <>
            <Col span={6}>
                <FormCommonItems.BasicInput
                    requred={false}
                    placeholder="ICCID,MSISDN,IMSI"
                    label="card.numCard"
                    name="paramNum"
                />
            </Col>
            <Col span={6}>
                <FormCommonItems.ModeTypeSelect
                    form={form}
                    handleChange={(val) => {
                        cardSearchStore.setVal('modeType', val);
                        form.resetFields(['operatorsId']);
                    }}
                />
            </Col>
            <Col span={6}>
                <FormCommonItems.OperatorsSelect
                    requred={false}
                    form={form}
                    modeType={cardSearchStore.modeType}
                />
            </Col>
        </>
    );
    // 高级搜索
    const advanceSearchForm = (
        <div className="search-form">
            <Form form={form} {...SEARCH_ITEM}>
                <Row gutter={10}>
                    {commonSeachForm}
                    <Col span={6}>
                        <Form.Item label={f({ id: 'common.thestatus' })} name="stateCode">
                            <Select
                                allowClear
                                placeholder={
                                    f({ id: 'common.plzselect' }) + f({ id: 'common.thestatus' })
                                }
                            >
                                {Object.entries(CARD_STATUS).map((item) => {
                                    return (
                                        <Option value={item[0]} key={item[0]}>
                                            {item[1]}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    {noChannelCustId && (
                        <Col span={6}>
                            <FormCommonItems.ChannelCustSelect
                                form={form}
                                handleChange={handleChannelCustChange}
                            />
                        </Col>
                    )}
                    {noCustId && (
                        <Col span={6}>
                            <FormCommonItems.CustSelect
                                form={form}
                                channelCustId={cardSearchStore.channelCustId}
                            />
                        </Col>
                    )}

                    <Col span={6}>
                        <FormCommonItems.BasicInput requred={false} f_label="eID" name="eid" />
                    </Col>
                    <Col span={6}>
                        <Form.Item label={f({ id: 'card.isCommercial' })} name="isCommercial">
                            <Select
                                allowClear
                                placeholder={
                                    f({ id: 'common.plzselect' }) + f({ id: 'card.isCommercial' })
                                }
                            >
                                <Option value={1} key="isCommercial1">
                                    是
                                </Option>
                                <Option value={0} key="isCommercial0">
                                    否
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label={f({ id: 'common.apnNum' })} name="apn">
                            <Select
                                allowClear
                                placeholder={
                                    f({ id: 'common.plzselect' }) + f({ id: 'common.apnNum' })
                                }
                            >
                                {[1, 2, 3, 4, 5].map((item) => {
                                    return (
                                        <Option value={item} key={item}>
                                            {item}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    {noChannelCustId && (
                        <Col span={6}>
                            <FormCommonItems.BasicInput
                                requred={false}
                                label="card.importBatchId"
                                name="batchId"
                            />
                        </Col>
                    )}

                    <Col span={6}>
                        <FormCommonItems.BasicInput
                            requred={false}
                            label="card.startIccid"
                            name="startIccid"
                            handleChange={handleIccidChange}
                        />
                    </Col>
                    <Col span={6}>
                        <FormCommonItems.BasicInput
                            requred={startIccid ? true : false} // startIccid ? true : false
                            label="card.endIccid"
                            name="endIccid"
                        />
                    </Col>
                    <Col span={6}>
                        <FormCommonItems.BasicInput
                            requred={false}
                            label="card.simTradeId"
                            name="simTradeId"
                        />
                    </Col>
                    <Col span={6}>
                        <FormCommonItems.BasicInput
                            requred={false}
                            label="card.customfieldOne"
                            name="customfieldOne"
                        />
                    </Col>
                    <Col span={6}>
                        <FormCommonItems.BasicInput
                            requred={false}
                            label="card.customfieldTwo"
                            name="customfieldTwo"
                        />
                    </Col>
                    <SearchBtns search={search} length={SEARCH_COUNT} form={form} />
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
                    <SearchBtns search={search} length={SEARCH_COUNT} form={form} />
                </Row>
            </Form>
        </div>
    );
    return <div>{type === 'simple' ? searchFrom : advanceSearchForm}</div>;
});
export default CardSearch;
