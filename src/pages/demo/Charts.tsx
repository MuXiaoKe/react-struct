/**
 * 图表
 */

import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Row, Table } from 'antd';
import { useIntl } from 'react-intl';
import * as api from '@services/index';
// import PieCharts from '@components/Echarts/PieCharts';
// import BarCharts from '@components/Echarts/BarCharts';
// import LineCharts from '@components/Echarts/LineCharts';
import BaseCharts from '@components/Echarts/index';
import { observer } from 'mobx-react';
import { CircleColor, LineColor, BarColor } from '@components/Echarts/color';
import echarts from 'echarts';
export default observer(() => {
    const [form] = Form.useForm();
    const { formatMessage: f } = useIntl();
    const CirecleOptions = {
        // ...pos,
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            // orient: 'vertical',
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
            icon: 'circle',
            align: 'left',
            itemWidth: 8,
            itemHeight: 8,
            selectedMode: false, // 关闭图例点击
            // formatter: (name) => {
            //     const target = obj.detail.find((item) => item.name === name);
            //     const result =
            //         !!target &&
            //         [`{a|${target.name}}`, `{b|\n${target.value}${target.unit}}`].join(' ');
            //     const vs = !!target ? target.proportion.split('.') : ['0', '0'];
            //     const v = Number(vs[1]) > 0 ? target.proportion : vs[0];
            //     const res = !!result ? result.concat(' ').concat(`{c|(${v}%)}`) : '';
            //     return res;
            // },
            // textStyle: {
            //     lineHeight: 16,
            //     rich: {
            //         lineHeight: 48,
            //         fontSize: 12,
            //         a: {
            //             color: '#4A4A4A'
            //         },
            //         b: {
            //             color: '#4A4A4A'
            //         },
            //         c: {
            //             color: '#979797'
            //         }
            //     }
            // },
            itemGap: 30
            // padding: [15, 30, 15, 30]
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                top: '0',
                bottom: '15%',
                radius: ['45%', '56%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 335, name: '开始' },
                    { value: 310, name: '测试' },
                    { value: 234, name: '待激活' },
                    { value: 135, name: '库存' },
                    { value: 1548, name: '激活' },
                    { value: 28, name: '停用' },
                    { value: 148, name: '失效' },
                    { value: 248, name: '销户' }
                ],
                color: CircleColor
            }
        ],
        title: {
            text: '卡号数量',
            textAlign: 'center',
            textStyle: {
                fontSize: 14,
                color: 'rgba(0,0,0,0.45)',
                lineHeight: 26
            },
            x: '50%',
            y: '34%',
            subtext: 88888 || 0,
            subtextStyle: {
                fontSize: 26,
                color: '#333'
            }
        }
    };
    const BarOption = {
        color: BarColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['移动', '联通', '电信', '其他'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                // name: '直接访问',
                type: 'bar',
                barWidth: '15%',
                data: [10, 52, 200, 334],
                itemStyle: {
                    normal: {
                        color: function(params: any) {
                            let index;
                            // 给大于颜色数量的柱体添加循环颜色的判断
                            if (params.dataIndex >= BarColor.length) {
                                index = params.dataIndex - BarColor.length;
                                return BarColor[index];
                            }
                            return BarColor[params.dataIndex];
                        }
                    }
                }
            }
        ]
    };
    const LineOption = {
        grid: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 0
        },
        color: LineColor,
        xAxis: {
            // color: LineColor,
            type: 'category',
            data: ['2019-01', '2019-02', '2019-03', '2019-04']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934],
                type: 'line',
                smooth: true,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: LineColor[0]
                        },
                        {
                            offset: 1,
                            color: '#fff'
                        }
                    ])
                }
            }
        ]
    };
    const MultiLineOption = {
        grid: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 0,
            containLabel: true
        },
        color: CircleColor,
        // title: {
        //     text: '折线图堆叠'
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            right: 20,
            data: ['移动', '联通', '电信', '其他']
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '移动',
                type: 'line',
                stack: '总量',
                smooth: true,
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联通',
                type: 'line',
                stack: '总量',
                smooth: true,
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '电信',
                type: 'line',
                stack: '总量',
                smooth: true,
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '其他',
                type: 'line',
                stack: '总量',
                smooth: true,
                data: [320, 332, 301, 334, 390, 330, 320]
            }
        ]
    };
    return (
        <div className="charts-container">
            <BaseCharts width="500px" height="425px" options={CirecleOptions} />
            <br />
            <BaseCharts width="500px" height="300px" options={BarOption} />
            <br />
            <BaseCharts width="500px" height="300px" options={LineOption} />
            <br />
            <BaseCharts width="500px" height="300px" options={MultiLineOption} />
        </div>
    );
});
