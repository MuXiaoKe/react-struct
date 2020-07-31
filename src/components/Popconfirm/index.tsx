import React from 'react';
import { Popconfirm } from 'antd';

interface ComponentProps {
    placement?: any;
    title: string;
    onConfirm: () => void;
    children?: any;
}

const PopconfirmC: React.FC<ComponentProps> = (props: ComponentProps) => {
    return (
        <Popconfirm
            placement={props.placement}
            title={props.title}
            okText="确认"
            cancelText="取消"
            onConfirm={props.onConfirm}
        >
            <span onClick={(e) => e.preventDefault()}>{props.children}</span>
        </Popconfirm>
    );
};

export default PopconfirmC;
