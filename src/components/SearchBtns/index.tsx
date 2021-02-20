import React from 'react';
import { Button, Col, Form } from 'antd';
// import { useAntdTable } from 'ahooks';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import './style.scss';
// 有多少个表单项
const calculateOffset = (shownCount: number): number => {
    return (4 - ((shownCount + 1) % 4 || 4)) * 6;
};
interface SearchBtnsProps {
    search: any; // useAntdTable 得search 对象
    length: number; // formitem 得数量
    form?: any; // 搜索表单
    offset?: number;
}

const SearchBtns: React.FC<SearchBtnsProps> = (props) => {
    const { formatMessage: f } = useIntl();
    const { search, length, form, offset } = props;
    const { type, changeType, submit, reset } = search;
    // 是否是 展开得
    const expand = type === 'advance' ? true : false;
    // 计算页面一开始展示几个查询条件(若为展开模式或总共的查询条件数量小于等于3,则按实际的查询条件展示,否则只展示前3个)
    const shownCount = expand || length <= 3 ? length : offset ? offset : 3;
    // common按钮
    // 搜索信息
    const searchInfo = () => {
        form
            ? form.validateFields().then(() => {
                  submit();
              })
            : submit();
    };
    const commonBtn = (
        <Col span={6} offset={calculateOffset(shownCount)}>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <Button type="primary" onClick={searchInfo}>
                    {f({ id: 'components.advanceSearch.search' })}
                </Button>
                <Button onClick={reset} style={{ marginLeft: 10 }}>
                    {f({ id: 'components.advanceSearch.reset' })}
                </Button>
                {length > 3 && (
                    <a style={{ marginLeft: 10 }} onClick={changeType}>
                        {f({
                            id: expand
                                ? 'components.advanceSearch.simpleSearch'
                                : 'components.advanceSearch.advancedSearch'
                        })}
                        {expand ? <UpOutlined /> : <DownOutlined />}
                    </a>
                )}
            </div>
        </Col>
    );
    return commonBtn;
};
export default SearchBtns;
