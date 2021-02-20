import React, { useState, ReactNode } from 'react';
import { Modal, Button } from 'antd';
import { useIntl } from 'react-intl';

type okText = string;
type cancelText = string;
interface ModalCProps {
    btnName: string;
    btnDisabled?: boolean;
    confirmLoading?: boolean;
    title: string;
    buttonType?: 'link' | 'primary';
    handleBeforeModal?: (func: any) => any; // 弹出框打开前触发的事件
    children?: any;
    modalCloseFunc?: () => void; // modal 关闭后的回调处理
    footer?: ReactNode;
    btnText?: [okText, cancelText]; // 按钮文字
    handleOk?: (func: any) => void;
    width?: string;
    className?: string;
    closeCb?: () => void;
}

const ModalC: React.FC<ModalCProps> = (props) => {
    const { formatMessage: f } = useIntl();
    const {
        btnName,
        btnDisabled,
        confirmLoading,
        title,
        buttonType,
        handleBeforeModal,
        children,
        modalCloseFunc,
        footer,
        btnText,
        handleOk,
        width,
        className,
        closeCb // 关闭后回调
    } = props;
    const [visible, setVisible] = useState(false);
    // 关闭弹出框
    const handleCancel = () => {
        setVisible(false);
        closeCb?.();
    };
    return (
        <>
            <Button
                type={buttonType ?? 'link'}
                onClick={() => {
                    setVisible(true);
                    handleBeforeModal?.(setVisible);
                }}
                disabled={btnDisabled}
            >
                {btnName}
            </Button>
            <Modal
                title={title}
                visible={visible}
                okText={btnText?.[0] || f({ id: 'components.modal.okText' })}
                cancelText={btnText?.[1] || f({ id: 'components.modal.cancelText' })}
                destroyOnClose={true}
                afterClose={modalCloseFunc}
                onOk={handleOk ? () => handleOk(setVisible) : undefined}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={footer ?? undefined}
                width={width}
                className={className}
                centered={true}
            >
                <div className="_modal-wrap">{children}</div>
            </Modal>
        </>
    );
};

export default ModalC;
