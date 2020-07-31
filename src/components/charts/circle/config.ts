/**
 * 总连接数饼图配置
 */
const posObj = {
    top: {
        orient: 'horizontal',
        x: 'center'
    },
    right: {
        orient: 'vertical',
        y: 'center',
        x: 'right'
    },
    bottomH: {
        orient: 'horizontal',
        x: 'center',
        y: 'bottom'
    },
    bottom: {
        orient: 'vertical',
        x: 'center',
        y: 'bottom'
    },
    left: {
        orient: 'vertical',
        y: 'center',
        x: 'left'
    }
};

export const getLegendPosition = (pos: string) => {
    switch (pos) {
        case 'top-horizontal':
            return posObj.top;
        case 'right-vertical':
            return posObj.right;
        case 'left-vertical':
            return posObj.left;
        case 'bottom-horizontal':
            return posObj.bottomH;
        case 'bottom-vertical':
            return posObj.bottom;
        default:
            return posObj.top;
    }
};

export function setOptions(obj: any) {
    const title = {
        text: obj.total || 0,
        textAlign: 'center',
        textVerticalAlign: 'middle',
        textStyle: {
            fontSize: 20,
            fontWeight: '600',
            color: '#3d3d3d'
        },
        x: '48%',
        y: '42%'
    };

    const tooltip = {
        trigger: 'item',
        formatter: (param: any) => {
            const styles = (color = param.color) => `
                display:inline-block;
                margin-right: 5px;
                border-radius:10px;
                width:9px;
                height:9px;
                border:1px solid white;
                background-color:${color};
            `;
            // const vs = !!param?.data?.proportion ? param.data.proportion.split('.') : ['0', '0'];
            // const v = Number(vs[1]) > 0 ? param?.data?.proportion : vs[0];
            const hasChildren =
                Array.isArray(param?.data?.children) && param?.data?.children?.length > 1;
            const child = param?.data?.children || [];
            return hasChildren
                ? `<div>
                        <p><span style="${styles(child[0].color)}"></span>
                        ${param.name}-${child[0]?.name}: ${child[0]?.value}</p>
                        <p><span style="${styles(child[1].color)}"></span>
                        ${param.name}-${child[1]?.name}: ${child[1]?.value}</p>
                    </div>`
                : `<span style="${styles()}"></span>${param.name}: ${param.value}`;
        }
    };

    const legend = {
        show: obj.openLegend,
        // type: 'scroll',
        left: '35%',
        bottom: 0,
        icon: 'circle',
        align: 'left',
        itemGap: 15,
        itemWidth: 10,
        itemHeight: 5,
        selectedMode: false, // 关闭图例点击
        formatter: (name: string) => {
            const target = obj.detail.find((item: any) => item.name === name);
            const result = !!target && [`{a|${name}}`, `{b|${target.value}}`].join(' ');
            return !!result ? result : '';
        },
        textStyle: {
            rich: {
                fontSize: 12
            }
        },
        ...getLegendPosition(obj?.legendPos)
    };
    const series = [
        {
            name: 'red',
            type: 'pie',
            center: ['50%', '45%'],
            radius: ['50%', '60%'],
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
            itemStyle: {
                normal: {
                    color: (params: any) =>
                        !!obj?.colorList ? obj.colorList[params.dataIndex] : null
                }
            }
        }
    ];
    return {
        title: title,
        tooltip: tooltip,
        legend: legend,
        series: series
    };
}
