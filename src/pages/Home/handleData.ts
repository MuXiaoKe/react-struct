import { color } from '@components/charts/color';
/**
 * 图表数据格式化处理
 * @param data
 */
export const handleData = (data: any[]): any[] => {
    if (Array.isArray(data)) {
        data.map((ele: any) => handleSubColor(ele));
    }
    return data;
};

export const handleSubColor = (data: any): any => {
    if (Reflect.has(data, 'children') && Array.isArray(data.children) && data.children.length > 1) {
        data.children.map((item: any, index: number) => (item.color = color[index]));
    }
    return data;
};
