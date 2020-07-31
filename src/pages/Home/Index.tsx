import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Card, Space, message } from 'antd';
import './style/style.scss';
import PieChart from './components/PieChart';
import * as api from '@services/index';
import { useRequest } from 'ahooks';

const IndexPage = () => {
    return <div className="page-overview" />;
};

export default observer(IndexPage);
