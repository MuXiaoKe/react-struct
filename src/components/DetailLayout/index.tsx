import * as React from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import './style.scss';

interface ColumnItem {
    title: string;
    dataIndex: string;
    render?: (record: PlainObject) => React.ReactNode;
}

interface DetailLayoutProps {
    columns: ColumnItem[];
    dataSource: PlainObject;
    colSet?: [number, number];
}

const DetailLayout = (props: DetailLayoutProps) => {
    return (
        <Row gutter={8} className="block">
            {props.columns.map((item: any, index) => (
                <Col key={index} span={8} className="col-item">
                    <Row gutter={8}>
                        <Col
                            span={props.colSet ? props.colSet[0] : 8}
                            style={{ textAlign: 'right' }}
                        >
                            {item.title}：
                        </Col>
                        <Col span={props.colSet ? props.colSet[1] : 16}>
                            {!!props.dataSource &&
                                (item.hasOwnProperty('render')
                                    ? item.render(props.dataSource)
                                    : props.dataSource[item.dataIndex])}
                        </Col>
                    </Row>
                </Col>
            ))}
        </Row>
    );
};

export default observer(DetailLayout);
