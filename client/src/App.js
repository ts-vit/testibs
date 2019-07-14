import React from 'react';
import Header from './components/Header/Header';
import TableOrders from './components/Table/Table';
import FormOrder from './components/FormOrder/FormOrder'
import './App.css';
import 'antd/dist/antd.css';
import {Button} from "antd";
import OrdersService from './api/OrdersService'

const ordersService = new OrdersService();


class App extends React.Component {

    state = {
        tableData: null,
        modalVisible: false,
        modalTitle: '',
        operationType: '',
        orderId: null,
        disabled: false,
        okText: '',
        fields: {
            lastName: {
                value: null,
            },
            firstName: {
                value: null,
            },
            product: {
                value: null,
            },
            quantity: {
                value: null,
            },
        }

    };

    rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.setState({
                orderId: selectedRows[0].id,
            })
        },
    };

    componentDidMount() {
        ordersService.getAllOrders()
            .then(result => {
                this.setState({tableData: result});
            });
    }

    handleShowModalAdd = () => {
        this.setState({
            operationType: 'Add',
            okText: 'Добавить',
            modalTitle: 'Создать новую заявку на оборудование',
            modalVisible: true,

        })

    };
    handleShowModalEdit = () => {
        if (this.state.orderId === null) {
            alert("Выберите строку в таблице");
            return;
        }
        ordersService.getOrder(this.state.orderId)
            .then(result => {
                this.setState({
                    fields: {
                        lastName: {
                            value: result.lastName
                        },
                        firstName: {
                            value: result.firstName
                        },
                        product: {
                            value: result.product
                        },
                        quantity: {
                            value: result.quantity
                        }

                    },
                    operationType: 'Edit',
                    okText: 'Редактировать',
                    modalTitle: 'Редактировать заявку на оборудование',
                    modalVisible: true
                })
            })


    };

    handleShowModalDelete = () => {

        if (this.state.orderId === null) {
            alert("Выберите строку в таблице");
            return;
        }

        ordersService.getOrder(this.state.orderId)
            .then(result => {
                this.setState({
                    fields: {
                        lastName: {
                            value: result.lastName
                        },
                        firstName: {
                            value: result.firstName
                        },
                        product: {
                            value: result.product
                        },
                        quantity: {
                            value: result.quantity
                        }

                    },
                    operationType: 'Delete',
                    okText: 'Удалить',
                    modalTitle: 'Вы действительно хотите удалить текущую заявку',
                    modalVisible: true,
                    disabled: true,
                })
            });

    };

    handleEdit = () => {
        const data = {
                id: this.state.orderId,
                lastName: this.state.fields.lastName.value,
                firstName: this.state.fields.firstName.value,
                product: this.state.fields.product.value,
                quantity: this.state.fields.quantity.value,
            }
        ;
        ordersService.updateOrder(data)
            .then(result => {
                console.log(result);
                return ordersService.getAllOrders();
            })
            .then(result => {
                this.setState({tableData: result});
            });

    };

    handleAdd = () => {
        const data = {
                id: null,
                lastName: this.state.fields.lastName.value,
                firstName: this.state.fields.firstName.value,
                product: this.state.fields.product.value,
                quantity: this.state.fields.quantity.value,
            }
        ;
        ordersService.addOrder(data)
            .then(result => {
                console.log(result);
                return ordersService.getAllOrders()
            })
            .then(result => {
                this.setState({tableData: result});
            });

    };

    handleDelete = () => {
        ordersService.deleteOrder(this.state.orderId)
            .then(result => {
                console.log(result);
                return ordersService.getAllOrders()
            })
            .then(result => {
                this.setState({tableData: result});
            });
    };

    handleModalOk = () => {

        switch (this.state.operationType) {
            case "Add":
                this.handleAdd();
                break;
            case "Edit":
                this.handleEdit();
                break;
            case "Delete":
                this.handleDelete();
                break;
            default:
                break;

        }

        this.resetFormState();

    };

    resetFormState = () => {
        this.setState({
            modalVisible: false,
            operationType: '',
            disabled: false,
            fields: {
                lastName: {
                    value: null
                },
                firstName: {
                    value: null
                },
                product: {
                    value: null
                },
                quantity: {
                    value: null
                }

            },
        })
    };

    handleModalCancel = () => {
        this.resetFormState();
    };


    handleFormChange = changedFields => {
        this.setState(({fields}) => ({
            fields: {...fields, ...changedFields},
        }));
    };

    render() {
        const {tableData, okText, modalTitle, modalVisible, fields, disabled} = this.state;
        return (
            <div className="App">
                <Header className="header"/>
                <div className="wrapper-buttons">
                    <Button type="primary" onClick={this.handleShowModalAdd}
                            className="control-button">Добавить</Button>
                    <Button type="primary" onClick={this.handleShowModalEdit}
                            className="control-button">Редактировать</Button>
                    <Button type="primary" onClick={this.handleShowModalDelete}
                            className="control-button">Удалить</Button>
                </div>
                <TableOrders dataSource={tableData}
                             rowSelection={this.rowSelection}/>

                <FormOrder
                    {...fields}
                    onChange={this.handleFormChange}
                    okText={okText}
                    title={modalTitle}
                    visible={modalVisible}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    disabled={disabled}/>

            </div>

        )
    }

}

export default App;
