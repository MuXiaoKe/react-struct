import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { filterFlowUnit } from '@src/utils';
// import console = require('console');

interface LineChartProps {
    xAxis?: string[];
    yAxis?: unknown[];
    height?: number | string;
    width?: number | string;
    titleName?: string;
    unitName?: string;
    xAxisLean?: boolean;
    onRef?: (param0: any, param1: any) => void;
    series?: any;
    legend?: any;
    legendData?: {};
    color?: unknown[];
    minZero?: boolean;
    minYAxis?: number;
    options?: object;
}

const LineCharts = (props: LineChartProps) => {
    let Instance: any = null;
    const getOption = () => {
        const options = props.options ?? {};
        if (Object.keys(options).length !== 0) {
            return options;
        }
        return {
            title: {
                text: props.titleName || ''
            },
            grid: {
                left: '8px',
                right: '',
                top: '30px',
                bottom: '',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#007eec'
                    }
                },
                textStyle: {
                    align: 'left'
                }
            },
            legend: {
                ...props.legendData,
                tooltip: {
                    show: true
                }
            },
            toolbox: {
                show: false,
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: {
                show: false,
                start: 0,
                end: 100
            },
            xAxis: [
                {
                    type: 'category',
                    data: props.xAxis || null,
                    axisLabel: {
                        interval: 0,
                        rotate: props.xAxisLean ? 45 : 0,
                        margin: 5
                    }
                }
            ],
            yAxis: props.yAxis || [
                {
                    type: 'value',
                    name: props.unitName || null,
                    nameTextStyle: {
                        padding: [0, 0, 0, 45]
                    },
                    boundaryGap: [0.2, 0.2],
                    min: props.minZero ? 0 : null,
                    minInterval: props.minYAxis
                }
            ],
            series: props.series || []
        };
    };

    const handle = (echart: any) => {
        if (echart) {
            Instance = echart.getEchartsInstance();
        }
    };

    // didmount调用
    useEffect(() => {
        props.onRef?.(Instance, getOption());
    }, []);
    // 卸载时调用
    useEffect(() => {
        return () => {
            Instance?.dispose();
        };
    }, []);

    return (
        <ReactEcharts
            ref={handle}
            style={{ height: props.height, width: props.width }}
            option={getOption()}
            notMerge={true}
            lazyUpdate={true}
            // theme="theme_name"
        />
    );
};

LineCharts.defaultProps = {
    xAxisLean: false,
    height: '100%',
    width: '100%',
    onRef: () => {},
    minZero: true,
    minYAxis: 0
};
export default LineCharts;
