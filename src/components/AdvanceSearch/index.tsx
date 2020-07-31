import React, { useState } from 'react';
import { Form, Row, Col, Input, Select, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './style.scss';
import { DATA_ENTRY } from '@src/constants/indexC';
import SelecC from '@src/components/Select/enums';

interface FormObject {
    title: string;
    dataIndex: string;
    type: string;
    placeholder?: string;
    rules?: any[]; // 限制规则
}

interface ComponentProps {
    dataSource: FormObject[];
    search: (values: any) => void;
}

const AdvancedSearchC: React.FC<ComponentProps> = ({ dataSource, search }) => {
    const [expand, setExpand] = useState(false);
    const [param, setParam] = useState<any>({});
    const [form] = Form.useForm();

    const getFormComponnet = (type: string, placeholder: string, dataIndex: string) => {
        switch (type) {
            case DATA_ENTRY.INPUT:
                return <Input placeholder={placeholder} allowClear />;
            case DATA_ENTRY.SELECT:
                return (
                    <SelecC
                        dataIndex={dataIndex}
                        form={null}
                        value={param[dataIndex]}
                        onChange={(v: any) => {
                            form.setFieldsValue({ [dataIndex]: v });
                            setParam({ [dataIndex]: v, ...param });
                        }}
                    />
                );
        }
    };

    const getFields = () => {
        const condtionArr = expand
            ? dataSource.length
            : dataSource.length > 4
            ? 4
            : dataSource.length;

        const children = [];

        for (let i = 0; i < condtionArr; i++) {
            children.push(
                <Col span={6} key={`c${i}`}>
                    <Form.Item
                        name={dataSource[i].dataIndex}
                        label={dataSource[i].title}
                        rules={dataSource[i]?.rules || []}
                    >
                        {getFormComponnet(
                            dataSource[i].type,
                            dataSource[i].placeholder || '',
                            dataSource[i].dataIndex || ''
                        )}
                    </Form.Item>
                </Col>
            );
        }

        return children;
    };

    const onFinish = (values: any) => {
        search(values);
    };

    return (
        <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <Row gutter={24}>{getFields()}</Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                            onFinish({});
                        }}
                    >
                        重置
                    </Button>
                    {dataSource.length > 4 && (
                        <a style={{ fontSize: 12 }} onClick={() => setExpand(!expand)}>
                            {expand ? <UpOutlined /> : <DownOutlined />}
                            {expand ? '收起' : '展开'}
                        </a>
                    )}
                </Col>
            </Row>
        </Form>
    );
};

AdvancedSearchC.defaultProps = {
    dataSource: [],
    search: () => {}
};

export default AdvancedSearchC;
