import React, { useState } from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;
import './style.scss';

interface CountProps {
    form: any; // 表单实例
    name: string;
    disabled?: boolean;
    label?: string;
    MaxNumber?: number;
}
const CountTextArea: React.FC<CountProps> = (props) => {
    const { form, name, disabled, label, MaxNumber = 100 } = props;
    // topic描述计数
    const [numLength, setNumLength] = useState(0);
    const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = event.target.value;
        const num = value.length;
        let _value;

        if (num >= MaxNumber) {
            setNumLength(MaxNumber);
            _value = value.substring(0, MaxNumber);
            form.setFieldsValue({ [name]: _value });
        } else {
            setNumLength(num);
        }
    };
    return (
        <Form.Item label={label || '描述：'} className="textareaForm-wrap">
            <Form.Item name={name} className="form-textarea">
                <TextArea
                    rows={4}
                    placeholder={'请输入' + (label || '描述')}
                    className="w400"
                    onChange={onTextAreaChange}
                    disabled={disabled || false}
                />
            </Form.Item>
            <div className="count-number">
                <span className="cur-number">{numLength}</span> / {MaxNumber}
            </div>
        </Form.Item>
    );
};
export default CountTextArea;
