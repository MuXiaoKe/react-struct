import React from 'react';
import { Form, Input } from 'antd';
import { useIntl } from 'react-intl';
import { observer } from 'mobx-react';
import { PATTERN } from '@src/constants/index';

interface IBasicInput {
    form?: any;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    requred?: boolean;
    disabled?: boolean;
    formStyle?: object;
    name?: string;
    label?: string;
    className?: string;
    verif?: any;
    rule?: any;
    noLabel?: boolean;
    f_label?: string; // 不需要转化的标题
    dependencies?: any;
    placeholder?: any;
    initialValue?: any; // 默认值
}
const BasicInput: React.FC<IBasicInput> = observer((props) => {
    const { formatMessage: f } = useIntl();
    const {
        form,
        requred = true,
        handleChange,
        disabled,
        formStyle,
        name,
        label,
        className,
        verif,
        rule,
        noLabel,
        f_label,
        dependencies,
        placeholder,
        initialValue
    } = props;
    let verifs: any = [];
    verifs = verifs.concat(verif);
    return (
        <Form.Item
            label={!noLabel ? (label ? f({ id: label }) : f_label) : undefined}
            name={name ?? label}
            rules={
                rule
                    ? rule
                    : [
                          verif ? verif : '',
                          requred
                              ? {
                                    required: true,
                                    message: `${f({ id: 'common.requred' })},${f({
                                        id: 'common.plzinput'
                                    })}${f_label ?? f({ id: label })}`
                                }
                              : '',
                          requred
                              ? {
                                    pattern: PATTERN.SPACE,
                                    message: f({
                                        id: 'common.forbidSpace',
                                        defaultMessage: '禁止输入空格'
                                    })
                                }
                              : ''
                      ]
            }
            style={formStyle ?? undefined}
            dependencies={dependencies ?? undefined}
            getValueFromEvent={(event) => {
                return event.target.value.trim();
            }}
            initialValue={initialValue ?? undefined}
        >
            <Input
                // allowClear
                placeholder={`${f({ id: 'common.plzinput' })}${
                    placeholder ? placeholder : f_label ?? f({ id: label })
                }`}
                disabled={disabled}
                onChange={handleChange}
                className={className}
            />
        </Form.Item>
    );
});
export default BasicInput;
