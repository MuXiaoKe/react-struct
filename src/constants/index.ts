/* eslint-disable no-unused-vars */
export const BASE_URL = '/app';

interface ENUM {
    [key: string]: any;
}

export enum ID_TYPE {
    PERSONAL = '个人',
    TEAM = '团体'
}

export enum ID_TYPE_V {
    PERSONAL = '0',
    TEAM = '1'
}

/*
 * 用户状态
 * */
export enum USER_STATUS {
    disabled = '冻结',
    enabled = '正常'
}

export enum USER_STATUS_V {
    disabled = '1',
    enabled = '0'
}

/**
 * 认证状态
 */
export enum AUTH_LEVEL {
    UN_AUTH = '未认证',
    AUTH_PERSON = '个人认证',
    AUTH_COMPANY = '企业认证'
}

export enum AUTH_LEVEL_V {
    UN_AUTH = '0',
    AUTH_PERSON = '1',
    AUTH_COMPANY = '2'
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

export enum FLOW_UNIT_V {
    KB = 0,
    MB = 1,
    GB = 2,
    TB = 3,
    PB = 4
}

export enum TRIGGER_TYPE {
    DEVICE = '设备触发'
    // FIXED_TIME = '定时触发'
}

export enum TRIGGER_TYPE_V {
    DEVICE = '1'
    // FIXED_TIME = '2'
}

export enum TRIGGER_WAY {
    event = '事件触发',
    element = '属性触发',
    line = '上下线触发'
}

export enum TRIGGER_WAY_V {
    event = '1',
    element = '2',
    line = '3'
}

export enum EXEC_CONDITION {
    DEVICE = '设备状态',
    TIME_RANGE = '时间范围'
}

export enum EXEC_CONDITION_V {
    DEVICE = '1',
    TIME_RANGE = '2'
}

export enum EXEC_ACTION {
    DEVICE_OUTPUT = '设备输出',
    RULE_OUTPUT = '规则输出'
}

export enum EXEC_ACTION_V {
    DEVICE_OUTPUT = '1',
    RULE_OUTPUT = '2'
}

// 一定要导出
const values: ENUM = {
    ID_TYPE,
    ID_TYPE_V,
    USER_STATUS,
    USER_STATUS_V,
    AUTH_LEVEL,
    AUTH_LEVEL_V,
    FLOW_UNIT,
    FLOW_UNIT_V,
    TRIGGER_TYPE,
    TRIGGER_TYPE_V,
    TRIGGER_WAY,
    TRIGGER_WAY_V,
    EXEC_CONDITION,
    EXEC_CONDITION_V,
    EXEC_ACTION,
    EXEC_ACTION_V
};

export default values;
