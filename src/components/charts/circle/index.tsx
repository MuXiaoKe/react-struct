import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { getLegendPosition } from './config';
import { color } from '../color';

interface CircleChartsProps {
    height?: number | string;
    width?: number | string;
    titleName?: string;
    onRef?: (param0: any, param1: any) => void;
    legendPos?: string;
    data?: any;
    options?: object;
    API?: any;
    openLegend?: boolean;
}

const CircleCharts: any = (props: CircleChartsProps) => {
    const getOption = () => {
        const options = !!props.options ? props.options : {};
        if (Object.keys(options).length !== 0) {
            return options;
        }
        const obj = props.data;
        if (Object.keys(obj).length === 0) {
            return {};
        } else {
            return {
                title: {
                    text: obj.total || '',
                    textStyle: {
                        fontSize: 30,
                        fontWeight: '600',
                        color: '#3d3d3d'
                    },
                    x: 'center',
                    y: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    type: 'scroll',
                    ...getLegendPosition(props?.legendPos || '')
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['60%', '40%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: obj.detail,
                        color: color
                    }
                ]
            };
        }
    };

    // const getOption = () => props.options;
    const handle = (n: any) => {
        if (n) {
            CircleCharts.API = n.getEchartsInstance();
        }
    };

    // didmount调用
    useEffect(() => {
        if (!!props.onRef) {
            props?.onRef(CircleCharts.API, getOption());
        }
    }, []);
    // 卸载时调用
    useEffect(() => {
        return () => {
            CircleCharts.API.dispose();
        };
    }, []);

    return (
        <ReactEcharts
            ref={handle}
            style={{ height: props.height, width: props.width }}
            option={getOption()}
            notMerge={true}
            lazyUpdate={true}
            theme="theme_name"
        />
    );
};
CircleCharts.API = null;
CircleCharts.defaultProps = {
    height: '100%',
    width: '100%',
    legendPos: 'top',
    onRef: () => {},
    data: {},
    openLegend: true
};

export default CircleCharts;
