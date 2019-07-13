import React from 'react';
import {Modal, Form, Input, InputNumber} from "antd";

const FormOrders = ({visible, title, onOk, onCancel, disabled}) => {

  return (
      <Modal visible={visible} title={title} onOk={onOk} onCancel={onCancel}>
        <Form layout="vertical">
          <Form.Item label="Фамилия">
              <Input placeholder="Фамилия" required disabled={disabled}/>
          </Form.Item>
          <Form.Item label="Имя">
            <Input placeholder="Имя" required disabled={disabled}/>
          </Form.Item>
          <Form.Item label="Оборудование">
            <Input placeholder="Оборудование"required disabled={disabled}/>
          </Form.Item>
          <Form.Item label="Количество">
            <InputNumber defaultValue="1" min="1" required disabled={disabled}/>
          </Form.Item>
        </Form>
      </Modal>
  );

};

export default FormOrders;
