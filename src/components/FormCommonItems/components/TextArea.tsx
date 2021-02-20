import React from 'react';
import { Form, Input } from 'antd';
import { useIntl } from 'react-intl';
import { observer } from 'mobx-react';

const { TextArea } = Input;

interface IFeeSelect {
    label: string;
    form: any;
    name: string;
    disabled?: boolean;
    requred?: boolean;
    maxLength?: number;
}
const FeeSelect: React.FC<IFeeSelect> = observer((props) => {
    const { formatMessage: f } = useIntl();
    const { label, name, form, disabled, requred, maxLength } = props;
    return (
        <Form.Item
            label={requred ? f({ id: label }) : f({ id: label }) + f({ id: 'common.optional' })}
            name={name}
            rules={
                requred
                    ? [
                          {
                              required: true,
                              message: `${f({ id: 'common.requred' })},${f({
                                  id: 'common.plzinput'
                              })}${f({ id: label })}`
                          }
                      ]
                    : undefined
            }
        >
            <TextArea
                autoSize={{ minRows: 3, maxRows: 7 }}
                maxLength={maxLength || 100}
                disabled={disabled}
                placeholder={`${f({ id: 'common.plzinput' })}${f({
                    id: label
                })}，不超过${maxLength || 100}字`}
            />
        </Form.Item>
    );
});
export default FeeSelect;
