import Enum, { FLOW_UNIT } from '@src/constants';

// 以下函数返回 min（包含）～ max（包含）之间的数字：
export function getRandom(min: number, max: number) {
    // 或者不用Math.floor 用~~取整速度更快
    return ~~(Math.random() * (max - min + 1)) + min;
}
/**
 * 获取随机数组
 * @param len 生成数组长度
 * @returns 随机生成长度为len的数组
 */
export function getArr(len: number) {
    let arr: number[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(getRandom(1, len));
    }

    return arr;
}
export const isDev = process.env.NODE_ENV === 'development'; // 开发 or 生产
// 非空判断
export function isEmpty(obj: any) {
    return obj === null || obj === 'undefined' || obj === '' || obj === undefined;
}
/*
 * 深拷贝 -- 有损拷贝（时间对象、正则等、函数、构造函数会丢失）
 *
 * */
export const deepClone = (obj: {}) => (obj ? JSON.parse(JSON.stringify(obj)) : '');

export function enumToView(key: string, value: any): string {
    const vObject = Enum[key.concat('_V')] || {}; // ==> Object {k1: '', k2: ''}
    const keys = Object.keys(vObject).filter((item) => vObject[item].toString() === String(value));
    return keys.length > 0 ? Enum[key][keys[0]] : '';
}

interface EnumToArrayRes {
    value: number | string;
    title: string;
}

/*
 * 枚举转化数组方法
 * */
export function enumToArray(enums: any, enumV: any): EnumToArrayRes[] {
    const isObject = Object.prototype.toString.call(enumV) !== '[object Object]';
    const values = isObject ? enumV : {};
    const array = Object.keys(enums).map((el, index) => {
        return {
            value: enumV[el] || index,
            title: enums[el],
            name: enums[el]
        };
    });
    return array as EnumToArrayRes[];
}

/*
 * 流量单位过滤器
 * */
export function filterFlowUnit(flow = 0, returnObj = false): any {
    const flowRes = { value: Number(flow) || 0, unit: FLOW_UNIT.KB };
    let negative = false;
    if (flowRes.value < 0) {
        negative = true;
        flowRes.value = 0 - flowRes.value;
    }
    switch (true) {
        case 0 < flowRes.value && flowRes.value < Math.pow(1024, 1):
            break;
        case Math.pow(1024, 1) <= flowRes.value && flowRes.value < Math.pow(1024, 2):
            flowRes.value = flowRes.value / Math.pow(1024, 1);
            flowRes.unit = FLOW_UNIT.MB;
            break;
        case Math.pow(1024, 2) <= flowRes.value && flowRes.value < Math.pow(1024, 3):
            flowRes.value = flowRes.value / Math.pow(1024, 2);
            flowRes.unit = FLOW_UNIT.GB;
            break;
        case Math.pow(1024, 3) <= flowRes.value && flowRes.value < Math.pow(1024, 4):
            flowRes.value = flowRes.value / Math.pow(1024, 3);
            flowRes.unit = FLOW_UNIT.TB;
            break;
        case Math.pow(1024, 4) <= flowRes.value:
            flowRes.value = flowRes.value / Math.pow(1024, 4);
            flowRes.unit = FLOW_UNIT.PB;
            break;
        default:
            break;
    }
    flowRes.value = !negative
        ? Number(flowRes.value.toFixed(3))
        : 0 - Number(flowRes.value.toFixed(3));
    if (!returnObj) {
        return `${flowRes.value}${flowRes.unit}`;
    }
    return flowRes;
}
