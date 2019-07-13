import React from 'react';
import Header from './components/Header/Header';
import TableOrders from './components/Table/Table';
import FormOrders from './components/Form/FormOrders'
import './App.css';
import 'antd/dist/antd.css';
import {Button} from "antd";
import OrdersService from './api/OrdersService'

const ordersServiсe = new OrdersService();


class App extends React.Component {

    state = {
        tableData: null,
        modalVisible: false,
        modalTitle: '',
        operationType: '',
        orderId: null,
        disabled: false,
        formData: {
            id: null,
            lastName: null,
            firstName: null,
            product: null,
            quantity: null,
        },

    };

    rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {

        }
    };

    componentDidMount() {
        ordersServiсe.getAllOrders()
            .then(result => {
                this.setState({tableData: result});
            });
    }

    handleShowModalAdd = () => {
        this.setState({
            operationType: 'Add',
            modalTitle: 'Создать новую заявку на оборудование',
            modalVisible: true,

        })

    };
    handleShowModalEdit = () => {
        this.setState({
            operationType: 'Edit',
            modalTitle: 'Редактировать заявку на оборудование',
            modalVisible: true,

        })

    };

    handleShowModalDelete = () => {
        this.setState({
            operationType: 'Delete',
            modalTitle: 'Вы действительно хотите удалить текущую заявку',
            modalVisible: true,
            disabled: true,
        })

    };

    handleModalOk = () => {

        this.setState({modalVisible: false})
    };

    handleModalCancel = () => {
        this.setState({
            modalVisible: false,
            operationType: '',
            disabled: false,
        })
    };

    render() {
        return (
            <div className="App">
                <Header/>
                <Button type="primary" onClick={this.handleShowModalAdd}>Добавить</Button>
                <Button type="primary" onClick={this.handleShowModalEdit}>Редактировать</Button>
                <Button type="primary" onClick={this.handleShowModalDelete}>Удалить</Button>
                <TableOrders dataSource={this.state.tableData}
                             rowSelection={this.rowSelection}/>

                <FormOrders title={this.state.modalTitle}
                            visible={this.state.modalVisible}
                            onOk={this.handleModalOk}
                            onCancel={this.handleModalCancel}
                            disabled={this.state.disabled}/>

            </div>

        )
    }

}

export default App;
