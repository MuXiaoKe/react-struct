import React, { useEffect } from 'react';
import BaseCharts from './index';
import echarts from 'echarts';
interface CircleChartsProps {
    height?: string;
    width?: string;
    onRef?: (param0: any, param1: any) => void;
    data?: any;
    options: object;
}
interface Ipos {
    [propName: string]: any;
}

const PieCharts = (props: CircleChartsProps) => {
    return <BaseCharts height={props.height} width={props.width} options={props.options} />;
};
// PieCharts.API = null;
PieCharts.defaultProps = {
    height: '100%',
    width: '100%',
    onRef: () => {},
    data: {}
};

export default PieCharts;
