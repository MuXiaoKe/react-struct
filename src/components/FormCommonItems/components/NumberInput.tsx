import React from 'react';
import { Form, InputNumber } from 'antd';
import { useIntl } from 'react-intl';
import { observer } from 'mobx-react';

interface IFeeSelect {
    label: string;
    form?: any;
    name: string;
    precision?: number; // 保留的小数位数
    style?: any;
    requred?: boolean;
    disabled?: boolean;
    max?: number; // 最大值
    min?: number; // 最小值
}
const FeeSelect: React.FC<IFeeSelect> = observer((props) => {
    const { formatMessage: f } = useIntl();
    const { label, name, form, requred, precision, disabled, style, max, min } = props;

    return (
        <Form.Item
            label={f({ id: label })}
            name={name}
            rules={
                requred
                    ? [
                          {
                              required: true,
                              message:
                                  f({ id: 'common.requred' }) +
                                  ',' +
                                  f({ id: 'common.plzinput' }) +
                                  f({ id: label })
                          }
                      ]
                    : undefined
            }
            getValueFromEvent={(val) => {
                return val === null ? undefined : String(val).trim();
            }}
        >
            <InputNumber
                min={min ?? 0}
                step={1}
                max={max}
                precision={precision}
                style={style ?? { width: '100%' }}
                placeholder={f({ id: 'common.plzinput' }) + f({ id: label })}
            />
        </Form.Item>
    );
});
export default FeeSelect;
