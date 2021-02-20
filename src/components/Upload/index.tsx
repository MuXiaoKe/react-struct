import React, { useState } from 'react';
import { Modal, Button, message, Form, Upload, Tooltip } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import { useIntl } from 'react-intl';
interface UploadCProps {
    label: string;
    btnText: string;
    actionUrl: string; // action 地址
    fileName: string;
    beforeUpload?: any;
    accept?: string;
    uploadRule?: string;
}

const UploadC: React.FC<UploadCProps> = (props) => {
    const { formatMessage: f } = useIntl();
    const { label, btnText, actionUrl, beforeUpload, accept, uploadRule, fileName } = props;
    // 上传设置
    const uploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: true,
        action: actionUrl,
        accept: accept ?? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        beforeUpload: beforeUpload ?? undefined,
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                // 判断文件上传是否合法
                let res = info.file.response;
                // deviceStore.getUploadInfo(info.file);
                // if (res.success === false) {
                // }
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name}上传失败.`);
            }
        }
    };
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <Form.Item
            label={label}
            rules={[{ required: true, message: f({ id: 'common.requred' }) }]}
            name={fileName || undefined}
            valuePropName="fileList"
            getValueFromEvent={normFile}
        >
            <Upload {...uploadProps}>
                <Tooltip placement="rightTop" title={uploadRule ?? undefined}>
                    <Button>{btnText}</Button>
                </Tooltip>
            </Upload>
        </Form.Item>
    );
};

export default UploadC;
