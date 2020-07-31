import React, { useState } from 'react';
import { Form, Row, Col, Input, Select, Button } from 'antd';
import './style.scss';

interface ComponentProps {
    search: (values: any) => void;
}

const AdvancedSearchC: React.FC<ComponentProps> = () => {
    return null;
};

AdvancedSearchC.defaultProps = {
    search: () => {}
};

export default AdvancedSearchC;
