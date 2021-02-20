import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';
import './style.scss';
import * as api from '@services/index';
import { useRequest } from 'ahooks';
import { useIntl } from 'react-intl';

const IndexPage = () => {
    const { formatMessage: f } = useIntl();
    
    return (
        <div className="home-overview">
            
        </div>
    );
};

export default IndexPage;
