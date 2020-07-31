import React from 'react';
import { setOptions } from '@components/charts/circle/config';
import CircleChart from '@components/charts/circle/index';
import '../style/style.scss';
import { color } from '@components/charts/color';

interface Obj {
    value: number;
    name: string;
    children?: any[];
}

interface ComponentProps {
    legendPos?: string;
    total?: string | number;
    detail: Obj[];
    colorList?: string[];
    subColors?: string[];
    openLegend?: boolean;
    title: string;
}

const PieChart: React.SFC<ComponentProps> = (props: any) => {
    const { legendPos, total, detail, colorList, openLegend, subColors } = props;

    if (!detail && detail?.length === 0) {
        return <div />;
    }

    const circleSize = {
        width: '90%',
        height: '90%'
    };
    // const example = {
    //     legendPos: 'bottom-vertical',
    //     total: 5000,
    //     unitName: '张',
    //     detail: [
    //         { value: 12, name: '车联网' },
    //         { value: 30, name: 'PE', children: [200, 400] },
    //         { value: 8, name: '上网设备' }
    //     ],
    //     colorList: ['#3BD597', '#0089F3', '#FFC542', '#FB617F'],
    //     openLegend: false
    // };

    const { title, tooltip, legend, series } = setOptions({
        legendPos,
        total,
        detail,
        colorList,
        openLegend
    });

    const option = {
        title: title,
        tooltip: tooltip,
        legend: legend,
        series: series
    };

    const dotBase = {
        display: 'inline-block',
        marginRight: '5px',
        borderRadius: '10px',
        width: '9px',
        height: '9px'
    };
    const dotStyles = (color: string) => ({
        // border: '1px solid white',
        backgroundColor: `${color}`
    });

    const subDotStyles = (color: string) => ({
        // ...dotBase,
        // border: `1px solid ${color}`,
        borderColor: `${color}`
    });

    return (
        <>
            <h3 className="pie-header">{props.title}</h3>
            <section className="pie-wrap">
                <CircleChart {...circleSize} options={option} />
            </section>
            <section className="pie-footer">
                {detail.map((item: any, index: number) => (
                    <section key={index} className="mb10">
                        <div className="pie-self-legend">
                            <span
                                className="dot-base dot-base-style"
                                style={dotStyles(colorList[index])}
                            />
                            <span className="pie-self-legend-title">{item.name}</span>
                            <span className="pie-self-legend-value">{item.value}</span>
                        </div>
                        {Array.isArray(item.children) && item.children.length > 1 && (
                            <div className="pie-self-legend">
                                <span
                                    className="dot-base dot-base-sub-style"
                                    style={{ visibility: 'hidden', background: 'white' }}
                                />
                                <span className="pie-self-legend-title pie-self-legend-sub-title">
                                    (
                                    <span
                                        className="dot-base dot-base-sub-style"
                                        style={subDotStyles(subColors[0])}
                                    />
                                    <span>{item.children[0].name}/</span>
                                    <span
                                        className="dot-base dot-base-sub-style"
                                        style={subDotStyles(subColors[1])}
                                    />
                                    <span>{item.children[1].name}</span>)
                                </span>
                                <span className="pie-self-legend-value pie-self-legend-sub-title">
                                    {`(${item.children[0].value}/${item.children[1].value})`}
                                </span>
                            </div>
                        )}
                    </section>
                ))}
            </section>
        </>
    );
};
PieChart.defaultProps = {
    legendPos: 'bottom-vertical',
    colorList: color,
    subColors: color,
    openLegend: false
};

export default PieChart;
