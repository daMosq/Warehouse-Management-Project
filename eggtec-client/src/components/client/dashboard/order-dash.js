import './dashboard.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import LoginNavBar from '../../shared/nav-bar/login-navbar';
import Container from 'react-bootstrap/Container';
import Table from '../../shared/react-table/react-table'
import Row from 'react-bootstrap/Row';
import Modal from '../order-crud/create-order';
//import Modaldelete from '../item-crud/delete-item';
//import Modal from '../item-crud/delete-item';


class OrderDashboard extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            orderDate: '',
            itemOrdered: '',
            amount: '',
            orderStatus: '',
            schedDelivery: '',
            address: '',
            mongoData: [],
            loading: false,
            editedData: {} // gonna be sent to the backend to update the db
        }
    }

    getOrdersData = async () =>  {
        const orderRes = await axios.get('http://localhost:4000/orders')
        this.setState({ loading: false, mongoData: orderRes.data.data })
        
    }

    componentDidMount() {
        this.getOrdersData()
    }

    onEdit = (_id, rowIndex, column, newVal) => {
        const newData = [...this.state.mongoData]
        newData[rowIndex][column] = newVal
        console.log(JSON.stringify(newVal))
        const data = newData[rowIndex]
        axios.put('http://localhost:4000/order/' + data._id, data)
        
        this.setState(
            {
                mongoData: newData,
                editedData: { ...this.state.editedData, [_id]: { ...this.state.editedData[_id], [column]: newVal } }
            },
            () => {
                console.log(this.state.editedData)
            }
        )
        
    }

    deleteItem = (id) => {
        console.log(id)
        axios.delete('http://localhost:4000/order/' + id)
        .then((res) => {
            console.log(res)
            this.getOrdersData()
        })
    }

    showModal = () => this.setState({ showModal: true });
    hideModal = () => this.setState({ showModal: false });

    render() {
        let columns = [
            {
                Header: 'Order Date',
                accessor: 'orderDate', // accessor is the "key" in the data
            },
            {
                Header: 'Item Ordered',
                accessor: 'itemOrdered',
            },
            {
                Header: 'Amount Ordered',
                accessor: 'amount',
            },
            {
                Header: 'Order Status',
                accessor: 'orderStatus'
            },
            {
                Header: 'Scheduled Delivery',
                accessor: 'schedDelivery'
            },
            {
                Header: 'Destination Address',
                accessor: 'address'
            }
    

        ];
        

        return (
            <div>
                
                <Container fluid>
                    <Row className="">
                        <br />
                    </Row>
                    <div className="mx-5">
                        {/* this is the data table */}
                        <Table deleteItem={this.deleteItem} columns={columns} data={this.state.mongoData} onEdit={this.onEdit} />
                    </div>
            
              
                <Button variant="primary" onClick={this.showModal}>
                Add Order
                </Button>
                <Modal show={this.state.showModal} refreshOrders={this.getOrdersData} onClose={this.hideModal} />
                
                </Container>
                
            </div>
        );
    }

}

export default OrderDashboard;