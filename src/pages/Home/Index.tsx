import React, { useState } from 'react';
import { observer } from 'mobx-react';
import '../../services/config';
import { Row, Col, Card, Space, message } from 'antd';
import './style/style.scss';
import PieChart from './components/PieChart';
import { handleData } from './handleData';
import * as api from '@services/index';
import { useRequest } from 'ahooks';

const IndexPage = () => {
    // const screenRatio = document.body.clientWidth / 1920;
    const screenRatio = 1;
    // 请求数据
    const productsData = useRequest(() => api.queryOverviewProduct({}), {
        onError: (err: any) => message.error(`查询错误, ${err.msg}`)
    });

    const devicesData = useRequest(() => api.queryOverviewDevice({}), {
        onError: (err: any) => message.error(`查询错误, ${err.msg}`)
    });

    const headStyle = {
        fontWeight: 700
    };
    const largeStyle = { flex: 1, width: '67.5%' };

    const dataBodyStyle = {
        height: '92%',
        display: 'flex',
        padding: 0
    };

    const groupColStyle = {
        borderRight: '1px solid #f0f0f0'
    };

    return (
        <div className="page-overview">
            <Row className="ge-row ge-second-row" style={{ marginTop: `${screenRatio * 24}px` }}>
                <Card
                    headStyle={headStyle}
                    size="small"
                    title="分类数据"
                    style={{ ...largeStyle, height: 'inherit' }}
                    bodyStyle={dataBodyStyle}
                    loading={productsData.loading && devicesData.loading}
                >
                    <Col span="8" style={groupColStyle}>
                        <PieChart
                            total={productsData?.data?.productCount || 0}
                            detail={productsData?.data?.product || []}
                            title="产品"
                        />
                    </Col>
                    <Col span="8" style={groupColStyle}>
                        <PieChart
                            total={devicesData?.data?.deviceCount || 0}
                            detail={devicesData?.data?.device || []}
                            title="设备"
                        />
                    </Col>
                    <Col span="8">
                        <PieChart
                            total={devicesData?.data?.deviceCount || 0}
                            detail={handleData(devicesData?.data?.deviceState || [])}
                            title="设备状态"
                        />
                    </Col>
                </Card>
            </Row>
        </div>
    );
};

export default observer(IndexPage);
