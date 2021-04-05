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
            itemName: '',
            itemID: '',
            availability: '',
            amount: '',
            mongoData: [],
            
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

    deleteOrder = (id) => {
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
                Header: 'Item Name',
                accessor: 'itemName', // accessor is the "key" in the data
            },
            {
                Header: 'Item ID',
                accessor: 'itemID',
            },
            {
                Header: 'Availability',
                accessor: 'availability',
            },
            {
                Header: 'Amount Ordered',
                accessor: 'amount'
            }
    

        ];
        let buttonLabel = '';
        let redirectTo = '';

        return (
            <div>
                
                <Container fluid>
                    <Row className="">
                        {/* <label>{this.state.currentUser.role}</label> */}
                        <br />
                    </Row>
                    <div className="mx-5">
                        {/* this is the data table */}
                        <Table deleteOrder={this.deleteOrder} columns={columns} data={this.state.mongoData} onEdit={this.onEdit} />
                    </div>
                    {/* <Row className="justify-content-md-center">
                        <Col md="6">
                        </Col>
                    </Row> */}
              
                <Button variant="primary" onClick={this.showModal}>
                Add Order
                </Button>
                <Modal show={this.state.showModal} refreshOrders={this.getOrdersData} onClose={this.hideModal} />
                
                
                {/* <Modal show={this.state.showModal} onClose={this.hideModal}/> */}
                </Container>
                
            </div>
        );
    }

}

export default OrderDashboard;