import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { useIntl } from 'react-intl';
import { observer, useLocalStore } from 'mobx-react';
import SearchBtns from '@components/SearchBtns';

import { SEARCH_ITEM } from '@src/constants/index';
import FormCommonItems from '@components/FormCommonItems/index';
const { Option } = Select;
interface IBasicSearch {
    search: { type: string };
    form: any;
}
const BasicSearch: React.FC<IBasicSearch> = observer((props) => {
    const { formatMessage: f } = useIntl();
    const { search, form } = props;
    const { type } = search;
    // store
    const basicSearchStore = useLocalStore(() => ({
        modeType: '',
        setModeType(val: string) {
            basicSearchStore.modeType = val;
        },
        goodsType: '',
        setGoodsType(val: string) {
            basicSearchStore.goodsType = val;
        }
    }));
    const handleGoodsTypeChange = (value: string) => {
        basicSearchStore.setGoodsType(value);
        form.resetFields(['tariffType']);
    };
    // 公共搜索项
    const commonSeachForm = (
        <>
            <Col span={6}>
                <Form.Item label={f({ id: 'common.goodsReleaseId' })} name="goodsReleaseId">
                    <Input
                        placeholder={
                            f({ id: 'common.plzinput' }) + f({ id: 'common.goodsReleaseId' })
                        }
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={f({ id: 'common.goodsReleaseName' })} name="goodsReleaseName">
                    <Input
                        placeholder={
                            f({ id: 'common.plzinput' }) + f({ id: 'common.goodsReleaseName' })
                        }
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <FormCommonItems.ChannelCustSelect form={form} />
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
                        <FormCommonItems.GoodsTypeSelect
                            form={form}
                            handleChange={handleGoodsTypeChange}
                        />
                    </Col>
                    <Col span={6}>
                        <FormCommonItems.TariffTypeSelect
                            form={form}
                            goodsType={basicSearchStore.goodsType}
                        />
                    </Col>
                    <Col span={6}>
                        <FormCommonItems.ReleaseCycleSelect form={form} />
                    </Col>
                    <Col span={6}>
                        <FormCommonItems.ModeTypeSelect
                            form={form}
                            handleChange={(val) => {
                                basicSearchStore.setModeType(val);
                                form.resetFields(['operatorsId']);
                            }}
                        />
                    </Col>
                    <Col span={6}>
                        <FormCommonItems.OperatorsSelect
                            form={form}
                            modeType={basicSearchStore.modeType}
                        />
                    </Col>
                    <Col span={6}>
                        <Form.Item label={f({ id: 'common.status' })} name="status">
                            <Select
                                allowClear
                                className=""
                                placeholder={
                                    f({ id: 'common.plzselect' }) + f({ id: 'common.status' })
                                }
                            >
                                <Option key="status1" value="1">
                                    {f({ id: 'billing.status.1' })}
                                </Option>
                                <Option key="status2" value="2">
                                    {f({ id: 'billing.status.2' })}
                                </Option>
                                <Option key="status3" value="3">
                                    {f({ id: 'billing.status.3' })}
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <SearchBtns search={search} length={9} />
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
                    <SearchBtns search={search} length={9} />
                </Row>
            </Form>
        </div>
    );
    return <div>{type === 'simple' ? searchFrom : advanceSearchForm}</div>;
});
export default BasicSearch;
