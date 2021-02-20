import React, { useState } from 'react';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';

const Callcenter: React.FC = (props) => {
    const { formatMessage: f } = useIntl();

    const [visible, setVisible] = useState(false);
    return (
        <>
            <a onClick={() => setVisible(true)}>
                {f({ id: 'user.login.callcenter' }) || '客服中心'}
            </a>
            <Modal
                visible={visible}
                title={f({ id: 'user.login.callcenter' }) || '客服中心'}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
                width="700px"
                centered
            >
                <div className="modal-scrolly border-table scrollbar scrollbar-y">
                    <p>客服热线：</p> <p>40064 10041 (9:00—18:00)</p>
                </div>
            </Modal>
        </>
    );
};
export default Callcenter;
