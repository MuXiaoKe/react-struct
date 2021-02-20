import { FLOW_UNIT, FORMAT_TYPES } from '@src/constants';
import moment from 'moment';
import CryptoJS from 'crypto-js';

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

/*
 * 流量单位过滤器
 * */
type Tflow = {
    value: number;
    unit: string;
};
export function filterFlowUnit(flow = 0, returnObj = false): any {
    const flowRes: Tflow = { value: Number(flow) || 0, unit: FLOW_UNIT.KB };
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

export function flowFormat(flow: string | number) {
    let unit = 'B';
    let _flow = Number(flow);
    let numberflow = Number(flow);
    switch (true) {
        case 0 < numberflow && numberflow < Math.pow(1024, 1):
            break;
        case Math.pow(1024, 1) <= numberflow && numberflow < Math.pow(1024, 2):
            _flow = numberflow / Math.pow(1024, 1);
            unit = 'KB';
            break;
        case Math.pow(1024, 2) <= numberflow && numberflow < Math.pow(1024, 3):
            _flow = numberflow / Math.pow(1024, 2);
            unit = 'MB';
            break;
        case Math.pow(1024, 3) <= numberflow && numberflow < Math.pow(1024, 4):
            _flow = numberflow / Math.pow(1024, 3);
            unit = 'GB';
            break;
        case Math.pow(1024, 4) <= numberflow:
            _flow = numberflow / Math.pow(1024, 4);
            unit = 'TB';
            break;
        default:
            break;
    }
    return _flow.toFixed(2) + unit;
}
export function flowFormatObj(flow: string | number) {
    let unit = 'B';
    let _flow = Number(flow);
    let numberflow = Number(flow);
    switch (true) {
        case 0 < numberflow && numberflow < Math.pow(1024, 1):
            break;
        case Math.pow(1024, 1) <= numberflow && numberflow < Math.pow(1024, 2):
            _flow = numberflow / Math.pow(1024, 1);
            unit = 'KB';
            break;
        case Math.pow(1024, 2) <= numberflow && numberflow < Math.pow(1024, 3):
            _flow = numberflow / Math.pow(1024, 2);
            unit = 'MB';
            break;
        case Math.pow(1024, 3) <= numberflow && numberflow < Math.pow(1024, 4):
            _flow = numberflow / Math.pow(1024, 3);
            unit = 'GB';
            break;
        case Math.pow(1024, 4) <= numberflow:
            _flow = numberflow / Math.pow(1024, 4);
            unit = 'TB';
            break;
        default:
            break;
    }
    return { value: _flow.toFixed(2) || 0, unit: unit };
}
export function formatDate(date: any, format: string = FORMAT_TYPES.SECOND) {
    return moment(date).format(format);
}

/*
 * 逗号分隔数字
 * */
export function thousandBitSeparator(num: number) {
    if (num === 0) {
        return '0.00';
    } else if (num) {
        const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
        const MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
        return num
            .toFixed(2)
            .toString()
            .replace(DIGIT_PATTERN, (m) => m.replace(MILI_PATTERN, ','));
    } else {
        return '-';
    }
}
// 是否有登录信息
export function hasUserInfo() {
    const token = sessionStorage.getItem('access_token');
    const roleId = sessionStorage.getItem('roleId');
    const userName = sessionStorage.getItem('loginName');

    if (token && roleId && userName) {
        // 已登录
        return true;
    } else {
        return false;
    }
}
/**
 * 加密
 */
export function getAesString(data: any, key: any, iv: any) {
    let _key = CryptoJS.enc.Utf8.parse(key);
    let _iv = CryptoJS.enc.Utf8.parse(iv);
    let encrypted = CryptoJS.AES.encrypt(data, _key, {
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
// 解密
export function getDAesString(encrypted: any, key: any, iv: any) {
    let _key = CryptoJS.enc.Utf8.parse(key);
    let _iv = CryptoJS.enc.Utf8.parse(iv);
    let decrypted = CryptoJS.AES.decrypt(encrypted, _key, {
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
// modeType 判断是不是专业版
export function isPro(modeType: string | number) {
    let _modeType = String(modeType);
    if (_modeType === '01') {
        _modeType = '01,02';
    } else if (_modeType === '02') {
        _modeType = '01,02';
    } else {
        return _modeType;
    }
    return _modeType;
}
// 权限过滤 列表页搜索
export function authFilter() {
    const roleId = sessionStorage.getItem('roleId');
    const channelCustId = sessionStorage.getItem('channelCustId');
    const custId = sessionStorage.getItem('custId');
    const _channelCustId =
        Number(roleId) === 3000 || Number(roleId) === 4000 || Number(roleId) === 5000
            ? { channelCustId }
            : undefined;
    const _custId = Number(roleId) === 5000 ? { custId } : undefined;
    const noChannelCustId =
        Number(roleId) !== 3000 && Number(roleId) !== 4000 && Number(roleId) !== 5000;
    const noCustId = Number(roleId) !== 5000;
    return {
        _channelCustId,
        _custId,
        noChannelCustId,
        noCustId
    };
}
