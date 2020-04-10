import React from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';
import { useFormTable } from '@umijs/hooks';
import { PaginatedParams } from '@umijs/hooks/lib/useFormTable';

const { Option } = Select;

interface Item {
    name: {
        last: string;
    };
    email: string;
    phone: string;
    gender: 'male' | 'female';
}

interface Result {
    total: number;
    list: Item[];
}

const getTableData = (
    { current, pageSize }: PaginatedParams[0],
    formData: Object
): Promise<Result> => {
    let query = `page=${current}&size=${pageSize}`;
    Object.entries(formData).forEach(([key, value]) => {
        if (value) {
            query += `&${key}=${value}`;
        }
    });

    return fetch(`https://randomuser.me/api?results=55&${query}`)
        .then((res) => res.json())
        .then((res) => ({
            total: res.info.results,
            list: res.results
        }));
};

export default () => {
    const [form] = Form.useForm();

    const { tableProps, search } = useFormTable(getTableData, {
        defaultPageSize: 10,
        form
    });

    const { type, changeType, submit, reset } = search;

    const columns = [
        {
            title: 'name',
            dataIndex: 'name.last'
        },
        {
            title: 'email',
            dataIndex: 'email'
        },
        {
            title: 'phone1',
            dataIndex: 'phone'
        },
        {
            title: 'gender',
            dataIndex: 'gender'
        }
    ];

    const advanceSearchForm = (
        <div>
            <Form form={form}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item label="name" name="name">
                            <Input placeholder="name" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="email" name="email">
                            <Input placeholder="email" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="phone" name="phone">
                            <Input placeholder="phone" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="primary" onClick={submit}>
                                搜索
                            </Button>
                            <Button onClick={reset} style={{ marginLeft: 16 }}>
                                清空
                            </Button>
                            <Button type="link" onClick={changeType}>
                                简易搜索
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );

    const searchFrom = (
        <div style={{ marginBottom: 16 }}>
            <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Form.Item name="gender">
                    <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
                        <Option value="">all</Option>
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="name">
                    <Input.Search
                        placeholder="enter name"
                        style={{ width: 240 }}
                        onSearch={submit}
                    />
                </Form.Item>
                <Button type="link" onClick={changeType}>
                    高级搜索
                </Button>
            </Form>
        </div>
    );

    return (
        <div>
            {type === 'simple' ? searchFrom : advanceSearchForm}
            <Table columns={columns} rowKey="email" {...tableProps} />
        </div>
    );
};
