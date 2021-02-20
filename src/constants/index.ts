/* eslint-disable no-unused-vars */
export const BASE_URL = '/api';
export const SUB_URL = '/cmp/base/goods';
// export const SUB_URL = '';

import { intl } from '@assets/locale/intl';
// const f_modeType00 = intl.formatMessage({
//     id: 'billing.modeType.00',
//     defaultMessage: '标准版'
// });
// const f_modeType0102 = intl.formatMessage({
//     id: 'billing.modeType.0102',
//     defaultMessage: '专业'
// });
interface ENUM {
    [key: string]: any;
}
/*
 * 流量单位
 * */
export enum FLOW_UNIT {
    KB = 'KB',
    MB = 'MB',
    GB = 'GB',
    TB = 'TB',
    PB = 'PB'
}

/*
 * 日期格式类型
 * */
export enum FORMAT_TYPES {
    MONTH = 'YYYY/MM',
    DATE = 'YYYY/MM/DD',
    HOUR = 'YYYY/MM/DD HH',
    MINUTE = 'YYYY/MM/DD HH:mm',
    SECOND = 'YYYY/MM/DD HH:mm:ss',
    DATE_POINT = 'YYYY.MM.DD'
}

export enum FLOW_UNIT_V {
    KB = 0,
    MB = 1,
    GB = 2,
    TB = 3,
    PB = 4
}
export const SEARCH_ITEM = {
    labelCol: {
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 8 },
        xl: { span: 8 },
        xxl: { span: 6 }
    },
    wrapperCol: {
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 16 },
        xl: { span: 16 },
        xxl: { span: 18 }
    }
};
export const DETAIL_ITEM = {
    labelCol: {
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 8 },
        xl: { span: 8 },
        xxl: { span: 5 }
    },
    wrapperCol: {
        sm: { span: 12 },
        md: { span: 12 },
        lg: { span: 12 },
        xl: { span: 12 },
        xxl: { span: 10 }
    }
};
export const BIG_DETAIL_ITEM = {
    labelCol: {
        sm: { span: 5 },
        md: { span: 5 },
        lg: { span: 5 },
        xl: { span: 5 },
        xxl: { span: 5 }
    },
    wrapperCol: {
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 16 },
        xl: { span: 16 },
        xxl: { span: 16 }
    }
};
export const MODAL_ITEM = {
    labelCol: {
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 8 },
        xl: { span: 7 },
        xxl: { span: 6 }
    },
    wrapperCol: {
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 16 },
        xl: { span: 17 },
        xxl: { span: 18 }
    }
};
export const MODAL_DOUBLE_ITEM = {
    labelCol: {
        sm: { span: 10 },
        md: { span: 10 },
        lg: { span: 10 },
        xl: { span: 10 },
        xxl: { span: 8 }
    },
    wrapperCol: {
        sm: { span: 14 },
        md: { span: 14 },
        lg: { span: 14 },
        xl: { span: 14 },
        xxl: { span: 16 }
    }
};
export const GOODS_TYPE: ENUM = {
    '1': '预付',
    '2': '月付',
    '3': '补充包',
    '10': '测试套餐'
};
export const TARIFF_TYPE: ENUM = {
    '1': '预付单卡',
    '2': '预付共享',
    '0': '月付单卡',
    '6': '月付共享',
    '8': '事件包',
    '9': '追加包',
    '14': '增值服务包',
    '10': '测试套餐'
};
/*
 * 正则表单式类型
 * */
export const PATTERN = {
    PHONE: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, // 匹配手机号码
    PHONES: /^(1([38]\d|4[57]|5[0-35-9]|7[06-8])\d{8})(;(1([38]\d|4[57]|5[0-35-9]|7[06-8])\d{8})){0,4}$/, // 最多五个手机号
    EMAIL: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, // 匹配邮箱
    EMAILS: /^(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6}))(;(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6}))){0,4}$/, // 最多五个邮箱
    IP: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, // IP地址
    SPACE: /^[^\s]*$/ // 禁止输入空格
};
// 卡状态
export const CARD_STATUS = {
    '60': '开始',
    '61': '测试',
    '62': '待激活',
    '63': '库存',
    '64': '激活',
    '65': '停用',
    '66': '失效',
    '67': '销户'
};
// 运营模式
export const MODE_TYPE = {
    '00': '标准版',
    '01': '专业',
    '02': '专业',
    '0102': '专业',
    '01,02': '专业',
    '0607': '其他',
    '06,07': '其他'
};

// const def = {};
export default {};
