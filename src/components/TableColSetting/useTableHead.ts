import React, { useEffect } from 'react';
import { useLocalStore } from 'mobx-react';
type Tstore = {
    tableHead: any[];
    tableWidth: number;
    setTableHead: (value: any) => void;
    setTableWidth: (widthCount: number) => void;
};
export default (columns: any) => {
    // [[ 表格列设置
    const store = useLocalStore<Tstore>(() => ({
        tableHead: [] as any[],
        tableWidth: 0,
        setTableHead(value: any) {
            store.tableHead = value;
        },
        setTableWidth(widthCount: number) {
            store.tableWidth = widthCount;
        }
    }));
    const tableSetting = (value: any) => {
        if (value.length === 0) {
            return;
        }
        let widthCount = 0;
        value.forEach((item: any) => {
            widthCount = widthCount + item.width;
        });
        store.setTableHead(value);
        store.setTableWidth(widthCount);
    };

    useEffect(() => {
        tableSetting(columns);
    }, []);
    return { store, tableSetting };
    // ]]
};
