import React, { useState, useRef } from 'react';
import { Button, Modal, Form, Select, message, Alert } from 'antd';
import { useRequest, useMount } from 'ahooks';
import { useIntl } from 'react-intl';
import * as api from '@services/index';
import { observer, useLocalStore } from 'mobx-react';
import { appStores } from '@src/store';
import { MODAL_ITEM } from '@src/constants/index';
import FormCommonItems from '@components/FormCommonItems/index';

const { Option } = Select;

type CardTypeProps = {
    edit?: boolean; // 是否是编辑状态
    record?: any;
    getList?: any;
};
interface LooseObject {
    [key: string]: any;
}
const UploadFileModal: React.FC<CardTypeProps> = (props) => {
    const { formatMessage: f } = useIntl();
    const [form] = Form.useForm();
    // const {  } = props;
    const inputRef: any = useRef();
    // store
    const batchStore: LooseObject = useLocalStore(() => ({
        logoFile: null, // 上传得文件
        setVal(per: any, val: string) {
            batchStore[per] = val;
        }
    }));
    const uploadLogo = useRequest(api.uploadLogo, {
        manual: true,
        onSuccess: (result, params) => {
            message.info(f({ id: 'common.operateSuccess' }));
            inputRef.current.value = '';
            batchStore.setVal('logoFile', null);
            setVisible(false);
        }
    });
    // 编辑topic弹出框表单提交
    const onFinish = (values: any) => {
        if (!batchStore.logoFile) {
            message.info(f({ id: 'card.numcardFile' }));
        }
        // setVisible(false);
        const formData = new FormData();
        formData.append('logoFile', batchStore.logoFile);

        uploadLogo.run(formData);
    };
    const onFinishFailed = (errorInfo: any) => {
        form.scrollToField(errorInfo.errorFields[0].name);
        // console.log('Failed:', errorInfo.errorFields);
    };
    const [visible, setVisible] = useState(false);
    const modalCloseFunc = () => {
        form.resetFields();
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        batchStore.setVal('logoFile', null);
    };
    // file change
    const handleFileChange = (e: any) => {
        // console.log(e.target.files[0], e.target);
        const _file = e.target.files[0];
        if (_file.size > 1536000) {
            message.info(f({ id: 'common.logoTips' }));
            return;
        }
        batchStore.setVal('logoFile', _file);
        inputRef.current = e.target;
    };
    return (
        <>
            <Button
                type="text"
                onClick={() => {
                    // 参数的数据
                    setVisible(true);
                }}
                className="pdnone"
            >
                {f({ id: 'common.logoSetting' })}
            </Button>
            <Modal
                title={f({ id: 'common.logoSetting' })}
                visible={visible}
                // footer={null}
                onCancel={() => setVisible(false)}
                width="550px"
                afterClose={modalCloseFunc}
                onOk={() => form.submit()}
            >
                <div className="_modal-wrap">
                    <Alert
                        message={
                            <>
                                <p>{f({ id: 'card.prompt', defaultMessage: '提示' })}：</p>
                                <p>{f({ id: 'common.logoTips1' })}</p>
                                <p>{f({ id: 'common.logoTips2' })}</p>
                            </>
                        }
                        type="info"
                        showIcon
                        className="mb20"
                    />
                    <Form
                        name="addCardTypeForm"
                        initialValues={{}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        form={form}
                        layout="horizontal"
                        {...MODAL_ITEM}
                    >
                        <Form.Item label="LOGO">
                            <input type="file" accept=".png, .jpg" onChange={handleFileChange} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};
export default observer(UploadFileModal);
