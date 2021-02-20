import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
interface BarChartProps {
    data?: number[];
    xAxis?: string[];
    height?: number | string;
    width?: number | string;
    titleName?: string;
    unitName?: string;
    dataName?: string;
    onRef?: (param0: any, param1: any) => void;
    xAxisLean?: boolean;
    options?: object;
}

const BarCharts = (props: BarChartProps) => {
    let Instance: any = null;

    const getOption = () => {
        const options = props.options ?? {};
        if (Object.keys(options).length !== 0) {
            return options;
        }
        return {
            color: ['#007eec'],
            title: {
                text: props.titleName
            },
            grid: {
                left: '3%',
                right: '4%',
                top: '30px',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#007eec'
                    }
                }
            },
            legend: {
                data: [
                    {
                        name: '',
                        textStyle: {
                            backgroundColor: '#007eec'
                        }
                    }
                ]
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
                    boundaryGap: true,
                    data: props.xAxis,
                    axisLabel: {
                        interval: 0,
                        rotate: props.xAxisLean ? 45 : 0,
                        margin: 5
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: props.unitName,
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                }
            ],
            series: [
                {
                    name: props.dataName,
                    type: 'bar',
                    barWidth: '30%',
                    data: props.data
                }
            ]
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
BarCharts.defaultProps = {
    height: '100%',
    width: '100%',
    unitName: '单位',
    xAxisLean: false,
    onRef: () => {}
};

export default BarCharts;
