import React from 'react';
import {Modal, Form, Input, InputNumber} from 'antd';

const FormOrder = Form.create(
    {
        name: 'form_order',
        onFieldsChange(props, changedFields) {
            props.onChange(changedFields);
        },
        mapPropsToFields(props) {
            return {
                lastName: Form.createFormField({
                    ...props.lastName,
                    value: props.lastName.value,
                }),
                firstName: Form.createFormField({
                    ...props.firstName,
                    value: props.firstName.value,
                }),
                product: Form.createFormField({
                    ...props.product,
                    value: props.product.value,
                }),
                quantity: Form.createFormField({
                    ...props.quantity,
                    value: props.quantity.value,
                }),
            };
        },
        onValuesChange(_, values) {
            console.log(values);
        },
    })(props => {

        const {visible, onCancel, onOk, form, title, okText} = props;
        const {getFieldDecorator, validateFields} = form;
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onOk}
                validateFields={validateFields}
            >
                <Form layout="vertical">
                    <Form.Item label="Фамилия">
                        {getFieldDecorator('lastName', {
                            rules: [{required: true, message: 'Пожалуйста заполните поле фамилия'}],
                        })(<Input placeholder="Фамилия"/>)}
                    </Form.Item>
                    <Form.Item label="Имя">
                        {getFieldDecorator('firstName', {
                            rules: [{required: true, message: 'Пожалуйста заполните поле имя'}],
                        })(<Input placeholder="Имя"/>)}
                    </Form.Item>
                    <Form.Item label="Наименование оборудования">
                        {getFieldDecorator('product', {
                            rules: [{required: true, message: 'Пожалуйста заполните поле наименование оборудования'}],
                        })(<Input placeholder="Наименование оборудования"/>)}
                    </Form.Item>
                    <Form.Item label="Количество">
                        {getFieldDecorator('quantity', {
                            rules: [{required: true, message: 'Пожалуйста заполните поле количество'}],
                        })(<InputNumber defaultValue="1" min="1"/>)}
                    </Form.Item>
                </Form>

            </Modal>
        );


    }
);

export default FormOrder;