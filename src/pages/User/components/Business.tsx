import React, { useState } from 'react';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';

const Business: React.FC = (props) => {
    const { formatMessage: f } = useIntl();

    const [visible, setVisible] = useState(false);
    return (
        <>
            <a onClick={() => setVisible(true)}>
                {f({ id: 'user.login.businessCooperation' }) || '商务合作'}
            </a>
            <Modal
                visible={visible}
                title={f({ id: 'user.login.businessCooperation' }) || '商务合作'}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
                width="700px"
                centered
            >
                <div className="modal-scrolly border-table scrollbar scrollbar-y">
                    <p>商务合作：</p> <p>service@lenovoconnect.com</p>
                </div>
            </Modal>
        </>
    );
};
export default Business;
