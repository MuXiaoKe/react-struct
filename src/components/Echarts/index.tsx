import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
interface CircleChartsProps {
    height?: number | string;
    width?: number | string;
    onRef?: (param0: any, param1: any) => void;
    options: object;
}
interface Ipos {
    [propName: string]: any;
}

const BaseCharts = (props: CircleChartsProps) => {
    let Instance: any = null;

    const handle = (echart: any) => {
        if (echart) {
            Instance = echart.getEchartsInstance();
        }
    };

    // didmount调用
    useEffect(() => {
        props.onRef?.(Instance, props.options);
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
            option={props.options}
            notMerge={true} // 是否不跟之前设置的 option 进行合并，默认为 false，即合并。
            lazyUpdate={true} // 在设置完 option 后是否不立即更新图表，默认为 false，即立即更新。
        />
    );
};
BaseCharts.defaultProps = {
    height: '100%',
    width: '100%',
    onRef: () => {}
};

export default BaseCharts;
