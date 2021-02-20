import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Popover, Checkbox } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import './style.scss';
interface TableColSettingProps {
    title: string | React.ReactNode;
    initData?: any;
    currentData?: any;
    onOk?: any;
    tableSetStore?: any;
}

const TableColSetting: React.FC<TableColSettingProps> = (props) => {
    const { formatMessage: f } = useIntl();
    const { title, initData, currentData, onOk } = props;
    const [checkedArr, setcheckedArr] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);
    const changeCheck = (e: any, itemIndex: string) => {
        if (e.target.checked) {
            if (checkedArr.indexOf(itemIndex) === -1) {
                // checkedArr.push(itemIndex);
                setcheckedArr((prev) => {
                    prev.push(itemIndex);
                    return prev;
                });
            }
        } else {
            const index = checkedArr.indexOf(itemIndex);
            setcheckedArr((prev) => {
                prev.splice(index, 1);
                return prev;
            });
        }
    };

    const doSubmit = () => {
        const goalArr = initData.filter((item: any) => {
            return checkedArr.indexOf(item.dataIndex) > -1;
        });
        onOk(goalArr);
        setVisible(false);
    };
    useEffect(() => {
        let _checkedArr: string[] = [];
        currentData.forEach((item: any) => {
            _checkedArr.push(item.dataIndex);
        });
        setcheckedArr(_checkedArr);
    }, []);
    return (
        <Popover
            title={title}
            content={
                <>
                    <Row style={{ width: '300px' }}>
                        {initData.map((item: any) => (
                            <Col key={item.dataIndex} span={12}>
                                <div>
                                    <Checkbox
                                        defaultChecked={checkedArr.indexOf(item.dataIndex) > -1}
                                        onChange={(e) => changeCheck(e, item.dataIndex)}
                                    />
                                    &emsp;{item.title}
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <div className="text-right">
                        <Button type="primary" onClick={doSubmit}>
                            {f({ id: 'components.tableColSetting.setting' })}
                        </Button>
                    </div>
                </>
            }
            trigger="click"
            placement="left"
            visible={visible}
            onVisibleChange={(visible) => setVisible(visible)}
        >
            <Button type="default" title={f({ id: 'components.tableColSetting.setting' })}>
                <SettingOutlined />
            </Button>
        </Popover>
    );
};
export default TableColSetting;
