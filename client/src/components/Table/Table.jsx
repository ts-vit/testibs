import React from 'react';
import {Table} from "antd";

const columns = [
    {
        title: 'ИД',
        dataIndex: 'id',
        key: 'id',

    },
    {
        title: 'Фамилия',
        dataIndex: 'lastName',
        key: 'lastName'
    },
    {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName'
    },
    {
        title: 'Оборудование',
        dataIndex: 'product',
        key: 'product'
    },
    {
        title: 'Кол',
        dataIndex: 'quantity',
        key: 'quantity'
    },

];

const pagination = {position: "none"};

const TableOrders = ({dataSource, rowSelection}) => (
    <Table dataSource={dataSource} columns={columns} pagination={pagination} rowSelection={rowSelection}/>
);

export default TableOrders;