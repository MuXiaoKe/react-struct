import React from 'react';
import { notification, Button } from 'antd';
import { useIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';

import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
type BatchoperateProps = {
    // form?: any;
    // batchStore?: any;
    port: any;
    handleClick?: (run: any) => void;
    exportFlag?: boolean; // 导出标志
};
const ExcelExport: React.FC<BatchoperateProps> = (props) => {
    const { formatMessage: f } = useIntl();
    const history = useHistory();
    const { port, handleClick, exportFlag = true } = props;
    const res = useRequest(port, {
        manual: true,
        onSuccess: () => {
            notification.success({
                message: f({
                    id: 'card.exportSuccess',
                    defaultMessage: '导出请求发起成功'
                }),
                description: (
                    <div style={{ marginTop: '5px' }}>
                        <span>{f({ id: 'card.later', defaultMessage: '请稍后于' })}</span>
                        <a
                            onClick={() => history.push('/card/downloadtask')}
                            style={{ margin: '0 5px' }}
                        >
                            {f({ id: 'card.downloadTask', defaultMessage: '下载任务' })}
                        </a>
                        <span>
                            {f({
                                id: 'card.pageDownloadFile',
                                defaultMessage: '页面下载文件'
                            })}
                        </span>
                    </div>
                )
            });
        }
    });
    return (
        <Button
            type="link"
            onClick={() => {
                handleClick ? handleClick(res.run) : res.run();
            }}
            className="text-right"
        >
            <UploadOutlined style={{ fontSize: '18px' }} />
        </Button>
    );
};
export default ExcelExport;
